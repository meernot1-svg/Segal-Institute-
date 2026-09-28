import { ChatClient } from "@/components/chat-client";

export const dynamic = "force-dynamic";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="hidden lg:block">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          AI Tutor
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask anything about English — grammar, tenses, articles, prepositions, verb forms (V1/V2/V3), vocabulary, sentence construction, writing, or conversation.
        </p>
      </div>
      <div className="mt-4 lg:mt-6">
        <ChatClient />
      </div>
    </div>
  );
}
