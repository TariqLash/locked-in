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
    <nav className='sticky bottom-0 footBorder w-full flex justify-around items-center h-16 px-4 bg-gray-950 '>
    <Button className='flex flex-col w-1/3 text-center text-gray-400 text-xs'>
        <h1>icon</h1>
        <Link className='' href="">Habits</Link>
    </Button>      
    <Button className='flex flex-col w-1/3 text-center border-x-2 border-gray-900 text-gray-400 text-xs'>
        <h1>icon</h1>
        <Link className='' href="">Friends</Link>
    </Button>     
    <Button className='flex flex-col w-1/3 text-center text-gray-400 text-xs'>
        <h1>icon</h1>
        <Link className='' href="">Leaderboard</Link>
    </Button>     
    </nav>
  )
}

export default Navbar