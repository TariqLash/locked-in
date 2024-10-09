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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { EllipsisVertical, Square, SquareCheckBig } from 'lucide-react'
import Heatmap from './Heatmap'
import { Checkbox } from "@/components/ui/checkbox"
import { addHabitEntry } from '@/action/habitEntry'
import { Button } from '../ui/button'
import { deleteHabit } from '@/action/habit'

// Accept habit data as props
export default function HabitCard({ habitId,habitName, habitDesc,entries }) {

  let todayCompleted = false;
  let parsedEntries = [];
  try {
    parsedEntries = JSON.parse(entries);
  } catch (error) {
    console.error("Error parsing entries:", error);
  }


  const handleSubmit = async (event) => {
    // event.preventDefault(); // Prevent page reload

    // Call addHabitEntry function, passing the habitId and other data
    await addHabitEntry({
      habitId, // Send the habitId
      completed: true, // Example: mark as completed (you can modify this if needed)
      created_at: new Date().toISOString(), // Example: current date and time
    });

    console.log('Habit entry added for habitId:', habitId);
  };



  const calculateStreak = (entries) => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    // Check if today's entry is completed
    const todayEntry = entries.find(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === today.toDateString() && entry.completed;
    });

    // If today is not completed, streak is zero
    if (!todayEntry) {
      return streak;
    } else {
      todayCompleted=true;
    }

    // Count consecutive completed days
    let currentDate = today;

    while (true) {
      const dateString = currentDate.toISOString().split('T')[0]; // Get date as YYYY-MM-DD
      const completedEntry = entries.find(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toISOString().split('T')[0] === dateString && entry.completed;
      });

      if (completedEntry) {
        streak++;
      } else {
        break; // Stop if we find a day that is not completed
      }

      // Move to the previous day
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const streakCount = calculateStreak(JSON.parse(entries));
  console.log("streak",streakCount)


  const calculateConsistency = (entries) => {
    // Safely parse entries, ensuring it's an array
    

    // Count total and completed entries
    const totalEntries = parsedEntries.length;
    const completedEntries = parsedEntries.filter(entry => entry.completed).length;

    // Calculate percentage
    return totalEntries > 0 ? ((completedEntries / totalEntries) * 100) : 0;
  };

  // Calculate consistency percentage
  const consistencyPercentage = Math.round(calculateConsistency(entries));
  console.log("consistency", consistencyPercentage)

  const totalCheckIns = parsedEntries.filter(entry => entry.completed === true).length;
  console.log("total: ", totalCheckIns)

  console.log("TODAY: ",todayCompleted)


  const handleDeleteHabit = async () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await deleteHabit(habitId); // Call the delete function
        console.log('Habit deleted successfully');
        // Optionally, you can update the UI or refetch data here
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  return (
    <>
      <Card className=' flex flex-col justify-evenly rounded-xl grayBorder m-2 habitCard bg-gray-950'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div className='flex items-center w-fit'>

              <Popover>
                <PopoverTrigger><EllipsisVertical className='mr-4 w-5' /></PopoverTrigger>
                <PopoverContent className='bg-red-500 opacity-95 w-32 rounded ml-20'><button onClick={handleDeleteHabit}>Delete Habit</button></PopoverContent>
              </Popover>
              {/* Use habitName from props */}
              <div className='flex flex-col'>
              <CardTitle className='text-3xl flex items-center'>{habitName}</CardTitle>
              <p className='text-gray-400 text-sm'>{habitDesc}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <Button type="submit">
                {todayCompleted ? <SquareCheckBig /> : <Square />}
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent className='flex w-full justify-between px-16'>
          <div className='flex flex-col items-center'>
            {/* Use streak from props */}
            <h2 className='text-5xl font-bold'>{streakCount}</h2>
            <CardDescription>Streak</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            {/* Use consistency from props */}
            <h2 className='text-5xl font-bold'>{consistencyPercentage}%</h2>
            <CardDescription>Consistency</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            {/* Use checkIns from props */}
            <h2 className='text-5xl font-bold'>{totalCheckIns}</h2>
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