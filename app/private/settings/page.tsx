import { fetchAllUsers } from '@/action/user';
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/getSession';
import { User } from '@/models/User';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Settings = async() => {

  const session = await getSession();
  const user = session?.user;
  if(!user) redirect("/login");

  // if(user?.role !== 'admin') return redirect("/private/dashboard");

  // const allUsers = await fetchAllUsers();

  return (<div>
      <h1 className='m-8'>&larr; BACK</h1>
      <ul className='flex items-center w-fit h-full ml-8'>
    {!user ? (
      <>
      <Button className='rounded mr-4 h-12 w-18'><Link href="/login">Log In</Link></Button>
      <Button className='bg-white hover:bg-gray-300 text-black rounded-full h-12 w-18'><Link href="/register">Sign Up</Link></Button>
      </>
    ) : (
      <>
        <Button><Link href="/private/dashboard">Dashboard</Link></Button>
        <form action={async () => {
          'use server'
          await signOut(); 
        }}>
          <Button type='submit' variant={"ghost"}>Logout</Button>
        </form>
      </>
    )}


  </ul>
  </div>
  
//     <div className='pt-20'>
// <thead>
//         <tr>
//         <th>First Name</th>
//         <th>Last Name</th>
//         <th>Action</th>
//         </tr>
//     </thead>
//     <tbody>
//         {allUsers?.map((user) => (
//           <tr key={user._id}>
//             <td>{user.firstName}</td>
//             <td>{user.lastName}</td>
//             <td>
//               <form action={async () => {
//                 'use server';
//                 await User.findByIdAndDelete(user._id);
//               }}>
//                 <button>Delete</button>
//               </form>
//           </td>
//           </tr>
//       ))}
//     </tbody>
//     </div>
    
  )
}

export default Settings