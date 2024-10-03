import { getSession } from '@/lib/getSession';
import React from 'react'

const Home = async() => {
  const session = await getSession();
  const user = session?.user;
  console.log(user);

  return (
    <div className='pt-20'>Home
    
    </div>
  )
}

export default Home