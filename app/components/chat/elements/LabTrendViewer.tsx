'use client';

import { LabTrendData } from '../../../types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart3, TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';

interface LabTrendViewerProps {
  data: LabTrendData;
}

export function LabTrendViewer({ data }: LabTrendViewerProps) {
  const values = data.points.map((p) => parseFloat(p.value));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const padding = range * 0.15;
  const chartMin = minValue - padding;
  const chartMax = maxValue + padding;
  const chartRange = chartMax - chartMin;

  const chartHeight = 120;
  const chartWidth = 100;

  const getY = (value: number) => {
    return chartHeight - ((value - chartMin) / chartRange) * chartHeight;
  };

  const getX = (index: number) => {
    return (index / (data.points.length - 1)) * chartWidth;
  };

  const createSmoothPath = () => {
    if (data.points.length < 2) return '';
    let path = `M ${getX(0)} ${getY(values[0])}`;
    for (let i = 0; i < data.points.length - 1; i++) {
      const x0 = getX(i);
      const y0 = getY(values[i]);
      const x1 = getX(i + 1);
      const y1 = getY(values[i + 1]);
      const cpx1 = x0 + (x1 - x0) / 3;
      const cpx2 = x1 - (x1 - x0) / 3;
      path += ` C ${cpx1} ${y0}, ${cpx2} ${y1}, ${x1} ${y1}`;
    }
    return path;
  };

  const linePath = createSmoothPath();
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  const latestValue = values[values.length - 1];
  const previousValue = values.length > 1 ? values[values.length - 2] : latestValue;
  const changePercent = previousValue !== 0 ? ((latestValue - previousValue) / previousValue) * 100 : 0;
  const trend = latestValue > previousValue ? 'up' : latestValue < previousValue ? 'down' : 'stable';
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendBadgeClass =
    trend === 'up'
      ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
      : trend === 'down'
        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
        : 'bg-muted text-muted-foreground';

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">{data.testName} Trend</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {data.points.length} data points
              </p>
            </div>
          </div>
          <Badge className={trendBadgeClass}>
            <TrendIcon className="w-3 h-3 mr-1" />
            {changePercent !== 0 ? `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%` : 'Stable'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Stats */}
        <div className="flex items-center justify-between text-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Latest</p>
            <p className="text-lg font-bold">{latestValue.toFixed(2)}</p>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Average</p>
            <p className="text-lg font-semibold text-muted-foreground">{avgValue.toFixed(2)}</p>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Range</p>
            <p className="text-lg font-semibold text-muted-foreground">{minValue.toFixed(1)} - {maxValue.toFixed(1)}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-32">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1="0"
                y1={chartHeight * ratio}
                x2={chartWidth}
                y2={chartHeight * ratio}
                stroke="currentColor"
                className="text-border"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}

            <path d={areaPath} fill="url(#areaFill)" />
            <path d={linePath} fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {data.points.map((point, index) => {
              const x = getX(index);
              const y = getY(parseFloat(point.value));
              const isLast = index === data.points.length - 1;
              const isFirst = index === 0;
              const isMax = parseFloat(point.value) === maxValue;
              const isMin = parseFloat(point.value) === minValue;
              if (!isLast && !isFirst && !isMax && !isMin) return null;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={isLast ? 4 : 2.5}
                  fill={isLast ? '#0d9488' : '#fff'}
                  stroke="#0d9488"
                  strokeWidth={isLast ? 2 : 1.5}
                />
              );
            })}
          </svg>

          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-muted-foreground">
            <span>{maxValue.toFixed(1)}</span>
            <span>{minValue.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{data.points[0]?.label}</span>
          <span>{data.points[Math.floor(data.points.length / 2)]?.label}</span>
          <span>{data.points[data.points.length - 1]?.label}</span>
        </div>

        <Separator />

        {/* Insight */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium mb-1">Clinical Insight</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{data.analysis}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
