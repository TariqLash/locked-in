import cron from 'node-cron';
import { getSession } from "@/lib/getSession";
import { HabitEntry } from "@/models/HabitEntry";
import { User } from "@/models/User";
import { Habit } from "@/models/Habit";

// Schedule a cron job to run once a day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
    console.log("Running habit entry creation cron job at", new Date().toISOString());
    await createHabitEntries();
});

const createHabitEntries = async () => {
    try {
        const session = await getSession();
        const user = session?.user;

        if (!user) {
            console.error("No user session found.");
            return;
        }

        // Find the user by email
        const userRecord = await User.findOne({ email: user?.email });
        if (!userRecord) {
            console.error("User not found");
            return;
        }

        console.log("User found:", userRecord._id.valueOf());

        // Find all habits for the user
        const habits = await Habit.find({ createdBy: userRecord._id }); // Adjust if habits are stored differently
        if (!habits.length) {
            console.log("No habits found for the user.");
            return;
        }

        console.log(`User has ${habits.length} habit(s).`);

        // Create a new habit entry for each habit
        for (const habit of habits) {
            await HabitEntry.create({
                habit: habit._id,
                user: userRecord._id,
                completed: false,
            });

            console.log(`New habit entry created for ${habit.name}`);
        }

        console.log("Completed habit entries creation.");
    } catch (error) {
        console.error("Error creating habit entries:", error);
    }
};
