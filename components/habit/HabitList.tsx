import { fetchAllHabits } from '@/action/habit';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'
import Habitcard from './Habitcard' // Import the Habitcard component

const HabitList = async() => {

    const session = await getSession();
    const user = session?.user;
    if (!user) redirect("/");

    const allHabits = await fetchAllHabits();

  return (
    <div className='flex flex-wrap w-full justify-center'>
      {/* Map over allHabits and pass data as props to Habitcard */}
      {allHabits?.map((habit:any) => (
          <div className=''>
              <Habitcard
                  key={habit._id}
                  habitName={habit.habitName} // Pass the habit name
              />
          </div>
       
      ))}
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