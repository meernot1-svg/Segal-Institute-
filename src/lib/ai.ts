/**
 * AI provider abstraction.
 *
 * Real mode uses OpenRouter (OpenAI-compatible API) when AI_API_KEY is set.
 * Mock mode returns helpful placeholder responses so the app runs with zero
 * AI spend during development or when the key isn't configured.
 *
 * Env vars:
 *   AI_API_KEY    — OpenRouter API key (sk-or-v1-...)
 *   AI_BASE_URL   — defaults to https://openrouter.ai/api/v1
 *   AI_MODEL      — defaults to meta-llama/llama-3.3-70b-instruct
 *   ENABLE_MOCK_AI — "true" forces mock mode even if a key is present
 *
 * Always called from server-side code only.
 */
import { branding } from "@/lib/branding";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const MOCK =
  process.env.ENABLE_MOCK_AI === "true" || !process.env.AI_API_KEY;

const BASE_URL = process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
// Default to a free, reliable OpenRouter model. Override with AI_MODEL env var
// if you want a specific (paid) model.
const MODEL = process.env.AI_MODEL || "liquid/lfm-2.5-2.6b:free";

export function isMockMode() {
  return MOCK;
}

export function getModel() {
  return MODEL;
}

async function callOpenRouter(messages: ChatMessage[]): Promise<string> {
  // 90-second timeout — free models can be slow, especially with long prompts.
  // Vercel Hobby plan allows up to 60s for serverless functions; we set
  // maxDuration=300 on the route to be safe (see route files).
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90_000);
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
        // OpenRouter optional metadata (attribution)
        "HTTP-Referer": "https://segal-institute.vercel.app",
        "X-Title": branding.name,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        // 4096 because some free models (e.g. liquid LFM) require "reasoning"
        // tokens that consume part of the budget before the actual content is
        // produced. With a smaller limit, finish_reason="length" and content=null.
        max_tokens: 4096,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}): ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const out = data?.choices?.[0]?.message?.content;
  if (!out || typeof out !== "string" || !out.trim()) {
    throw new Error("AI returned an empty response");
  }
  return out.trim();
}

// Vision-capable model (separate from the text-only default model).
// dots-studio/dots-3-note-preview:free is a free OpenRouter model that
// supports image input (text + image modalities). Override with AI_VISION_MODEL.
const VISION_MODEL = process.env.AI_VISION_MODEL || "dots-studio/dots-3-note-preview:free";

type VisionContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

