
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/private/dashboard");

  return (
    <div className='flex flex-col justify-center items-center h-full'>
       <h1 className='text-xl font-bold mb-3'>Hello, Welcome to Locked-In!</h1>
      <p>Your personal habit tracker designed to help you achieve your goals.</p>
      <p className='mb-3'>Join our community of habit trackers and start your journey today!</p>
      <div>
     
        <Button className='rounded mr-4 h-12 w-18'><Link href="/login">Log In</Link></Button>
        <Button className='bg-white hover:bg-gray-300 text-black rounded-full h-12 w-18'><Link href="/register">Sign Up</Link></Button>
      </div>
   
  </div>

  )
}

export default Home