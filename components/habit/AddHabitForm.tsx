"use client";
import { addHabit } from '@/action/habit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const COLORS = [
  { id: 'green',  bg: 'bg-green-500',  label: 'Green' },
  { id: 'blue',   bg: 'bg-blue-500',   label: 'Blue' },
  { id: 'purple', bg: 'bg-purple-500', label: 'Purple' },
  { id: 'orange', bg: 'bg-orange-500', label: 'Orange' },
  { id: 'red',    bg: 'bg-red-500',    label: 'Red' },
  { id: 'pink',   bg: 'bg-pink-500',   label: 'Pink' },
];

export default function AddHabitForm() {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('green');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) { setError('Please enter a habit name'); return; }
    setLoading(true);
    setError('');
    await addHabit(habitName.trim(), description.trim(), [0,1,2,3,4,5,6], color);
  };

  return (
    <div className='max-w-lg mx-auto px-4 pt-8 pb-20'>
      <h1 className='text-2xl font-bold mb-6'>New Habit</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

        {/* Name & Description */}
        <section className='bg-gray-950 border border-gray-800 rounded-xl p-6 flex flex-col gap-3'>
          <h2 className='text-sm font-semibold text-gray-400 mb-1'>Details</h2>
          <div className='flex flex-col gap-1'>
            <label className='text-xs text-gray-400'>Name</label>
            <Input
              className='bg-gray-900 border-gray-700 rounded-lg h-11 authInput'
              placeholder='e.g. Morning Run'
              value={habitName}
              onChange={e => setHabitName(e.target.value)}
              maxLength={40}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-xs text-gray-400'>Description <span className='text-gray-600'>(optional)</span></label>
            <Input
              className='bg-gray-900 border-gray-700 rounded-lg h-11 authInput'
              placeholder='e.g. Run at least 2 miles'
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={50}
            />
          </div>
        </section>

        {/* Color */}
        <section className='bg-gray-950 border border-gray-800 rounded-xl p-6'>
          <h2 className='text-sm font-semibold text-gray-400 mb-1'>Color</h2>
          <p className='text-xs text-gray-600 mb-4'>Accent color for this habit card</p>
          <div className='flex gap-3'>
            {COLORS.map(c => (
              <button
                key={c.id}
                type='button'
                onClick={() => setColor(c.id)}
                className={`w-8 h-8 rounded-full ${c.bg} transition-all ${
                  color === c.id
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                    : 'opacity-50 hover:opacity-80'
                }`}
                title={c.label}
              />
            ))}
          </div>
        </section>

        {error && <p className='text-red-400 text-sm'>{error}</p>}

        <Button
          type='submit'
          disabled={loading}
          className='bg-white text-black hover:bg-gray-200 rounded-xl h-12 text-sm font-medium'
        >
          {loading ? 'Creating...' : 'Create Habit'}
        </Button>

      </form>
    </div>
  );
}
