import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Habit } from '@/models/Habit';
import { HabitEntry } from '@/models/HabitEntry';
import { User } from '@/models/User';

// Only allow in development
export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const habitsData = [
    { name: 'Morning Run', desc: 'Run at least 2 miles every morning', completionRate: 0.85 },
    { name: 'Read', desc: 'Read for 30 minutes before bed', completionRate: 0.7 },
    { name: 'Meditate', desc: '10 minutes of mindfulness', completionRate: 0.55 },
  ];

  let totalEntries = 0;

  for (let h = 0; h < habitsData.length; h++) {
    const { name, desc, completionRate } = habitsData[h];

    // Create habit
    const habit = await Habit.create({
      habitName: name,
      description: desc,
      createdBy: user._id,
      order: h,
    });

    await User.updateOne({ _id: user._id }, { $push: { habits: habit._id } });

    // Create entries for the past 120 days
    const entries = [];
    for (let i = 119; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(12, 0, 0, 0);

      // Simulate streaks: more likely to complete if yesterday was completed
      const completed = Math.random() < completionRate;

      entries.push({
        habit: habit._id,
        user: user._id,
        date,
        completed,
      });
    }

    await HabitEntry.insertMany(entries);
    totalEntries += entries.length;
  }

  return NextResponse.json({
    message: `Seeded ${habitsData.length} habits with ${totalEntries} entries for ${email}`,
  });
}
