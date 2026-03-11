"use client"
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Heatmap from './Heatmap'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getEarnedBadges, getNextBadge, BADGES } from '@/lib/badges'

type Entry = { date: string; completed: boolean };

type Props = {
  habitName: string;
  habitDesc: string;
  entries: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function HabitDetailModal({ habitName, habitDesc, entries, children, open, onOpenChange }: Props) {
  let parsedEntries: Entry[] = [];
  try {
    parsedEntries = JSON.parse(entries);
  } catch {}

  const completedEntries = parsedEntries.filter(e => e.completed);
  const totalCheckIns = completedEntries.length;
  const consistencyPercentage = parsedEntries.length > 0
    ? Math.round((totalCheckIns / parsedEntries.length) * 100)
    : 0;

  const calculateStreak = (entries: Entry[]) => {
    if (!entries.length) return 0;
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

  const calculateBestStreak = (entries: Entry[]) => {
    if (!entries.length) return 0;
    const sorted = [...entries]
      .filter(e => e.completed)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let best = 0, current = 0;
    let prevDate: Date | null = null;
    for (const entry of sorted) {
      const d = new Date(entry.date);
      if (prevDate) {
        const diff = Math.round((d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        current = diff === 1 ? current + 1 : 1;
        best = Math.max(best, current);
      } else {
        current = 1;
      }
      prevDate = d;
    }
    return Math.max(best, current);
  };

  const streakCount = calculateStreak(parsedEntries);
  const bestStreak = calculateBestStreak(parsedEntries);
  const today = new Date();

  // 30-day line chart data (daily completion % using 7-day rolling avg)
  const lineData = Array.from({ length: 30 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (29 - i));
    let count = 0;
    for (let j = 0; j < 7; j++) {
      const d = new Date(day);
      d.setDate(day.getDate() - j);
      if (parsedEntries.some(e => e.completed && new Date(e.date).toDateString() === d.toDateString())) count++;
    }
    return {
      date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round((count / 7) * 100),
    };
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h2 className='text-4xl font-bold mb-1'>{habitName}</h2>
          <p className='text-gray-400'>{habitDesc}</p>
        </div>

        {/* Stats grid */}
        <div className='grid grid-cols-4 gap-3 mb-6'>
          <div className='bg-gray-900 rounded-lg p-4 flex flex-col items-center'>
            <span className='text-4xl font-bold'>{streakCount}</span>
            <span className='text-xs text-gray-400 mt-1'>Current Streak</span>
          </div>
          <div className='bg-gray-900 rounded-lg p-4 flex flex-col items-center'>
            <span className='text-4xl font-bold'>{bestStreak}</span>
            <span className='text-xs text-gray-400 mt-1'>Best Streak</span>
          </div>
          <div className='bg-gray-900 rounded-lg p-4 flex flex-col items-center'>
            <span className='text-4xl font-bold'>{consistencyPercentage}%</span>
            <span className='text-xs text-gray-400 mt-1'>Consistency</span>
          </div>
          <div className='bg-gray-900 rounded-lg p-4 flex flex-col items-center'>
            <span className='text-4xl font-bold'>{totalCheckIns}</span>
            <span className='text-xs text-gray-400 mt-1'>Total Check-Ins</span>
          </div>
        </div>

        {/* Badges */}
        <div className='mb-6'>
          <h3 className='text-sm text-gray-400 mb-3'>Badges</h3>
          <div className='grid grid-cols-7 gap-2'>
            {BADGES.map(badge => {
              const earned = bestStreak >= badge.days;
              return (
                <div
                  key={badge.days}
                  title={earned ? `Earned! ${badge.label} — ${badge.days} day streak` : `${badge.days} day streak required`}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-opacity ${earned ? badge.color : 'border-gray-800 bg-gray-900 opacity-30'}`}
                >
                  <span className='text-2xl'>{badge.icon}</span>
                  <span className='text-[10px] font-medium text-center leading-tight'>{badge.label}</span>
                  <span className='text-[9px] text-gray-500'>{badge.days}d</span>
                </div>
              );
            })}
          </div>
          {getNextBadge(bestStreak) && (
            <p className='text-xs text-gray-600 mt-2'>
              {getNextBadge(bestStreak)!.days - bestStreak} more days to unlock {getNextBadge(bestStreak)!.icon} {getNextBadge(bestStreak)!.label}
            </p>
          )}
        </div>

        {/* 30-day line graph */}
        <div className='mb-6'>
          <h3 className='text-sm text-gray-400 mb-3'>30-Day Trend (7-day rolling avg)</h3>
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#1f2937' />
              <XAxis
                dataKey='date'
                tick={{ fill: '#6b7280', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={6}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${v}%`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#9ca3af' }}
                formatter={(v: number) => [`${v}%`, '7-day avg']}
              />
              <Line
                type='monotone'
                dataKey='value'
                stroke='#22c55e'
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Full heatmap */}
        <div>
          <h3 className='text-sm text-gray-400 mb-2'>Full History</h3>
          <Heatmap entries={entries} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
