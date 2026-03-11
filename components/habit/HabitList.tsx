import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'
import { Habit } from '@/models/Habit';
import { User } from '@/models/User';
import { HabitEntry } from '@/models/HabitEntry';
import SortableHabitList from './SortableHabitList';

const HabitList = async() => {

    const session = await getSession();
    const user = session?.user;
    if (!user) redirect("/");

    const userRecord = await User.findOne({ email: user?.email });
    const userHabits = await Habit.find({ createdBy: userRecord?._id }).sort({ order: 1 });

    const habitsWithEntries = await Promise.all(
        userHabits.map(async (habit) => {
            const userId = userRecord?._id.toString();
            const habitId = habit._id.toString();
            const userHabitEntries = await HabitEntry.find({ user: userId, habit: habitId });
            return {
                habitId,
                habitName: habit.habitName,
                habitDesc: habit.description,
                entries: JSON.stringify(userHabitEntries),
                schedule: habit.schedule ?? [0,1,2,3,4,5,6],
                color: habit.color ?? 'green',
            };
        })
    );

    if (habitsWithEntries.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center mt-24 text-center'>
                <p className='text-gray-400 text-lg mb-2'>No habits yet</p>
                <p className='text-gray-600 text-sm'>Click the + button to add your first habit</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            <SortableHabitList habits={habitsWithEntries} />
        </div>
    );
}

export default HabitList
