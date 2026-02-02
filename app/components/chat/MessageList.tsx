"use client";

import { useEffect, useRef } from "react";
import { Message } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WelcomeScreen } from "../welcome/WelcomeScreen";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

export function MessageList({ messages, isLoading, onSend }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <WelcomeScreen onSendMessage={onSend} />
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} onSendMessage={onSend} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
