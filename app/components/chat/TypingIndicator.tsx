'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Heart className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="bg-muted rounded-lg rounded-tl-none px-4 py-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
