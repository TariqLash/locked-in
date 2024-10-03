import { register } from '@/action/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSession } from '@/lib/getSession'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Register = async() => {

  const session = await getSession();
  const user = session?.user;
  if(user) redirect("/");

  return (
    <div className='pb-44 pt-20 h-screen flex flex-col items-center justify-center '>
        <h1 className='text-2xl'>Create your account</h1>
        <p className='subtitle mb-5'>Join us by filling in the details below to get started!</p>

        <form action={register} className='w-96'>
            <div className='flex'>

                <Input id='firstname' placeholder='First Name' type='text' name='firstname'
                className=' rounded mb-5 h-12 mr-3 grayBorder authInput'/>
                <Input id='lastname' placeholder='Last Name' type='text' name='lastname'
                className=' rounded mb-5 h-12 grayBorder authInput'/>
            </div>
            <Input id='email' placeholder='Email' type='email' name='email'
            className=' rounded mb-5 h-12 grayBorder authInput'/>
            <Input id='password' placeholder='Enter your password' type='password' name='password'
            className=' rounded mb-5 h-12 grayBorder authInput'/>
        <Button variant="outline" className='bg-white text-black rounded mb-3 w-full h-12'>
        Sign Up &rarr;
              </Button>
            <p className='subtitle text-center'>Already have an account? <Link href="/login" className='text-white underline'>Login</Link></p>
        </form>
    </div>
  )
}

export default Register