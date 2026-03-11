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
  const [selected, setSelected] = useState<NavHabit | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (habit: NavHabit) => {
    setOpen(false);
    setSelected(habit);
    setModalOpen(true);
  };

  return (
    <>
      <div
        className='relative'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <span className='text-sm cursor-default select-none'>
          {habits.length} {habits.length === 1 ? 'Habit' : 'Habits'}
        </span>

        {open && habits.length > 0 && (
          <div className='absolute top-full left-0 w-56 pt-2 z-50'>
            <div className='bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden py-1'>
              {habits.map(habit => {
                const hex = COLOR_HEX[habit.color] ?? COLOR_HEX.green;
                return (
                  <div
                    key={habit.habitId}
                    className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800 cursor-pointer transition-colors'
                    onClick={() => handleSelect(habit)}
                  >
                    <div
                      className='w-2.5 h-2.5 rounded-full flex-shrink-0'
                      style={{ backgroundColor: hex }}
                    />
                    <span className='text-sm truncate'>{habit.habitName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <HabitDetailModal
          habitName={selected.habitName}
          habitDesc={selected.habitDesc}
          entries={selected.entries}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </>
  );
}
