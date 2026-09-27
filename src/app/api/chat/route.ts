import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { chat, TUTOR_SYSTEM_PROMPT, isMockMode } from "@/lib/ai";

export const maxDuration = 300;

const schema = z.object({
  conversationId: z.string().nullable(),
  message: z.string().min(1).max(2000),
});

export async function GET() {
  // List the user's conversations
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const conversations = await db.chatConversation.findMany({
    where: { profileId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true },
    take: 50,
  });
  return NextResponse.json({ conversations, mock: isMockMode() });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { conversationId, message } = parsed.data;

  // Find or create a conversation
  let conversation = conversationId
    ? await db.chatConversation.findFirst({
        where: { id: conversationId, profileId: user.id },
        include: { messages: { orderBy: { id: "asc" }, take: 20, select: { role: true, content: true } } },
      })
    : null;

  if (!conversation) {
    const title = message.slice(0, 60) + (message.length > 60 ? "…" : "");
    conversation = await db.chatConversation.create({
      data: {
        profileId: user.id,
        title,
        messages: { create: [] },
      },
      include: { messages: { take: 0, select: { role: true, content: true } } },
    });
  }

  // Save the user message
  await db.chatMessage.create({
    data: { conversationId: conversation.id, role: "user", content: message },
  });

  const history = conversation.messages.map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
  })) as { role: "user" | "assistant"; content: string }[];

  // Get the AI reply (mock or real)
  let reply = "";
  try {
    reply = await chat(TUTOR_SYSTEM_PROMPT, history, message);
  } catch {
    reply = "I had trouble responding just now. Please try again.";
  }

  await db.chatMessage.create({
    data: { conversationId: conversation.id, role: "assistant", content: reply },
  });

  // Bump conversation updatedAt (used for ordering the list)
  await db.chatConversation.update({
    where: { id: conversation.id },
    data: { updatedAt: new Date() },
  });

  return NextResponse.json({
    ok: true,
    conversationId: conversation.id,
    reply,
    mock: isMockMode(),
  });
}
