import Navbar from '@/components/auth/Navbar';
import AddHabitForm from '@/components/habit/AddHabitForm';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react';

const AddHabit = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect('/');

  return (
    <div className='min-h-screen'>
      <Navbar backHrefRight="/private/dashboard" />
      <AddHabitForm />
    </div>
  );
};

export default AddHabit;
