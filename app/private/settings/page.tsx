import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Settings = async() => {

  const session = await getSession();
  const user = session?.user;
  if(!user) redirect("/login");

  // if(user?.role !== 'admin') return redirect("/private/dashboard");

  // const allUsers = await fetchAllUsers();

  return (
  <div className='h-screen'>
    <Button><Link href="/private/dashboard">&larr; Dashboard</Link></Button>
    <ul className='flex justify-center items-center w-full h-96'>
    <form action={async () => {
          'use server'
          await signOut(); 
        }}>
          <Button type='submit' variant={"outline"}>Logout</Button>
        </form>
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