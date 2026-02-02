'use client';

import { SAMPLE_LAB, SAMPLE_PROMPTS } from '../../lib/sampleData';
import { TestTube2 } from 'lucide-react';

interface SampleLabResultProps {
  onSelect: (message: string) => void;
}

export function SampleLabResult({ onSelect }: SampleLabResultProps) {
  const percentage = (SAMPLE_LAB.value / 10) * 100;

  const getStatusColor = () => {
    switch (SAMPLE_LAB.status) {
      case 'slightly_elevated':
        return 'text-amber-600 bg-amber-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = () => {
    switch (SAMPLE_LAB.status) {
      case 'slightly_elevated':
        return 'Slightly Elevated';
      default:
        return 'Normal';
    }
  };

  return (
    <button
      onClick={() => onSelect(SAMPLE_PROMPTS.labResult)}
      className="w-full text-left bg-card border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
          <TestTube2 className="w-4 h-4 text-purple-600" />
        </div>
        <span className="font-medium text-sm">Lab Result</span>
      </div>

      <div className="space-y-3">
        <p className="text-base font-semibold">{SAMPLE_LAB.testName}</p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-lg font-bold text-purple-600">
              {SAMPLE_LAB.value}{SAMPLE_LAB.unit}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Reference: {SAMPLE_LAB.referenceRange}
          </p>
        </div>

        <p className="text-xs text-muted-foreground">Date: {SAMPLE_LAB.date}</p>

        <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getStatusColor()}`}>
          Status: {getStatusText()}
        </div>
      </div>
    </button>
  );
}
