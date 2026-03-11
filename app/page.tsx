import { getSession } from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/private/dashboard");

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4'>
      <div className='flex flex-col items-center text-center max-w-sm w-full'>
        <h1 className='text-4xl font-bold tracking-tight mb-3'>Locked In</h1>
        <p className='text-gray-500 text-sm mb-10'>Build habits. Stay consistent. See your progress.</p>

        <div className='flex flex-col gap-3 w-full'>
          <Link
            href="/register"
            className='w-full h-11 rounded-xl bg-white text-black text-sm font-medium flex items-center justify-center hover:bg-gray-200 transition-colors'
          >
            Get started
          </Link>
          <Link
            href="/login"
            className='w-full h-11 rounded-xl border border-gray-800 text-sm text-gray-300 flex items-center justify-center hover:bg-gray-900 transition-colors'
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home
