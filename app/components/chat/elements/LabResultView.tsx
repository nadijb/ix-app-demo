'use client';

import { LabResultData } from '../../../types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FlaskConical,
  Calendar,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ArrowDown,
} from 'lucide-react';

interface LabResultViewProps {
  data: LabResultData;
}

function getStatusConfig(flag: string) {
  const normalizedFlag = flag.toLowerCase();
  if (normalizedFlag === 'normal' || normalizedFlag === 'in range') {
    return {
      variant: 'default' as const,
      className: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
      icon: CheckCircle,
      label: 'Normal',
    };
  }
  if (normalizedFlag === 'elevated' || normalizedFlag === 'high') {
    return {
      variant: 'default' as const,
      className: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
      icon: AlertTriangle,
      label: 'Elevated',
    };
  }
  if (normalizedFlag === 'critical' || normalizedFlag === 'very high' || normalizedFlag === 'very low') {
    return {
      variant: 'default' as const,
      className: 'bg-red-100 text-red-700 hover:bg-red-100',
      icon: AlertCircle,
      label: 'Critical',
    };
  }
  if (normalizedFlag === 'low') {
    return {
      variant: 'default' as const,
      className: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      icon: ArrowDown,
      label: 'Low',
    };
  }
  return {
    variant: 'secondary' as const,
    className: '',
    icon: AlertCircle,
    label: flag,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function LabResultView({ data }: LabResultViewProps) {
  const status = getStatusConfig(data.flag);
  const StatusIcon = status.icon;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">{data.name}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Laboratory Result
              </p>
            </div>
          </div>
          <Badge className={status.className}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="py-6 text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold">{data.formattedValue}</span>
            <span className="text-lg text-muted-foreground">{data.unit}</span>
          </div>
        </div>

        <Separator />

        <div className="pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(data.date)}</span>
          </div>
          <button className="text-xs text-primary font-medium flex items-center gap-0.5 hover:underline">
            View history
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
