import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { getSession } from '@/lib/getSession';
import { signOut } from '@/auth';
import Image from 'next/image';
import { Contact, SquareCheckBig, Trophy } from 'lucide-react';

const Navbar = async () => {

    const session = await getSession();
    const user = session?.user;

    return (
        <nav className='sticky bottom-0 footBorder w-full flex justify-around items-center h-16 px-4 bg-gray-950 '>
            <div className='flex flex-col justify-center w-1/3 pb-2 '>
            <Button className=''>
                <SquareCheckBig className='text-xl b'/>
            </Button>
            <caption className='text-xs'>Habits</caption>
            </div>
            <div className='flex flex-col justify-center w-1/3 pb-2 border-x-2 border-gray-900'>
            <Button className=''>
                <Contact className='text-xl b'/>
            </Button>
            <caption className='text-xs'>Friends</caption>
            </div>
            <div className='flex flex-col justify-center w-1/3 pb-2 '>
            <Button className=''>
                <Trophy className='text-xl b'/>
            </Button>
            <caption className='text-xs'>Leaderboard</caption>
            </div>

        </nav>
    )
}

export default Navbar