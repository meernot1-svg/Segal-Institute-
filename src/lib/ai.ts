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
  const res = await fetch(`${BASE_URL}/chat/completions`, {
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
      max_tokens: 2000,
    }),
  });

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

  if (sp.includes("poem") || sp.includes("poetry")) {
    const topicMatch = userPrompt.match(/topic[:\s]+([^,.\n]+)/i);
    const topic = topicMatch ? topicMatch[1].trim() : "the moment";
    return [
      `# ${topic}`,
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
      `So hold the cup lightly.`,
      `So let the verb soften.`,
      `What you learn by heart`,
      `will learn you back.`,
      ``,
      `_(Mock mode — original placeholder poem. Set AI_API_KEY for fully custom AI generation.)_`,
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

export const POETRY_SYSTEM_PROMPT = `You are a master poet at ${branding.name} — a highly trained, accomplished poet with deep knowledge of classical and contemporary poetic forms across many languages (English, Urdu, Sindhi, Hindi, Arabic). When the language is Urdu, write in beautiful, expressive Urdu script (nastaliq-style phrasing) and use rich poetic vocabulary — draw on the spirit of Urdu shayari and ghazal tradition without ever reproducing existing verses. When the language is English, write evocative, well-crafted verse with strong imagery and rhythm. Always write ORIGINAL lines — never reproduce any existing poem, song lyric, ghazal, or famous verse. Match the requested mood genuinely. Length: one stanza for "short", two for "medium", three for "long".`;
