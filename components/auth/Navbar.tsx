import Link from 'next/link'
import React from 'react'
import { getSession } from '@/lib/getSession';
import { Plus, Settings } from 'lucide-react';
import { fetchAllUserHabits } from '@/action/habit';

const Navbar = async () => {

  const session = await getSession();
  const user = session?.user;
  const userHabits = await fetchAllUserHabits(user);
  const numHabits = userHabits.length;

  return (
    <nav className='sticky top-0 navBorder w-full flex justify-between items-center h-14 px-8 bg-gray-950 '>
      <div className='flex w-32'>
      <Link href="/private/addHabit" className='w-1/3'>
      <Plus />
      </Link>
      <h1>
        {numHabits} {numHabits === 1 ? 'Habit' : 'Habits'}
      </h1>
      </div>
      
      <Link href="/private/settings" className='w-1/3 flex justify-end'>
      <Settings />
      </Link>
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