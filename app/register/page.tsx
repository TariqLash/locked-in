import { register } from '@/action/user'
import { Input } from '@/components/ui/input'
import { getSession } from '@/lib/getSession'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Register = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4'>
      <div className='flex flex-col items-center text-center max-w-sm w-full'>
        <Link href="/" className='text-4xl font-bold tracking-tight mb-1'>Locked In</Link>
        <p className='text-gray-500 text-sm mb-10'>Create your account to get started.</p>

        <form action={register} className='flex flex-col gap-3 w-full'>
          <div className='flex gap-3'>
            <Input
              id='firstname' name='firstname' type='text' placeholder='First name'
              className='h-11 rounded-xl bg-gray-900 border-gray-800 text-sm authInput'
            />
            <Input
              id='lastname' name='lastname' type='text' placeholder='Last name'
              className='h-11 rounded-xl bg-gray-900 border-gray-800 text-sm authInput'
            />
          </div>
          <Input
            id='email' name='email' type='email' placeholder='Email'
            className='h-11 rounded-xl bg-gray-900 border-gray-800 text-sm authInput'
          />
          <Input
            id='password' name='password' type='password' placeholder='Password'
            className='h-11 rounded-xl bg-gray-900 border-gray-800 text-sm authInput'
          />
          <button
            type='submit'
            className='w-full h-11 rounded-xl bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors mt-1'
          >
            Create account
          </button>
        </form>

        <p className='text-gray-600 text-sm mt-6'>
          Already have an account?{' '}
          <Link href="/login" className='text-gray-300 hover:text-white transition-colors'>Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
