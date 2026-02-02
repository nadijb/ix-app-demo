"use client";

import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";

interface ChatHeaderProps {
  onNewChat: () => void;
}

export function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <header
      className="border-b bg-card px-4 py-3 flex items-center justify-between safe-area-top sticky top-0 z-10"
      style={{ paddingTop: 15 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-semibold">Health Assistant</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onNewChat}>
        <Plus className="w-4 h-4 mr-1" />
        New Chat
      </Button>
    </header>
  );
}
