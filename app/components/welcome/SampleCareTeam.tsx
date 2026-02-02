'use client';

import { SAMPLE_CARE_MEMBER, SAMPLE_PROMPTS } from '../../lib/sampleData';
import { Users, Phone, Mail, Calendar } from 'lucide-react';

interface SampleCareTeamProps {
  onSelect: (message: string) => void;
}

export function SampleCareTeam({ onSelect }: SampleCareTeamProps) {
  return (
    <button
      onClick={() => onSelect(SAMPLE_PROMPTS.careTeam)}
      className="w-full text-left bg-card border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
          <Users className="w-4 h-4 text-teal-600" />
        </div>
        <span className="font-medium text-sm">Care Team</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <span className="text-lg">👤</span>
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold truncate">{SAMPLE_CARE_MEMBER.name}</p>
            <p className="text-xs text-muted-foreground">{SAMPLE_CARE_MEMBER.role}</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>{SAMPLE_CARE_MEMBER.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3" />
            <span className="truncate">{SAMPLE_CARE_MEMBER.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-600">
          <Calendar className="w-3 h-3" />
          Next Appointment: {SAMPLE_CARE_MEMBER.nextAppointment}
        </div>
      </div>
    </button>
  );
}
