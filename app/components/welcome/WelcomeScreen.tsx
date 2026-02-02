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
    <div className="flex flex-col min-h-[60vh] py-6">
      <div className="flex flex-col items-center px-4">
        <div className="w-16 h-16 mb-4 rounded-xl bg-primary flex items-center justify-center">
          <Heart className="w-8 h-8 text-primary-foreground" />
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center">
          Welcome to Health Assistant
        </h2>

        <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
          Ask me about your lab results, care team, or any health concerns.
          Tap a card below to get started.
        </p>
      </div>

      {/* Mobile: horizontal scroll, Tablet+: centered grid */}
      <div className="w-full overflow-x-auto scrollbar-hide md:overflow-x-visible md:px-4">
        <div className="inline-flex gap-3 px-4 pb-4 md:grid md:grid-cols-3 md:gap-4 md:max-w-4xl md:mx-auto md:px-0 md:w-full">
          <div className="w-[280px] flex-shrink-0 md:w-auto">
            <SampleLabResult onSelect={onSendMessage} />
          </div>
          <div className="w-[280px] flex-shrink-0 md:w-auto">
            <SampleTrendLab onSelect={onSendMessage} />
          </div>
          <div className="w-[280px] flex-shrink-0 md:w-auto">
            <SampleCareTeam onSelect={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
