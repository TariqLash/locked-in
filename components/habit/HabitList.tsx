import { fetchAllHabits } from '@/action/habit';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'
import Habitcard from './Habitcard' // Import the Habitcard component
import { Habit } from '@/models/Habit';
import { User } from '@/models/User';

const HabitList = async() => {

    const session = await getSession();
    const user = session?.user;
    if (!user) redirect("/");

    const userRecord = await User.findOne({ email: user?.email });  // Assuming user?.email exists in the session

    const userHabits = await Habit.find({ createdBy: userRecord?._id }); // Assuming user.id corresponds to the ObjectId of the user
    console.log(userHabits);

  return (
    <div className='bg-black'>
        <h1>{user?.email}'s Habit List</h1>

<div className='  flex flex-col items-center p-4'>
      {/* Map over allHabits and pass data as props to Habitcard */}
      {userHabits?.map((habit:any) => (
              <Habitcard
                  key={habit._id}
                  habitName={habit.habitName} // Pass the habit name\
              />
      ))}
    </div>
    </div>
 
   
  )
}

export default HabitList

// import { fetchAllHabits } from '@/action/habit';
// import { getSession } from '@/lib/getSession';
// import { redirect } from 'next/navigation';
// import React from 'react'

// const HabitList = async() => {

   
//     const session = await getSession();
//     const user = session?.user;
//     if (!user) redirect("/");

//     const allHabits = await fetchAllHabits();

//   return (
//     <div>
//         {allHabits?.map((habit:any) => (
//                 <div key={habit._id}>
//                     <p>{habit.habitName}</p>
//                 </div>
//             ))}
//     </div>
//   )
// }

// export default HabitList