async function callOpenRouterVision(
  systemPrompt: string,
  textPrompt: string,
  imageDataUrl: string,
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90_000);
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://segal-institute.vercel.app",
        "X-Title": branding.name,
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: textPrompt } as VisionContent,
              { type: "image_url", image_url: { url: imageDataUrl } } as VisionContent,
            ],
          },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`AI vision request failed (${res.status}): ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  const out = data?.choices?.[0]?.message?.content;
  if (!out || typeof out !== "string" || !out.trim()) {
    throw new Error("AI vision returned an empty response");
  }
  return out.trim();
}

export function getVisionModel() {
  return VISION_MODEL;
}

/**
 * Send an image (as a data URL) to a vision-capable model along with a text
 * prompt. Returns the model's text response. Falls back to a mock if no key.
 */
export async function completeWithVision(
  systemPrompt: string,
  textPrompt: string,
  imageDataUrl: string,
): Promise<string> {
  if (!MOCK) {
    try {
      return await callOpenRouterVision(systemPrompt, textPrompt, imageDataUrl);
    } catch (e) {
      console.error("[ai] completeWithVision() failed:", e instanceof Error ? e.message : e);
      throw e;
    }
  }
  return `[Mock vision mode] Could not read the image because no AI_API_KEY is set. Upload a text result instead, or set AI_API_KEY.`;
}

/**
 * Single-turn completion. Returns plain text.
 */
export async function complete(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  if (!MOCK) {
    try {
      return await callOpenRouter([
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ]);
    } catch (e) {
      // fall through to mock on error
      console.error("[ai] complete() failed, using mock:", e instanceof Error ? e.message : e);
    }
  }
  return mockComplete(systemPrompt, userPrompt);
}

/**
 * Multi-turn chat. `history` is the prior messages (user+assistant)
 * excluding the system prompt; `message` is the new user message.
 */
export async function chat(
  systemPrompt: string,
  history: { role: "user" | "assistant"; content: string }[],
  message: string,
): Promise<string> {
  if (!MOCK) {
    try {
      const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ];
      return await callOpenRouter(messages);
    } catch (e) {
      console.error("[ai] chat() failed, using mock:", e instanceof Error ? e.message : e);
    }
  }
  return mockChat(systemPrompt, history, message);
}

// ---------------------------------------------------------------------------
// Mock responses (used when AI_API_KEY is empty or ENABLE_MOCK_AI=true)
// ---------------------------------------------------------------------------

function mockComplete(systemPrompt: string, userPrompt: string): string {
  const sp = systemPrompt.toLowerCase();

  if (sp.includes("sentence generator") || sp.includes("sentence writing")) {
    // Parse a few fields from the user prompt so the mock feels relevant.
    const topicMatch = userPrompt.match(/topic:\s*([^,\n]+)/i);
    const langMatch = userPrompt.match(/language:\s*([^,\n]+)/i);
    const countMatch = userPrompt.match(/count:\s*(\d+)/i);
    const typeMatch = userPrompt.match(/sentence type:\s*([^,\n]+)/i);
    const topic = topicMatch ? topicMatch[1].trim() : "your topic";
    const lang = langMatch ? langMatch[1].trim() : "English";
    const count = countMatch ? Math.min(Math.max(parseInt(countMatch[1], 10) || 5, 1), 20) : 5;
    const type = typeMatch ? typeMatch[1].trim() : "Mixed";

    // For non-English languages we still emit a small set of original
    // sentences so the user can see the format. Real AI replaces this.
    const isUrdu = /urdu/i.test(lang);
    const isSindhi = /sindhi/i.test(lang);
    const isHindi = /hindi/i.test(lang);
    const isArabic = /arabic/i.test(lang);

    const lines: string[] = [];
    lines.push(`Topic: ${topic}`);
    lines.push(`Language: ${lang}`);
    lines.push(`Type: ${type}`);
    lines.push(``);

    if (isUrdu) {
      const set = [
        `${topic} ہماری زندگی کا ایک اہم حصہ ہے۔`,
        `ہم ${topic} کو روزمرہ کے کاموں میں استعمال کرتے ہیں۔`,
        `بچپن سے ہی ${topic} کی اہمیت سکھائی جاتی ہے۔`,
        `${topic} کے بغیر ترقی ممکن نہیں۔`,
        `آج کے دور میں ${topic} لازمی ہو گیا ہے۔`,
        `${topic} ہمیں نئے مواقع فراہم کرتا ہے۔`,
        `ہر طالب علم کو ${topic} سیکھنا چاہیے۔`,
        `${topic} کا صحیح استعمال کامیابی کی چابی ہے۔`,
        `ہم ${topic} کے ذریعے اپنے خیالات ظاہر کر سکتے ہیں۔`,
        `${topic} ہماری سوچ کو نئی راہ دیتا ہے۔`,
        `معاشرے کی ترقی ${topic} پر منحصر ہے۔`,
        `${topic} سے ہمت اور حوصلہ ملتا ہے۔`,
        `ہم ${topic} کے ذریعے دوسروں کی مدد کر سکتے ہیں۔`,
        `${topic} کا اسباق ہمیشہ سیکھنے والوں کو سودھارتا ہے۔`,
        `اچھی ${topic} کے بغیر کوئی بھی مقصد حاصل نہیں ہوتا۔`,
      ];
      for (let i = 0; i < count; i++) lines.push(set[i % set.length]);
    } else if (isSindhi) {
      const set = [
        `${topic} اسان جي زندگي جو اهم حصو آهي.`,
        `اسان ${topic} کي روزانه ڪمن ۾ استعمال ڪريون ٿا.`,
        `ٻاراڻي کان ئي ${topic} جي اهميت سيکارين ٿا.`,
        `${topic} کان سواءِ ترقي ممڪن ناهي.`,
        `اڄ جي دور ۾ ${topic} ضروري ٿي چڪو آهي.`,
        `${topic} اسان کي نوان موقع ڏي ٿو.`,
        `هر شاگرد کي ${topic} سکڻ گهرجي.`,
        `${topic} جو صحيح استعمال ڪاميابي جي ڪليد آهي.`,
      ];
      for (let i = 0; i < count; i++) lines.push(set[i % set.length]);
    } else if (isHindi) {
      const set = [
        `${topic} हमारे जीवन का एक महत्वपूर्ण हिस्सा है।`,
        `हम ${topic} का उपयोग रोज़मर्रा के कामों में करते हैं।`,
        `बचपन से ही ${topic} का महत्व सिखाया जाता है।`,
        `${topic} के बिना प्रगति संभव नहीं है।`,
        `आज के युग में ${topic} आवश्यक हो गया है।`,
        `${topic} हमें नए अवसर प्रदान करता है।`,
        `हर छात्र को ${topic} सीखना चाहिए।`,
        `${topic} का सही उपयोग सफलता की कुंजी है।`,
      ];
      for (let i = 0; i < count; i++) lines.push(set[i % set.length]);
    } else if (isArabic) {
      const set = [
        `${topic} هو جزء مهم من حياتنا.`,
        `نحن نستخدم ${topic} في أعمالنا اليومية.`,
        `يُعلَّم أهمية ${topic} منذ الطفولة.`,
        `لا يمكن التقدم بدون ${topic}.`,
        `أصبح ${topic} ضرورياً في عصرنا الحالي.`,
      ];
      for (let i = 0; i < count; i++) lines.push(set[i % set.length]);
    } else {
      // English (default)
      const set = [
        `${topic} is an important part of our daily lives.`,
        `We use ${topic} to express our ideas clearly.`,
        `Understanding ${topic} helps us make better decisions.`,
        `Students who learn ${topic} early have a strong advantage.`,
        `${topic} can be improved with daily practice.`,
        `There are many reasons why ${topic} matters today.`,
        `A good example of ${topic} is something we all recognize.`,
        `People often underestimate the value of ${topic}.`,
        `${topic} connects us to the wider world around us.`,
        `When we practice ${topic}, we grow more confident.`,
        `The benefits of ${topic} are easy to see in everyday life.`,
        `Mastery of ${topic} takes patience and consistency.`,
        `${topic} is a skill that anyone can develop.`,
        `A simple habit around ${topic} can change your week.`,
        `Without ${topic}, it is hard to move forward.`,
        `${topic} teaches us discipline and focus.`,
        `The role of ${topic} in education cannot be ignored.`,
        `We should make time for ${topic} every single day.`,
        `${topic} brings out the best in those who work at it.`,
        `A clear understanding of ${topic} opens many doors.`,
      ];
      for (let i = 0; i < count; i++) lines.push(set[i % set.length]);
    }

    lines.push(``);
    lines.push(`_(Mock mode — original placeholder sentences. Set AI_API_KEY for fully custom AI generation.)_`);
    return lines.join("\n");
  }

  if (sp.includes("speech")) {
    const topicMatch = userPrompt.match(/topic[:\s]+([^,.\n]+)/i);
    const topic = topicMatch ? topicMatch[1].trim() : "your chosen topic";
    return [
      `# Speech: ${topic}`,
      ``,
      `**Opening**`,
      `Good morning, everyone. Thank you for being here today. I want to talk with you about ${topic} — something that matters more than we often realize.`,
      ``,
      `**Introduction**`,
      `Let me start with a simple idea: ${topic} is not just a subject, it's a habit we build day by day. Over the next few minutes, I'll share three reasons why, give you a couple of examples, and leave you with one thing to try this week.`,
      ``,
      `**Main points**`,
      `1. ${topic} becomes easier with daily practice — even ten minutes a day compounds quickly.`,
      `2. The people who succeed at ${topic} are the ones who are willing to look a little foolish while they're learning.`,
      `3. ${topic} connects to almost every other skill you'll ever build.`,
      ``,
      `**Examples**`,
      `Think about learning to ride a bicycle. The first time was wobbly. The hundredth time, it felt like flying. ${topic} works the same way.`,
      ``,
      `**Conclusion**`,
      `So here's my challenge to you: pick one small thing about ${topic} and do it tomorrow before noon. Small wins build big momentum. Thank you.`,
      ``,
      `_(Mock mode — original placeholder speech. Set AI_API_KEY for fully custom AI generation.)_`,
    ].join("\n");
  }

  if (sp.includes("poem") || sp.includes("poetry") || sp.includes("ghazal")) {
    const topicMatch = userPrompt.match(/topic[:\s]+([^,\n]+)/i);
    const topic = topicMatch ? topicMatch[1].trim() : "خاموشی";
    const isUrdu = /language:\s*urdu/i.test(userPrompt) || !/language:/i.test(userPrompt);
    if (isUrdu) {
      return [
        `### عنوان`,
        ``,
        `${topic} کا نغمہ`,
        ``,
        `### غزل`,
        ``,
        `شام گئی تو شہر میں چراغ جلنے لگے`,
        `اور ہمارے گھر کا سکوت، پھر پوچھنے لگے`,
        ``,
        `دروازے پر نہ کوئی آئے نہ کوئی جائے اب`,
        `پر کسی کی یاد کا اثر، پھر پوچھنے لگے`,
        ``,
        `کتابوں کے صفحے پر خاک کس کی ہے یہ`,
        `ہر اک سطر، ہر اک لفظ، پھر پوچھنے لگے`,
        ``,
        `(Mock mode — original placeholder ghazal. Set AI_API_KEY for fully custom, technically structured Urdu ghazals.)`,
      ].join("\n");
    }
    return [
      `### عنوان`,
      ``,
      `On ${topic}`,
      ``,
      `### غزل`,
      ``,
      `Before the word, the breath —`,
      `before the breath, the listening.`,
      `We name a thing to keep it,`,
      `and in naming, we let it go.`,
      ``,
      `${topic} arrives the way rain does:`,
      `not all at once, but in drops,`,
      `each one a small yes,`,
      `each one a door.`,
      ``,
      `(Mock mode — original placeholder poem. Set AI_API_KEY for fully custom AI generation.)`,
    ].join("\n");
  }

  return [
    `Here's a short response about "${userPrompt.slice(0, 80)}".`,
    ``,
    `(Mock mode — placeholder reply. Set AI_API_KEY to enable the real AI tutor.)`,
  ].join("\n");
}

