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
import { completeHabit } from '@/action/habitEntry'
import { Button } from '../ui/button'
import { deleteHabit } from '@/action/habit'

// Accept habit data as props
export default function HabitCard({ habitId, habitName, habitDesc, entries }) {

  let parsedEntries = [];
  try {
    parsedEntries = JSON.parse(entries);
  } catch (error) {
    console.error("Error parsing entries:", error);
  }

  // Find the latest entry
  const latestEntry = parsedEntries.length > 0 
    ? parsedEntries.reduce((latest, entry) => {
        return new Date(entry.date) > new Date(latest.date) ? entry : latest;
      }, parsedEntries[0])
    : null;

  // Check if the latest entry is completed
  const latestCompleted = latestEntry && latestEntry.completed;

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Call completeHabit function
    await completeHabit({
      habitId, // Send the habitId
      completed: true, // Mark as completed
      created_at: new Date().toISOString(), // Current date and time
    });

    // Reload the page after completion
    window.location.reload(); // Reload the page
  };

  const calculateStreak = (entries) => {
    let streak = 0;
  
    if (!entries || entries.length === 0) {
      return streak;
    }
  
    // Sort entries by date (most recent first)
    const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
  
    // Start from the most recent entry and count consecutive completed days
    let currentDate = new Date(sortedEntries[0].date); // Start from the latest date
  
    for (let entry of sortedEntries) {
      const entryDate = new Date(entry.date);
  
      // If the entry is completed and matches the expected date, increase the streak
      if (entry.completed && entryDate.toDateString() === currentDate.toDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
      } else if (entryDate.toDateString() !== currentDate.toDateString()) {
        break; // Stop counting if the streak is broken
      }
    }
  
    return streak;
  };
  

  const streakCount = calculateStreak(parsedEntries);

  const calculateConsistency = () => {
    // Count total and completed entries
    const totalEntries = parsedEntries.length;
    const completedEntries = parsedEntries.filter(entry => entry.completed).length;

    // Calculate percentage
    return totalEntries > 0 ? ((completedEntries / totalEntries) * 100) : 0;
  };

  // Calculate consistency percentage
  const consistencyPercentage = Math.round(calculateConsistency());

  const totalCheckIns = parsedEntries.filter(entry => entry.completed === true).length;

  const handleDeleteHabit = async () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await deleteHabit(habitId); // Call the delete function
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
                {latestCompleted ? <SquareCheckBig /> : <Square />}
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent className='flex w-full justify-between px-16'>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold'>{streakCount}</h2>
            <CardDescription>Streak</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold'>{consistencyPercentage}%</h2>
            <CardDescription>Consistency</CardDescription>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='text-5xl font-bold'>{totalCheckIns}</h2>
            <CardDescription>Check-Ins</CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <Heatmap entries={entries}/>  
        </CardFooter>
      </Card>
    </>
  );
}
