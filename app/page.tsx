
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
  <div>
     <Button className='rounded mr-4 h-12 w-18'><Link href="/login">Log In</Link></Button>
     <Button className='bg-white hover:bg-gray-300 text-black rounded-full h-12 w-18'><Link href="/register">Sign Up</Link></Button>
  </div>

  )
}

export default Home