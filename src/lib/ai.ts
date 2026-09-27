/**
 * AI provider abstraction.
 *
 * Real mode uses z-ai-web-dev-sdk (only when AI_API_KEY is set or the SDK is
 * configured in this environment). Mock mode returns helpful, deterministic
 * responses so the app runs with zero AI spend during development.
 *
 * Always called from server-side code only.
 * (See the LLM skill — z-ai-web-dev-sdk must never run on the client.)
 */
import { branding } from "@/lib/branding";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MOCK =
  process.env.ENABLE_MOCK_AI === "true" || !process.env.AI_API_KEY;

export function isMockMode() {
  return MOCK;
}

let zaiInstance: any | null = null;
async function getZai() {
  if (zaiInstance) return zaiInstance;
  const { default: ZAI } = await import("z-ai-web-dev-sdk");
  zaiInstance = await ZAI.create();
  return zaiInstance;
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
      const zai = await getZai();
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        thinking: { type: "disabled" },
      });
      const out = completion.choices[0]?.message?.content;
      if (out && out.trim()) return out.trim();
    } catch (e) {
      // fall through to mock
    }
  }
  return mockComplete(systemPrompt, userPrompt);
}

/**
 * Multi-turn chat. `history` should be the prior messages (user+assistant)
 * excluding the system prompt; `message` is the new user message.
 */
export async function chat(
  systemPrompt: string,
  history: ChatMessage[],
  message: string,
): Promise<string> {
  if (!MOCK) {
    try {
      const zai = await getZai();
      const messages: ChatMessage[] = [
        { role: "assistant", content: systemPrompt },
        ...history.slice(-10),
        { role: "user", content: message },
      ];
      const completion = await zai.chat.completions.create({
        messages,
        thinking: { type: "disabled" },
      });
      const out = completion.choices[0]?.message?.content;
      if (out && out.trim()) return out.trim();
    } catch (e) {
      // fall through to mock
    }
  }
  return mockChat(systemPrompt, history, message);
}

// ---------------------------------------------------------------------------
// Mock responses
// ---------------------------------------------------------------------------

function mockComplete(systemPrompt: string, userPrompt: string): string {
  // Heuristic: pick a mock based on what the system prompt asks for.
  const sp = systemPrompt.toLowerCase();
  const up = userPrompt.toLowerCase();

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
      `_(Mock mode — original placeholder speech generated locally. Set AI_API_KEY to generate fully custom speeches.)_`,
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
      `_(Mock mode — original placeholder poem generated locally. Set AI_API_KEY to generate fully custom poetry.)_`,
    ].join("\n");
  }

  // Generic fallback
  return [
    `Here's a short response about "${userPrompt.slice(0, 80)}".`,
    ``,
    `(Mock mode — this is a placeholder reply. Set AI_API_KEY to enable the real AI tutor.)`,
  ].join("\n");
}

function mockChat(
  systemPrompt: string,
  history: ChatMessage[],
  message: string,
): string {
  const m = message.toLowerCase();
  // A few simple, friendly canned replies that acknowledge the user.
  if (/(^|\s)(hi|hello|hey|salam|assalam)(\s|$|[!.?])/.test(m)) {
    return `Hello! I'm your Segal Institute English tutor. You can ask me to explain a verb form (e.g. "what's the V2 of go?"), give you a sentence using a verb, or help with grammar. (Mock mode — set AI_API_KEY to enable the real tutor.)`;
  }
  if (m.includes("v2") || m.includes("v3") || m.includes("past simple") || m.includes("past participle")) {
    return `The three forms of a verb are V1 (base), V2 (past simple), and V3 (past participle). For example: go / went / gone. Tell me the verb and I'll show all three. (Mock mode — set AI_API_KEY for the full tutor.)`;
  }
  if (m.includes("help") || m.includes("how do i")) {
    return `Sure — happy to help. Ask me anything about English verbs, like "explain the verb 'take' in a sentence" or "what's the difference between V2 and V3?". (Mock mode.)`;
  }
  return `That's a good question. In a real deployment I'd answer with the AI tutor based on the Segal Institute curriculum. Right now I'm running in mock mode (set AI_API_KEY to enable real AI). Meanwhile, try asking me about a specific verb form.`;
}

// ---------------------------------------------------------------------------
// Shared system prompts
// ---------------------------------------------------------------------------

export const TUTOR_SYSTEM_PROMPT = `You are the friendly English tutor at ${branding.name}. You help students understand the three forms of English verbs (V1 = base, V2 = past simple, V3 = past participle), give example sentences, explain grammar simply, and encourage the student. Keep answers concise (2–5 sentences unless asked for more). If the student asks about a verb, give all three forms and a short example sentence.`;

export const SPEECH_SYSTEM_PROMPT = `You are a speechwriter for ${branding.name}. Given a topic and a few options (duration, language, level, audience, style, tone), write an ORIGINAL speech with clearly labeled sections: Opening, Introduction, Main points (3 numbered), Examples, Conclusion. Do not reproduce any existing speech, quote, or copyrighted text. Keep it genuine and appropriate to the audience and tone.`;

export const POETRY_SYSTEM_PROMPT = `You are a poet at ${branding.name}. Given a topic, language, style, length, and mood, write an ORIGINAL poem. Never reproduce existing copyrighted poems, song lyrics, or famous verses — write fresh lines. Keep it short (one stanza for "short", two for "medium", three for "long").`;
