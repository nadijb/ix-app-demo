'use client';

import { useState } from 'react';
import { Doctor, DayAvailability, TimeSlot } from '../../../types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Stethoscope, GraduationCap, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface DoctorsDirectoryProps {
  doctors: Doctor[];
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

function generateAvailability(): DayAvailability[] {
  const days: DayAvailability[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    const slots: TimeSlot[] = [];
    const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

    times.forEach((time) => {
      if (isWeekend) {
        slots.push({ time, available: false });
      } else {
        slots.push({ time, available: Math.random() > 0.4 });
      }
    });

    days.push({
      date: dateStr,
      dayName,
      slots,
    });
  }

  return days;
}

export function DoctorsDirectory({ doctors, onSendMessage }: DoctorsDirectoryProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ day: DayAvailability; slot: TimeSlot } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [dayIndex, setDayIndex] = useState(0);

  const handleViewAvailability = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setAvailability(generateAvailability());
    setSelectedSlot(null);
    setIsBooked(false);
    setDayIndex(0);
    setIsDialogOpen(true);
  };

  const handleSlotSelect = (day: DayAvailability, slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot({ day, slot });
    }
  };

  const handleBook = () => {
    if (selectedSlot && selectedDoctor) {
      setIsBooked(true);
      if (onSendMessage) {
        onSendMessage(
          `Book appointment with ${selectedDoctor.name} on ${selectedSlot.day.dayName}, ${selectedSlot.day.date} at ${selectedSlot.slot.time}`
        );
      }
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setIsBooked(false);
  };

  const visibleDays = availability.slice(dayIndex, dayIndex + 3);
  const canGoBack = dayIndex > 0;
  const canGoForward = dayIndex + 3 < availability.length;

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Available Doctors</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-0">
            {doctors.map((doctor, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarFallback
                      style={{ backgroundColor: doctor.roleColor }}
                      className="text-white font-medium"
                    >
                      {getInitials(doctor.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{doctor.name}</p>
                    <Badge
                      variant="secondary"
                      className="mt-1 font-normal"
                      style={{
                        backgroundColor: `${doctor.roleColor}15`,
                        color: doctor.roleColor,
                      }}
                    >
                      {doctor.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-3 h-3" />
                      {doctor.specialty}
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 text-xs mt-3"
                      onClick={() => handleViewAvailability(doctor)}
                    >
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      View Availability
                    </Button>
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
                  Select an available time slot with {selectedDoctor?.name}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setDayIndex(Math.max(0, dayIndex - 1))}
                    disabled={!canGoBack}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {visibleDays[0]?.date} - {visibleDays[visibleDays.length - 1]?.date}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setDayIndex(Math.min(availability.length - 3, dayIndex + 1))}
                    disabled={!canGoForward}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {visibleDays.map((day) => (
                    <div key={day.date} className="text-center">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        {day.dayName}
                      </div>
                      <div className="text-sm font-semibold mb-2">{day.date}</div>
                      <div className="space-y-1.5">
                        {day.slots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => handleSlotSelect(day, slot)}
                            disabled={!slot.available}
                            className={`w-full py-1.5 px-2 text-xs rounded-md transition-colors ${
                              selectedSlot?.day.date === day.date && selectedSlot?.slot.time === slot.time
                                ? 'bg-primary text-primary-foreground'
                                : slot.available
                                ? 'bg-muted hover:bg-primary/10 text-foreground'
                                : 'bg-muted/50 text-muted-foreground line-through cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleBook} disabled={!selectedSlot}>
                  Book Appointment
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
                  Your appointment with {selectedDoctor?.name} has been scheduled for{' '}
                  {selectedSlot?.day.dayName}, {selectedSlot?.day.date} at {selectedSlot?.slot.time}
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
