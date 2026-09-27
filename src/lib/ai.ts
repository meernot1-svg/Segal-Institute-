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
        max_tokens: 1500,
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

