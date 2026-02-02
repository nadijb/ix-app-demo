'use client';

import { SAMPLE_TREND, SAMPLE_PROMPTS } from '../../lib/sampleData';
import { TrendingDown } from 'lucide-react';

interface SampleTrendLabProps {
  onSelect: (message: string) => void;
}

export function SampleTrendLab({ onSelect }: SampleTrendLabProps) {
  const { dataPoints, labels } = SAMPLE_TREND;
  const maxValue = Math.max(...dataPoints);
  const minValue = Math.min(...dataPoints);
  const range = maxValue - minValue;

  const getY = (value: number) => {
    const normalized = (value - minValue) / range;
    return 50 - normalized * 40;
  };

  const pathData = dataPoints
    .map((value, index) => {
      const x = (index / (dataPoints.length - 1)) * 100;
      const y = getY(value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const getTrendColor = () => {
    return SAMPLE_TREND.trend === 'improving' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendText = () => {
    return SAMPLE_TREND.trend === 'improving' ? 'Improving' : 'Worsening';
  };

  return (
    <button
      onClick={() => onSelect(SAMPLE_PROMPTS.trendLab)}
      className="w-full text-left bg-card border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
          <TrendingDown className="w-4 h-4 text-blue-600" />
        </div>
        <span className="font-medium text-sm">Lab Trends</span>
      </div>

      <div className="space-y-3">
        <p className="text-base font-semibold">
          {SAMPLE_TREND.testName} Levels ({SAMPLE_TREND.period})
        </p>

        <div className="relative h-16 w-full">
          <svg
            viewBox="0 0 100 60"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d={pathData}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-500"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {dataPoints.map((value, index) => (
              <circle
                key={index}
                cx={(index / (dataPoints.length - 1)) * 100}
                cy={getY(value)}
                r="2.5"
                className="fill-blue-500"
              />
            ))}
          </svg>
        </div>

        <div className="flex justify-between text-[10px] text-muted-foreground">
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-100 ${getTrendColor()}`}>
          Trend: {getTrendText()} <TrendingDown className="w-3 h-3" />
        </div>
      </div>
    </button>
  );
}
