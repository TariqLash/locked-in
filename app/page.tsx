
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/private/dashboard");

  return (
  <div>HOME</div>

  )
}

export default Home