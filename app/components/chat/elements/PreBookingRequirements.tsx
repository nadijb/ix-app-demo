'use client';

import { useState } from 'react';
import { PreBookingRequirement } from '../../../types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardCheck, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface PreBookingRequirementsProps {
  requirements: PreBookingRequirement[];
  acknowledgmentText: string;
  onSendMessage?: (message: string) => void;
}

export function PreBookingRequirements({
  requirements,
  acknowledgmentText,
  onSendMessage,
}: PreBookingRequirementsProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    requirements.forEach((req, index) => {
      initial[index] = req.checked;
    });
    return initial;
  });
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allRequirementsMet = requirements.every((_, index) => checkedItems[index]);
  const canSubmit = allRequirementsMet && acknowledged;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleCheckChange = (index: number, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [index]: checked }));
  };

  const handleSubmit = () => {
    if (canSubmit) {
      setSubmitted(true);
      if (onSendMessage) {
        onSendMessage('I have completed all pre-booking requirements and agreed to the terms.');
      }
    }
  };

  if (submitted) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-base mb-1">Requirements Completed</h3>
            <p className="text-sm text-muted-foreground">
              All pre-booking requirements have been fulfilled. You can now proceed with booking.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
            <ClipboardCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-base">Pre-Booking Requirements</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount} of {requirements.length} completed
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {requirements.map((requirement, index) => {
            const isChecked = checkedItems[index];
            return (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  isChecked
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-muted/50 border-transparent'
                }`}
              >
                <Checkbox
                  id={`req-${index}`}
                  checked={isChecked}
                  onCheckedChange={(checked) => handleCheckChange(index, checked as boolean)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={`req-${index}`}
                    className={`text-sm cursor-pointer ${
                      isChecked ? 'text-emerald-700' : 'text-foreground'
                    }`}
                  >
                    {requirement.label}
                  </label>
                </div>
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              acknowledged
                ? 'bg-primary/5 border-primary/20'
                : 'bg-muted/50 border-transparent'
            }`}
          >
            <Checkbox
              id="acknowledgment"
              checked={acknowledged}
              onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
              className="mt-0.5"
            />
            <label
              htmlFor="acknowledgment"
              className="text-sm cursor-pointer text-foreground"
            >
              {acknowledgmentText}
            </label>
          </div>
        </div>

        {!allRequirementsMet && (
          <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-md">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Please complete all requirements before proceeding.</span>
          </div>
        )}

        <Button
          className="w-full mt-4"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          Confirm & Continue
        </Button>
      </CardContent>
    </Card>
  );
}
