import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { getSession } from '@/lib/getSession';
import { signOut } from '@/auth';
import Image from 'next/image';
import { Plus, Settings } from 'lucide-react';

const Navbar = async () => {

  const session = await getSession();
  const user = session?.user;

  return (
    <nav className='sticky top-0 navBorder w-full flex justify-between items-center h-14 px-4 bg-gray-950 '>
      
      <Link href="/private/addHabit" className='w-1/3'>
      <Plus />
      </Link>
      <h1 className='w-1/3 text-center'>3 HABITS</h1>
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