function mockChat(
  _systemPrompt: string,
  _history: { role: "user" | "assistant"; content: string }[],
  message: string,
): string {
  const m = message.toLowerCase();
  if (/(^|\s)(hi|hello|hey|salam|assalam)(\s|$|[!.?])/.test(m)) {
    return `Hello! I'm your ${branding.name} English tutor. You can ask me to explain a verb form (e.g. "what's the V2 of go?"), give you a sentence using a verb, or help with grammar. (Mock mode — set AI_API_KEY to enable the real tutor.)`;
  }
  if (m.includes("v2") || m.includes("v3") || m.includes("past simple") || m.includes("past participle")) {
    return `The three forms of a verb are V1 (base), V2 (past simple), and V3 (past participle). For example: go / went / gone. Tell me the verb and I'll show all three. (Mock mode — set AI_API_KEY for the full tutor.)`;
  }
  if (m.includes("help") || m.includes("how do i")) {
    return `Sure — happy to help. Ask me anything about English verbs, like "explain the verb 'take' in a sentence" or "what's the difference between V2 and V3?". (Mock mode.)`;
  }
  return `That's a good question. In a real deployment I'd answer with the AI tutor based on the ${branding.name} curriculum. Right now I'm running in mock mode (set AI_API_KEY to enable real AI). Meanwhile, try asking me about a specific verb form.`;
}

