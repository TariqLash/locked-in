import { login } from '@/action/user'
import { signIn } from '@/auth'
import { Input } from '@/components/ui/input'
import { getSession } from '@/lib/getSession'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Login = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4'>
      <div className='flex flex-col items-center text-center max-w-sm w-full'>
        <Link href="/" className='text-4xl font-bold tracking-tight mb-1'>Locked In</Link>
        <p className='text-gray-500 text-sm mb-10'>Welcome back. Log in to your account.</p>

        {/* @ts-expect-error avoid error */}
        <form method='POST' action={login} className='flex flex-col gap-3 w-full'>
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
            Log in
          </button>
        </form>

        <div className='flex items-center gap-3 w-full my-5'>
          <div className='flex-1 h-px bg-gray-800' />
          <span className='text-gray-600 text-xs'>or</span>
          <div className='flex-1 h-px bg-gray-800' />
        </div>

        <form action={async () => {
          'use server'
          await signIn('google', { redirectTo: '/private/dashboard' });
        }} className='w-full'>
          <button
            type='submit'
            className='w-full h-11 rounded-xl border border-gray-800 text-sm text-gray-300 hover:bg-gray-900 transition-colors'
          >
            Continue with Google
          </button>
        </form>

        <p className='text-gray-600 text-sm mt-6'>
          Don&apos;t have an account?{' '}
          <Link href="/register" className='text-gray-300 hover:text-white transition-colors'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
