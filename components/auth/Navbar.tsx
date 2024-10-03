import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { getSession } from '@/lib/getSession';
import { signOut } from '@/auth';
import Image from 'next/image';

const Navbar = async () => {

  const session = await getSession();
  const user = session?.user;

  return (
    <nav className='absolute navBorder w-full flex justify-between items-center h-20 px-12 bg-black'>
      <Link href="/">
        <Image
          src="/images/logoDark.png" // Use the path relative to the `public` folder
          alt="My Image"
          width={40}  // Specify width
          height={40} // Specify height
        />
      </Link>
      <ul className='flex items-center w-fit h-full'>
        {!user ? (
          <>
          <Button className='rounded mr-4 h-12 w-18'><Link href="/login">Log In</Link></Button>
          <Button className='bg-white hover:bg-gray-300 text-black rounded-full h-12 w-18'><Link href="/register">Sign Up</Link></Button>
          </>
        ) : (
          <>
            <li><Link href="/private/dashboard">dashboard</Link></li>
            <li><Link href="/private/settings">settings</Link></li>
            <form action={async () => {
              'use server'
              await signOut(); 
            }}>
              <Button type='submit' variant={"ghost"}>Logout</Button>
            </form>
          </>
        )}


      </ul>
    </nav>
  )
}

export default Navbar