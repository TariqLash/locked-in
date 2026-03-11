"use client";
import React, { useState } from 'react';
import HabitDetailModal from '@/components/habit/HabitDetailModal';

type NavHabit = {
  habitId: string;
  habitName: string;
  habitDesc: string;
  entries: string;
  color: string;
  schedule: number[];
};

const COLOR_HEX: Record<string, string> = {
  green:  '#22c55e',
  blue:   '#3b82f6',
  purple: '#a855f7',
  orange: '#f97316',
  red:    '#ef4444',
  pink:   '#ec4899',
};

export default function NavHabitDropdown({ habits }: { habits: NavHabit[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className='relative'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className='text-sm cursor-default select-none'>
        {habits.length} {habits.length === 1 ? 'Habit' : 'Habits'}
      </span>

      {open && habits.length > 0 && (
        <div className='absolute top-full left-0 mt-3 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden py-1'>
          {habits.map(habit => {
            const hex = COLOR_HEX[habit.color] ?? COLOR_HEX.green;
            return (
              <HabitDetailModal
                key={habit.habitId}
                habitName={habit.habitName}
                habitDesc={habit.habitDesc}
                entries={habit.entries}
              >
                <div
                  className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 cursor-pointer transition-colors'
                  onClick={() => setOpen(false)}
                >
                  <div
                    className='w-2.5 h-2.5 rounded-full flex-shrink-0'
                    style={{ backgroundColor: hex }}
                  />
                  <span className='text-sm truncate'>{habit.habitName}</span>
                </div>
              </HabitDetailModal>
            );
          })}
        </div>
      )}
    </div>
  );
}
