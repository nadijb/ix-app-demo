'use client';

import { useState } from 'react';
import { CareTeamMember } from '../../../types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Users, GraduationCap, CheckCircle, CalendarDays, Check, MessageCircle } from 'lucide-react';

interface CareTeamDirectoryProps {
  title: string;
  members: CareTeamMember[];
  onSendMessage?: (message: string) => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function CareTeamDirectory({ title, members, onSendMessage }: CareTeamDirectoryProps) {
  const [selectedMember, setSelectedMember] = useState<CareTeamMember | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookClick = (member: CareTeamMember) => {
    setSelectedMember(member);
    setSelectedDate(undefined);
    setIsBooked(false);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedMember) {
      setIsBooked(true);
      if (onSendMessage) {
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        onSendMessage(`Book appointment with ${selectedMember.name} on ${formattedDate}`);
      }
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedMember(null);
    setSelectedDate(undefined);
    setIsBooked(false);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Users className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {members.length} healthcare professional{members.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-0">
            {members.map((member, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-start gap-3 group">
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback
                        style={{ backgroundColor: member.roleColor }}
                        className="text-white font-medium"
                      >
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{member.name}</p>
                    <Badge
                      variant="secondary"
                      className="mt-1 font-normal"
                      style={{
                        backgroundColor: `${member.roleColor}15`,
                        color: member.roleColor,
                      }}
                    >
                      {member.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-3 h-3" />
                      {member.specialty}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => handleBookClick(member)}
                      >
                        <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                        Book Appointment
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => onSendMessage?.(`Start chat with ${member.name}`)}
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {!isBooked ? (
            <>
              <DialogHeader>
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogDescription>
                  Select a date to book an appointment with {selectedMember?.name}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center py-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!selectedDate}>
                  Submit
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <DialogTitle className="mb-2">Appointment Scheduled</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Your appointment with {selectedMember?.name} has been scheduled for{' '}
                  {selectedDate?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <DialogFooter>
                <Button onClick={handleClose} className="w-full">
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
