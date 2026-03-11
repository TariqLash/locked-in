import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/auth/Navbar';
import SettingsClient from '@/components/settings/SettingsClient';
import connectDB from '@/lib/db';
import { getSession } from '@/lib/getSession';
import { User } from '@/models/User';
import { redirect } from 'next/navigation';
import React from 'react';

const Settings = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect('/login');

  await connectDB();
  const userRecord = await User.findOne({ email: user.email }).select('+password');

  return (
    <div className='min-h-screen'>
      <Navbar hideSettings backHref="/private/dashboard" />
      <div className='max-w-lg mx-auto px-4 pt-8'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>Settings</h1>
          <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
            <Button type='submit' variant='outline' className='text-sm'>
              Sign out
            </Button>
          </form>
        </div>
      </div>

      <SettingsClient
        firstName={userRecord?.firstName ?? ''}
        lastName={userRecord?.lastName ?? ''}
        email={userRecord?.email ?? ''}
        hasPassword={!!userRecord?.password}
      />
    </div>
  );
};

export default Settings;
