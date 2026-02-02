'use client';

import { Message } from '../../types/chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
import { ElementRenderer } from './elements/ElementRenderer';

interface MessageBubbleProps {
  message: Message;
  onSendMessage?: (message: string) => void;
}

export function MessageBubble({ message, onSendMessage }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const hasElements = message.elements && message.elements.length > 0;

  const timestamp = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] md:max-w-[70%]">
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg rounded-br-none">
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 text-right">
            {timestamp}
          </p>
        </div>
      </div>
    );
  }

  if (hasElements) {
    return (
      <div className="flex justify-start">
        <div className="flex items-start gap-3 max-w-[90%] md:max-w-[80%]">
          <Avatar className="w-8 h-8 mt-1">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Heart className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3 flex-1">
            {message.content && (
              <div className="bg-muted px-4 py-3 rounded-lg rounded-tl-none">
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
            )}
            <ElementRenderer elements={message.elements!} onSendMessage={onSendMessage} />
            <p className="text-[10px] text-muted-foreground">{timestamp}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[85%] md:max-w-[70%]">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Heart className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="bg-muted px-4 py-3 rounded-lg rounded-tl-none">
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}
