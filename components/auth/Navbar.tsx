import Link from 'next/link'
import React from 'react'
import { getSession } from '@/lib/getSession';
import { Plus, Settings, ArrowLeft, ArrowRight } from 'lucide-react';
import { User } from '@/models/User';
import { Habit } from '@/models/Habit';
import { HabitEntry } from '@/models/HabitEntry';
import connectDB from '@/lib/db';
import NavHabitDropdown from './NavHabitDropdown';

const Navbar = async ({ hideSettings, backHref, backHrefRight }: { hideSettings?: boolean; backHref?: string; backHrefRight?: string } = {}) => {

  const session = await getSession();
  const user = session?.user;

  await connectDB();
  const userRecord = user ? await User.findOne({ email: user.email }) : null;
  const userHabits = userRecord ? await Habit.find({ createdBy: userRecord._id }).sort({ order: 1 }) : [];

  const habitsWithEntries = await Promise.all(
    userHabits.map(async (habit) => {
      const habitId = habit._id.toString();
      const entries = await HabitEntry.find({ user: userRecord!._id.toString(), habit: habitId });
      return {
        habitId,
        habitName: habit.habitName,
        habitDesc: habit.description,
        entries: JSON.stringify(entries),
        color: habit.color ?? 'green',
        schedule: habit.schedule ?? [0,1,2,3,4,5,6],
      };
    })
  );

  return (
    <nav className='sticky top-0 navBorder w-full flex justify-between items-center h-14 px-8 bg-[#020408]'>
      <div className='flex items-center gap-3 w-32'>
        {backHref ? (
          <Link href={backHref} className='text-gray-400 hover:text-white transition-colors'>
            <ArrowLeft className='w-5 h-5' />
          </Link>
        ) : !backHrefRight ? (
          <>
            <Link href="/private/addHabit"><Plus /></Link>
            <NavHabitDropdown habits={habitsWithEntries} />
          </>
        ) : null}
      </div>

      <Link href="/private/dashboard" className='absolute left-1/2 -translate-x-1/2 font-bold text-lg tracking-tight'>
        Locked In
      </Link>

      <div className='w-32 flex justify-end'>
        {backHrefRight ? (
          <Link href={backHrefRight} className='text-gray-400 hover:text-white transition-colors'>
            <ArrowRight className='w-5 h-5' />
          </Link>
        ) : !hideSettings && (
          <Link href="/private/settings">
            <Settings />
          </Link>
        )}
      </div>
      {/* <Link href="/">
        <Image
          src="/images/logoDark.png" // Use the path relative to the `public` folder
          alt="My Image"
          width={40}  // Specify width
          height={40} // Specify height
        />
      </Link> */}
      
    </nav>
  )
}

export default Navbar