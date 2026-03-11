"use client"
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import HabitDetailModal from './HabitDetailModal'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVertical, GripVertical } from 'lucide-react'
import { completeHabit } from '@/action/habitEntry'
import { Button } from '../ui/button'
import { updateHabit } from '@/action/habit'
import { getEarnedBadges, getNextBadge } from '@/lib/badges'

const COLOR_HEX: Record<string, string> = {
  green:  '#22c55e',
  blue:   '#3b82f6',
  purple: '#a855f7',
  orange: '#f97316',
  red:    '#ef4444',
  pink:   '#ec4899',
};

type HabitCardProps = {
  habitId: string;
  habitName: string;
  habitDesc: string;
  entries: string;
  schedule: number[];
  color: string;
  onDelete: () => void;
  dragListeners?: Record<string, unknown>;
};

export default function HabitCard({ habitId, habitName, habitDesc, entries, schedule, color, onDelete, dragListeners }: HabitCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habitName);
  const [editDesc, setEditDesc] = useState(habitDesc);
  const [displayName, setDisplayName] = useState(habitName);
  const [displayDesc, setDisplayDesc] = useState(habitDesc);
  const [localEntries, setLocalEntries] = useState<{ date: string; completed: boolean }[]>(() => {
    try { return JSON.parse(entries); } catch { return []; }
  });

  const today = new Date();
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  const calculateStreak = (entries: { date: string; completed: boolean }[]) => {
    if (!entries || entries.length === 0) return 0;
    const sorted = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 0;
    const cur = new Date(sorted[0].date);
    for (const entry of sorted) {
      const d = new Date(entry.date);
      if (entry.completed && d.toDateString() === cur.toDateString()) {
        streak++;
        cur.setDate(cur.getDate() - 1);
      } else if (d.toDateString() !== cur.toDateString()) break;
    }
    return streak;
  };

  const calculateBestStreak = (entries: { date: string; completed: boolean }[]) => {
    if (!entries.length) return 0;
    const sorted = [...entries].filter(e => e.completed).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let best = 0, current = 0, prevDate: Date | null = null;
    for (const entry of sorted) {
      const d = new Date(entry.date);
      if (prevDate) {
        const diff = Math.round((d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        current = diff === 1 ? current + 1 : 1;
        best = Math.max(best, current);
      } else { current = 1; }
      prevDate = d;
    }
    return Math.max(best, current);
  };

  const streakCount = calculateStreak(localEntries);
  const totalCheckIns = localEntries.filter(e => e.completed).length;
  const bestStreak = calculateBestStreak(localEntries);
  const earnedBadges = getEarnedBadges(bestStreak);
  const nextBadge = getNextBadge(bestStreak);
  const consistencyPercentage = localEntries.length > 0
    ? Math.round((totalCheckIns / localEntries.length) * 100)
    : 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const todayStr = today.toDateString();
    const existingIdx = localEntries.findIndex(e => new Date(e.date).toDateString() === todayStr);

    // Optimistic update — instant
    if (existingIdx >= 0) {
      setLocalEntries(prev => prev.map((e, i) => i === existingIdx ? { ...e, completed: !e.completed } : e));
    } else {
      setLocalEntries(prev => [...prev, { date: new Date().toISOString(), completed: true }]);
    }

    // Sync to DB in background
    completeHabit({ habitId });
  };

  const handleDeleteHabit = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      onDelete(); // parent removes card from list instantly + calls DB
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName(editName);
    setDisplayDesc(editDesc);
    setIsEditing(false);
    updateHabit(habitId, editName, editDesc); // fire and forget
  };

  const isCompleted = (day: Date) =>
    localEntries.some(e => e.completed && new Date(e.date).toDateString() === day.toDateString());

  const isToday = (day: Date) => day.toDateString() === today.toDateString();

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const hex = COLOR_HEX[color] ?? COLOR_HEX.green;

  return (
    <HabitDetailModal habitName={displayName} habitDesc={displayDesc} entries={JSON.stringify(localEntries)}>
      <Card
        className='flex flex-row rounded-xl grayBorder m-2 habitCard cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:shadow-lg overflow-hidden p-0'
        style={{
          background: `linear-gradient(135deg, ${hex}15 0%, #030712 55%)`,
        }}
      >
        {/* Colored drag strip */}
        <div
          {...(dragListeners as Record<string, unknown>)}
          onClick={stop}
          className='flex items-center justify-center w-9 flex-shrink-0 cursor-grab active:cursor-grabbing'
          style={{ backgroundColor: `${hex}30` }}
        >
          <GripVertical className='w-4 h-4' style={{ color: hex }} />
        </div>

        {/* Main content */}
        <div className='flex flex-col flex-1 min-w-0 justify-between'>
        <CardHeader>
          <div className='flex justify-between items-center w-full'>
            <div className='flex flex-col gap-1'>
              <CardTitle className='text-3xl flex items-center'>{displayName}</CardTitle>
              <p className='text-gray-400 text-sm'>{displayDesc}</p>
              {earnedBadges.length > 0 && (
                <div className='flex flex-wrap gap-1 mt-1'>
                  {earnedBadges.map(badge => (
                    <span
                      key={badge.days}
                      title={`${badge.label} — ${badge.days} day streak`}
                      className={`text-xs px-2 py-0.5 rounded-lg border font-medium ${badge.color}`}
                    >
                      {badge.icon} {badge.label}
                    </span>
                  ))}
                </div>
              )}
              {nextBadge && (
                <p className='text-[11px] text-gray-600 mt-0.5'>
                  {nextBadge.days - bestStreak} days to {nextBadge.icon} {nextBadge.label}
                </p>
              )}
            </div>

            <div className='flex items-start gap-2' onClick={stop}>
              {isEditing && (
                <form onSubmit={handleSaveEdit} className='flex flex-col gap-2'>
                  <input
                    className='bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white'
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder='Habit name'
                  />
                  <input
                    className='bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-gray-400'
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    placeholder='Description'
                  />
                  <div className='flex gap-2'>
                    <Button type='submit' className='h-7 text-xs bg-white text-black hover:bg-gray-200'>Save</Button>
                    <Button type='button' variant='outline' className='h-7 text-xs' onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </form>
              )}
              <Popover>
                <PopoverTrigger><EllipsisVertical className='w-5' /></PopoverTrigger>
                <PopoverContent className='w-36 rounded p-1 bg-gray-900 border border-gray-700'>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-800'
                  >
                    Edit Habit
                  </button>
                  <button
                    onClick={handleDeleteHabit}
                    className='w-full text-left px-3 py-2 text-sm rounded text-red-400 hover:bg-gray-800'
                  >
                    Delete Habit
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>

        <CardContent className='flex w-full justify-between px-16'>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold'>{streakCount}</h2>
            <CardDescription>Streak</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold'>{consistencyPercentage}%</h2>
            <CardDescription>Consistency</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold'>{totalCheckIns}</h2>
            <CardDescription>Check-Ins</CardDescription>
          </div>
        </CardContent>

        <CardFooter className='flex p-0 overflow-hidden mt-auto' onClick={stop}>
          {last7Days.map((day, i) => {
            const completed = isCompleted(day);
            const todayDay = isToday(day);
            const scheduled = schedule.includes(day.getDay());

            if (todayDay) {
              return (
                <Popover key={i}>
                  <PopoverTrigger asChild>
                    <div
                      className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-3 cursor-pointer transition-all hover:brightness-110 ${!scheduled ? 'opacity-25' : ''}`}
                      style={completed
                        ? { backgroundColor: hex }
                        : { backgroundColor: `${hex}25`, borderTop: `2px solid ${hex}` }
                      }
                    >
                      <span className='text-[10px] font-medium' style={{ color: completed ? 'rgba(255,255,255,0.7)' : hex }}>{dayLabels[day.getDay()]}</span>
                      <span className='text-sm font-bold text-white'>{day.getDate()}</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='w-40 rounded p-2 bg-gray-900 border border-gray-700'>
                    <form onSubmit={handleSubmit}>
                      <Button
                        type='submit'
                        className={`w-full h-8 text-sm ${completed ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}
                      >
                        {completed ? 'Undo check-in' : 'Mark as done'}
                      </Button>
                    </form>
                  </PopoverContent>
                </Popover>
              );
            }

            return (
              <div
                key={i}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-3 ${!scheduled ? 'opacity-25' : ''}`}
                style={completed ? { backgroundColor: `${hex}60` } : { backgroundColor: 'transparent' }}
              >
                <span className='text-[10px] text-gray-500'>{dayLabels[day.getDay()]}</span>
                <span
                  className='text-sm font-bold'
                  style={{ color: completed ? 'white' : '#4b5563' }}
                >
                  {day.getDate()}
                </span>
              </div>
            );
          })}
        </CardFooter>
        </div>
      </Card>
    </HabitDetailModal>
  );
}
