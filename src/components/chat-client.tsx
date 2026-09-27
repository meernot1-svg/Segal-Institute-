"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Send, Trash2, Loader2, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Msg = { id?: string; role: "user" | "assistant"; content: string };

export function ChatClient() {
  const [conversations, setConversations] = useState<{ id: string; title: string; updatedAt: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingConv, setLoadingConv] = useState(false);
  const [mock, setMock] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => {
        if (d.conversations) setConversations(d.conversations);
        if (typeof d.mock === "boolean") setMock(d.mock);
      });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function loadConversation(id: string) {
    setActiveId(id);
    setLoadingConv(true);
    setMessages([]);
    const res = await fetch(`/api/chat/${id}`);
    const data = await res.json();
    if (data.conversation) {
      setMessages(data.conversation.messages.map((m: any) => ({ id: m.id, role: m.role, content: m.content })));
    }
    setLoadingConv(false);
  }

  function newChat() {
    setActiveId(null);
    setMessages([]);
    setInput("");
  }

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: activeId, message: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      if (!activeId) setActiveId(data.conversationId);
      // Refresh conversation list (titles may have changed)
      const list = await fetch("/api/chat").then((r) => r.json());
      if (list.conversations) setConversations(list.conversations);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I had trouble responding. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function deleteConversation(id: string) {
    if (!confirm("Delete this conversation?")) return;
    await fetch(`/api/chat/${id}`, { method: "DELETE" });
    if (activeId === id) newChat();
    setConversations((c) => c.filter((x) => x.id !== id));
  }

  return (
    <div className="mx-auto grid h-[calc(100vh-9rem)] max-w-6xl gap-4 lg:grid-cols-[280px_1fr]">
      {/* Conversation list */}
      <aside className="hidden flex-col gap-2 lg:flex">
        <Button onClick={newChat} variant="outline" className="justify-start">
          <Plus className="size-4" /> New chat
        </Button>
        <div className="flex-1 space-y-1 overflow-y-auto scroll-fine pr-1">
          {conversations.length === 0 ? (
            <p className="px-2 py-4 text-xs text-muted-foreground">No conversations yet.</p>
          ) : (
            conversations.map((c) => (
              <div
                key={c.id}
                className={cn(
                  "group flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                  activeId === c.id
                    ? "border-brand-emerald/40 bg-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-accent/50"
                )}
              >
                <button
                  onClick={() => loadConversation(c.id)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <MessageSquare className="size-4 shrink-0" />
                  <span className="truncate">{c.title}</span>
                </button>
                <button
                  onClick={() => deleteConversation(c.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            ))
          )}
        </div>
        {mock && (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Running in mock mode. Set AI_API_KEY to enable the real tutor.
          </p>
        )}
      </aside>

      {/* Chat panel */}
      <Card className="flex flex-col overflow-hidden">
        {/* Mobile: new chat button */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
          <p className="font-medium">AI Tutor</p>
          <Button onClick={newChat} variant="outline" size="sm">
            <Plus className="size-4" /> New
          </Button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 scroll-fine">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-brand-emerald-deep">
                <Bot className="size-6" />
              </span>
              <div>
                <p className="font-medium text-foreground">Ask your English tutor</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try: “What are the three forms of <em>go</em>?” or “Explain the
                  difference between V2 and V3.”
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" /> Thinking…
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <form onSubmit={send} className="border-t border-border p-3">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Type your question…"
              rows={1}
              className="max-h-40 flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            />
            <Button type="submit" disabled={!input.trim() || sending} size="icon">
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
