import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'
import { Habit } from '@/models/Habit';
import { User } from '@/models/User';
import { HabitEntry } from '@/models/HabitEntry';
import HabitCard from './HabitCard';

const HabitList = async() => {

    const session = await getSession();
    const user = session?.user;
    if (!user) redirect("/");

    const userRecord = await User.findOne({ email: user?.email });  // Assuming user?.email exists in the session
    const userHabits = await Habit.find({ createdBy: userRecord?._id }); // Assuming user.id corresponds to the ObjectId of the user
    
    // const userHabitEntries = await HabitEntry.find({ user: userRecord?._id});
    // const userHabitEntries = await HabitEntry.find({ user: userRecord?._id, habitId: userHabits._id }); // Fetch entries for the current habit
    // console.log("entries",userHabitEntries)

  return (
    <div className='flex flex-col '>
        <h1 className='mx-auto text-4xl mt-4'>{userRecord?.firstName}&apos;s Habits:</h1>

        <div className='p-2 flex flex-wrap justify-center'>
                {/* Map over all habits and pass data as props to HabitCard */}
                {userHabits?.map(async(habit) => {
                    // Filter entries for the current habit
                    const userId = userRecord?._id.toString();
                    const habitId = habit._id.toString();
                    const userHabitEntries = await HabitEntry.find({ user: userId, habit: habitId}); // Fetch entries for the current habit
                    // console.log("entries",userHabitEntries)

                    return (
                        <HabitCard
                            key={habitId}
                            habitName={habit.habitName} // Pass the habit name
                            habitDesc={habit.description}
                            habitId={habitId}
                            entries={JSON.stringify(userHabitEntries)} // Pass the filtered entries for the current habit
                        />
                    );
                })}
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