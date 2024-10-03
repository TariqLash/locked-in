import { login } from '@/action/user'
import { auth, signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSession } from '@/lib/getSession'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Login = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className='pb-44 pt-20 h-screen flex flex-col items-center justify-center '>
      <h1 className='text-2xl'>Welcome Back! 👋🏾</h1>
      <p className='subtitle mb-5 items-center'>Log in to access your account.</p>
      <form action={login} className='flex flex-col w-96 '>
        <Input
          className=' rounded mb-5 h-12 items-center grayBorder authInput'
          id='email'
          placeholder='Email'
          type='email'
          name="email"
        />

        <Input
          className=' rounded mb-5 h-12 items-center grayBorder authInput '
          id='password'
          placeholder='Enter your password'
          type='password'
          name="password"
        />
        <Button variant="outline" className='bg-white text-black rounded mb-1 h-12'>
          Login &rarr;
        </Button>
        <div className='flex items-center mb-3 mt-3 h-12 items-center'>
          <div className='divider w-full'></div>
          <p className='mx-3 subtitle'>OR</p>
          <div className='divider w-full'></div>
        </div>
      </form>

      <form action={async () => {
        'use server'
        await signIn('github');
      }} className='rounded grayBorder flex justify-center mb-5 h-12 items-center'>
        <Button className='w-96'><IconBrandGithub className='mr-3' /><span>Sign in with Github</span></Button>

      </form>
      <form action={async () => {
        'use server'
        await signIn('google');
      }} className=' grayBorder flex justify-center rounded mb-5 h-12 items-center' >
        <Button className='w-96'><IconBrandGoogle className='mr-3' /><span>Sign in with Google</span></Button>

      </form>
      <p className='subtitle'>Don't have an account? <Link href="/register" className='text-white underline'>Sign up</Link></p>

    </div>
  )
}

export default Login