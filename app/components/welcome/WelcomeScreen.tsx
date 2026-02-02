'use client';

import { Heart } from 'lucide-react';
import { SampleLabResult } from './SampleLabResult';
import { SampleTrendLab } from './SampleTrendLab';
import { SampleCareTeam } from './SampleCareTeam';

interface WelcomeScreenProps {
  onSendMessage: (message: string) => void;
}

export function WelcomeScreen({ onSendMessage }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-6">
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary flex items-center justify-center">
        <Heart className="w-8 h-8 text-primary-foreground" />
      </div>

      <h2 className="text-xl font-semibold mb-2 text-center">
        Welcome to Health Assistant
      </h2>

      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Ask me about your lab results, care team, or any health concerns.
        Tap a card below to get started.
      </p>

      <div className="w-full max-w-4xl -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4">
          <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0">
            <SampleLabResult onSelect={onSendMessage} />
          </div>
          <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0">
            <SampleTrendLab onSelect={onSendMessage} />
          </div>
          <div className="min-w-[280px] flex-shrink-0 snap-start md:min-w-0">
            <SampleCareTeam onSelect={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
