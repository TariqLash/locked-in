"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EllipsisVertical } from 'lucide-react'
import Heatmap from './Heatmap'
import { Checkbox } from "@/components/ui/checkbox"
import { addHabitEntry } from '@/action/habitEntry'
import { Button } from '../ui/button'

// Accept habit data as props
export default function HabitCard({ habitId,habitName,entries }) {

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    // Call addHabitEntry function, passing the habitId and other data
    await addHabitEntry({
      habitId, // Send the habitId
      completed: true, // Example: mark as completed (you can modify this if needed)
      created_at: new Date().toISOString(), // Example: current date and time
    });

    console.log('Habit entry added for habitId:', habitId);
  };

  return (
    <>
      <Card className='w-full flex flex-col justify-evenly rounded-xl grayBorder mb-4 habitCard bg-gray-950'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div className='flex items-center w-fit'>
              <button><EllipsisVertical className='mr-4 w-5' /></button>
              {/* Use habitName from props */}
              <CardTitle className='text-3xl flex items-center'>{habitName}{habitId}</CardTitle>
            </div>
            <form onSubmit={handleSubmit}>
              <Button type="submit" variant="outline" className='bg-white text-black rounded mb-3 w-full h-12'>
                Add Entry &rarr;
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent className='flex w-full justify-around'>
          <div className='flex flex-col items-center'>
            {/* Use streak from props */}
            <h2 className='text-5xl font-bold'>0</h2>
            <CardDescription>Streak</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            {/* Use consistency from props */}
            <h2 className='text-5xl font-bold'>0%</h2>
            <CardDescription>Consistency</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            {/* Use checkIns from props */}
            <h2 className='text-5xl font-bold'>0</h2>
            <CardDescription>Check-Ins</CardDescription>
          </div>
          
        </CardContent>
        
        <CardFooter>



        <Heatmap habitId={habitId} entries={entries}/>  
        </CardFooter>
      </Card>
    </>
  )
}

// import React from 'react'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { EllipsisVertical } from 'lucide-react'
// import Heatmap from './Heatmap'
// import { Checkbox } from "@/components/ui/checkbox"

// export default function page() {

//   return (
//     <>
//       <Card className='w-96 h-fit flex flex-col justify-evenly rounded-xl grayBorder m-5'>
//         <CardHeader>
//           <div className='flex justify-between items-center'>
//           <div className='flex items-center w-fit'>
//             <button><EllipsisVertical className='mr-3 w-5' /></button>
//             <CardTitle className='text-3xl flex items-center'>Gym 🏋🏾</CardTitle>
//           </div>
//           <Checkbox className='w-6 h-6 ml-14 rounded' />
//           </div>
          
//         </CardHeader>
//         <CardContent className='flex w-full justify-around'>
//           <div className='flex flex-col items-center'>
//             <h2 className='text-5xl font-bold'>13</h2>
//             <CardDescription>Streak</CardDescription>
//           </div>
//           <div className='flex flex-col items-center'>
//             <h2 className='text-5xl font-bold'>78</h2>
//             <CardDescription>Consistency</CardDescription>
//           </div>
//           <div className='flex flex-col items-center'>
//             <h2 className='text-5xl font-bold'>300</h2>
//             <CardDescription>Check-Ins</CardDescription>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Heatmap />

//         </CardFooter>
//       </Card>

//     </>
//   )
// }
