'use client';

import { useChat } from '../../hooks/useChat';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { AlertCircle } from 'lucide-react';

export function ChatContainer() {
  const { messages, isLoading, error, sendMessage, startNewConversation } =
    useChat();

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <ChatHeader onNewChat={startNewConversation} />
      <MessageList messages={messages} isLoading={isLoading} onSend={sendMessage} />
      {error && (
        <div className="px-4 py-3 bg-destructive/10 border-t border-destructive/20">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      )}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
