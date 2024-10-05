// import { register } from '@/action/user'
import { addHabit } from '@/action/habit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import connectDB from '@/lib/db'
import { getSession } from '@/lib/getSession'
import { User } from '@/models/User'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const AddHabit = async () => {

    const session = await getSession();
    const user = session?.user;
    if (!user) redirect("/");


    await connectDB();
    const getUser = await User.find({ email: user.email });
    const currUser = getUser[0].firstName + " " + getUser[0].lastName;

    return (
        <div className='pb-44 pt-20 h-screen flex flex-col items-center justify-center '>
            <h1 className='text-2xl'>Hello {currUser}</h1>
            <form action={addHabit}>
                <Input id='habitName' placeholder='Enter Habit' type='text' name='habitName' />
                <Input id='description' placeholder='Enter Description' type='text' name='description' />
                <Button variant="outline" className='bg-white text-black rounded mb-3 w-full h-12'>
                    Sign Up &rarr;
                </Button>
     
            </form>
        </div>
    )
}

export default AddHabit;