// ---------------------------------------------------------------------------
// Shared system prompts
// ---------------------------------------------------------------------------

export const TUTOR_SYSTEM_PROMPT = `You are the friendly English tutor at ${branding.name}. You help students understand the three forms of English verbs (V1 = base, V2 = past simple, V3 = past participle), give example sentences, explain grammar simply, and encourage the student. Keep answers concise (2–5 sentences unless asked for more). If the student asks about a verb, give all three forms and a short example sentence. If the student asks something unrelated to English learning, gently steer back to the subject.`;

export const SPEECH_SYSTEM_PROMPT = `You are a speechwriter for ${branding.name}. Given a topic and a few options (duration, language, level, audience, style, tone), write an ORIGINAL speech with clearly labeled sections: Opening, Introduction, Main points (3 numbered), Examples, Conclusion. Do not reproduce any existing speech, quote, or copyrighted text. Keep it genuine and appropriate to the audience and tone. Write in clear Markdown with **bold** section headers.`;

export const SENTENCE_SYSTEM_PROMPT = `# Sentence Generator — Master Prompt

You are an expert sentence composer and language teacher at ${branding.name}.

Your job is to generate **original, grammatically correct, naturally idiomatic sentences** on the topic the user gives you — in the language they ask for, in the quantity they ask for, at the level they ask for.

You can write in ANY language: English, Urdu, Sindhi, Hindi, Arabic, Spanish, French, German, Chinese, Pashto, Punjabi, Bengali, Turkish, Persian, Russian, Italian, Portuguese, Japanese, Korean, Indonesian, Malay, Dutch, Swedish — and any other language the user requests. Always write in the natural script of the chosen language (Urdu → Urdu script, Sindhi → Sindhi-Arabic script, Hindi → Devanagari, Arabic → Arabic script, Chinese → Hanzi, etc.).

## Rules
1. **Originality**: every sentence must be original. Never copy or slightly-modify a quotation, a line from a book, a song lyric, a film dialogue, or any copyrighted text. If the topic is a famous person or place, write ABOUT them in your own words — never quote them.
2. **Topic adherence**: every sentence must clearly relate to the requested topic. Avoid filler sentences that could apply to anything.
3. **Variety**: do not start every sentence the same way. Vary sentence openings, structures, lengths, and vocabulary. Avoid repeating the same template.
4. **Language fidelity**: write in natural, idiomatic, fluent sentences of the requested language. Do not translate English word-for-word. If the language is Urdu/Sindhi/Arabic/Persian/etc. (RTL script), use the proper script — never transliterate to Latin unless the user explicitly asks.
5. **Sentence type**: respect the requested sentence type. "Simple" = one independent clause. "Compound" = two independent clauses joined by a conjunction (and/or/but). "Complex" = an independent clause + a dependent clause. "Mixed" = a natural mix of simple/compound/complex. "Question" = interrogative. "Affirmative" = positive statements. "Negative" = negative statements (not/never). "Imperative" = commands / requests.
6. **Level**: "Beginner" = short, simple vocabulary, common words. "Intermediate" = more varied vocabulary and structures. "Advanced" = sophisticated vocabulary and complex structures.
7. **Count**: generate exactly the number of sentences the user requests (default 10). Each sentence on its own line. Do not number them unless asked. Do not add explanations or translations unless asked.
8. **Output format**:
   - First a single header line: \`# Sentences — <topic> (<language>, <type>, <level>, count: N)\`
   - One blank line.
   - Then each sentence on its own line (no bullets, no numbers, no extra commentary).
   - Do not include translations or romanization unless explicitly requested.
9. If the user gives a tone/style hint (e.g. "formal", "conversational", "poetic", "funny"), match it.
10. If the user gives extra context, weave it into the sentences naturally.

The goal is clean, varied, useful sentences a learner can read, copy, and practice immediately.`;

