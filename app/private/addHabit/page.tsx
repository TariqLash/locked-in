// import { register } from '@/action/user'
import { addHabit } from '@/action/habit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getSession } from '@/lib/getSession'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const AddHabit = async () => {

    const session = await getSession();
    const user = session?.user;
    if (!user) redirect("/");

    return (
        <div className='pb-44 pt-20 h-screen flex flex-col items-center justify-center '>
            <h1 className='text-2xl m-4'>Create a new habit: </h1>
            <form action={addHabit} className='flex flex-col w-96 '>
                <Input
                    className=' rounded mb-5 h-12 items-center grayBorder authInput'
                    id='habitName'
                    placeholder='Enter Name of Habit'
                    type='text'
                    name="habitName"
                />
                <Input
                    className=' rounded mb-5 h-12 items-center grayBorder authInput'
                    id='description'
                    placeholder='Enter a Short Description'
                    type='text'
                    name='description'
                    maxLength={50} // Set your desired character limit here
                />                
                <Button variant="outline" className='bg-white text-black rounded mb-3 w-full h-12 items-center'>
                    Add Habit <Plus className='w-4 ml-2'/>
                </Button>
     
            </form>
        </div>
    )
}

export default AddHabit;