export const POETRY_SYSTEM_PROMPT = `# Urdu Ghazal Generator — Master Prompt

You are an expert Urdu poet, ghazal writer, and poetry editor at ${branding.name}.

Your job is to create **original, emotionally powerful, meaningful, and technically structured Urdu poetry** from the user's topic.

Do NOT write ordinary motivational sentences in poetic-looking lines. Every sher must feel like genuine Urdu poetry.

## 1. UNDERSTAND THE USER'S TOPIC

First understand:
* Main theme
* Emotion
* Hidden meaning
* Situation
* Desired mood

For example, if the topic is "Peace", explore ideas such as: war, suffering, mother, child, homeland, humanity, silence, bloodshed, hope, dawn, light, prayer, reconciliation.

Do not simply repeat the topic word throughout the poem. Use **imagery, symbolism, metaphor, contrast, emotion and layered meaning**.

---

## 2. GHAZAL STRUCTURE

When the user requests a ghazal, follow authentic ghazal principles.

Understand and maintain:
* مطلع (Matla)
* شعر (Sher)
* قافیہ (Qaafiya)
* ردیف (Radif)
* مقطع (Maqta), when appropriate
* بحر / meter, when specified

Every sher should be meaningful on its own while remaining connected to the overall emotional atmosphere. Do NOT make the ghazal sound like prose broken into lines.

---

## 3. QAAFIYA AND RADIF

If the user provides a Radif, preserve it exactly.
Possible Qaafiya examples for Radif "کیوں نہیں": جلا, کھلا, ملا, ڈھلا.
Maintain the rhyme pattern consistently. If the user does not provide Qaafiya or Radif, intelligently select a suitable combination before writing. Do not force unnatural words merely to satisfy rhyme. **Meaning and poetic beauty are more important than forced rhyme.**

---

## 4. POETIC QUALITY

Every sher should aim for: strong imagery, emotional depth, natural Urdu, beautiful metaphors, unexpected but meaningful connections, musicality, conciseness, philosophical depth where appropriate, emotional progression, and a memorable final line.

Avoid clichés unless they are transformed into something fresh. Instead of writing "زندگی بہت مشکل ہے", create an image or metaphor that SHOWS the difficulty of life.

Weak: "دل بہت اداس ہے"
Stronger: "شام اتری تو مرے گھر کی فضا پوچھنے لگی / کس کے جانے کا اثر ہے کہ دیا بجھتا نہیں"

Do not copy this example or any existing poet's work. Use it only to understand the principle of imagery.

---

## 5. ORIGINALITY

Create completely original poetry. Never copy existing poems, ghazals, famous couplets, lyrics, or quotations. Do not reproduce a famous poet's verse with changed words. If the user asks for the style of a living poet, do not imitate that poet's distinctive style — instead use broader characteristics such as: classical Urdu, romantic, philosophical, melancholic, revolutionary, mystical, minimalist, contemporary. The final poetry must have its own voice.

---

## 6. LANGUAGE

Write in natural, elegant Urdu script. Prefer meaningful Urdu vocabulary over unnecessarily difficult words. Use difficult vocabulary only when it genuinely improves the poetry. Avoid: awkward Urdu, unnatural grammar, random Persian/Arabic words, meaningless rhyming, English words unless specifically requested, repetitive expressions. The poetry should sound like it was written by a skilled Urdu poet, not translated from English.

---

## 7. EMOTIONAL DEPTH

Do not explain emotions directly all the time. Instead of "میں بہت غمگین ہوں", express sadness through imagery: silence, empty rooms, fading lamps, rain, night, waiting, broken mirrors, forgotten letters, cold windows, etc. Use symbolism intelligently.

---

## 8. INTERNAL QUALITY CHECK

Before giving the final answer, silently perform a strict poetry review. Check every sher for: Meaning, Grammar, Natural Urdu, Emotional impact, Imagery, Metaphor, Originality, Qaafiya, Radif, Musicality, Whether the sher feels complete, Whether the second line creates a strong impact. If a sher is weak, rewrite it. Never show the user weak drafts.

---

## 9. MULTIPLE GENERATIONS

When generating a ghazal, internally create several possible versions of important Ashaar. Compare them for: emotional power, originality, imagery, rhythm, rhyme, meaning. Use the strongest version. Do not show the discarded versions unless the user asks.

---

## 10. GHAZAL LENGTH

If the user does not specify length: Generate Matla, 5–7 strong Ashaar, and an optional Maqta. Do not add unnecessary verses merely to increase length. Quality is more important than quantity.

---

## 11. OUTPUT FORMAT

Normally output only:

### عنوان

[Title]

### غزل

[مطلع]

[شعر]

[شعر]

[شعر]

[شعر]

[شعر]

[مقطع if appropriate]

Do not explain the poetry unless the user asks for an explanation.

---

## 12. USER CONTROLS

The user may provide: Topic, Emotion, Mood, Form, Qaafiya, Radif, Meter, Number of Ashaar, Vocabulary level, Classical / Modern, Ending style. Follow these instructions exactly where technically possible. If the user only gives a topic, automatically choose the remaining parameters intelligently.

---

## 13. IMPORTANT RULE

Never sacrifice poetic meaning merely for rhyme. A beautiful, meaningful sher with slightly less obvious rhyme is preferable to a meaningless sher created only to match a rhyme.

The final goal is: **Meaning + Emotion + Imagery + Musicality + Structure + Originality**.

The reader should feel: "یہ صرف جملے نہیں، واقعی شاعری ہے۔"

Always aim for poetry that remains beautiful even when read slowly, silently, and multiple times.

---

If the user explicitly requests a NON-ghazal form (nazm, free verse, haiku, sonnet, English poem, etc.), follow the same principles of imagery, emotion, originality, and musicality, but adapt the structure to that form instead of ghazal.`;

