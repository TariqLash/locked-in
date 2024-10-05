import { fetchAllHabits } from '@/action/habit';
import Habitcard from '@/components/habit/Habitcard';
import HabitList from '@/components/habit/HabitList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getSession } from '@/lib/getSession';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {

    const session = await getSession();
    const user = session?.user;
    if (!user) redirect("/");

    const allHabits = await fetchAllHabits();

    return (

        <div className='pt-24 px-4 flex justify-center flex-wrap'>
            <Button variant={'outline'} className='rounded bg-white text-black h-12 my-3'>
                <Link href="/private/addHabit">+ Add Habit</Link>
            </Button>
            <HabitList />
        </div>


        // <div>
        //     <div>
        //         <div>
        //             <div className='grid grid-cols-4 space-x-3 '>
        //                 <Card>
        //                     <CardHeader>
        //                         <CardTitle>Total Revenue</CardTitle>
        //                     </CardHeader>
        //                     <CardContent>
        //                         <div>
        //                             $80,234
        //                         </div>
        //                         <p>+13% from last month</p>
        //                     </CardContent>
        //                 </Card>
        //                 <Card>
        //                     <CardHeader>
        //                         <CardTitle>Total Revenue</CardTitle>
        //                     </CardHeader>
        //                     <CardContent>
        //                         <div>
        //                             $80,234
        //                         </div>
        //                         <p>+13% from last month</p>
        //                     </CardContent>
        //                 </Card>
        //                 <Card>
        //                     <CardHeader>
        //                         <CardTitle>Total Revenue</CardTitle>
        //                     </CardHeader>
        //                     <CardContent>
        //                         <div>
        //                             $80,234
        //                         </div>
        //                         <p>+13% from last month</p>
        //                     </CardContent>
        //                 </Card>
        //                 <Card>
        //                     <CardHeader>
        //                         <CardTitle>Total Revenue</CardTitle>
        //                     </CardHeader>
        //                     <CardContent>
        //                         <div>
        //                             $80,234
        //                         </div>
        //                         <p>+13% from last month</p>
        //                     </CardContent>
        //                 </Card>
        //             </div>
        //             <div>
        //                 <Card>
        //                     <CardHeader>
        //                         <CardTitle>Recent Signups</CardTitle>
        //                     </CardHeader>
        //                     <CardContent>
        //                         <Table>
        //                             <TableHeader>
        //                                 <TableRow>
        //                                     <TableHead>Name</TableHead>
        //                                     <TableHead>Email</TableHead>
        //                                     <TableHead>Plan</TableHead>
        //                                     <TableHead>Date</TableHead>
        //                                 </TableRow>
        //                             </TableHeader>
        //                             <TableBody>
        //                                 <TableRow>
        //                                 <TableCell>John Doe</TableCell>
        //                                 <TableCell>johndoe@abc.com</TableCell>
        //                                 <TableCell>Pro</TableCell>
        //                                 <TableCell>2024/04/01</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                 <TableCell>John Doe</TableCell>
        //                                 <TableCell>johndoe@abc.com</TableCell>
        //                                 <TableCell>Pro</TableCell>
        //                                 <TableCell>2024/04/01</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                 <TableCell>John Doe</TableCell>
        //                                 <TableCell>johndoe@abc.com</TableCell>
        //                                 <TableCell>Pro</TableCell>
        //                                 <TableCell>2024/04/01</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                 <TableCell>John Doe</TableCell>
        //                                 <TableCell>johndoe@abc.com</TableCell>
        //                                 <TableCell>Pro</TableCell>
        //                                 <TableCell>2024/04/01</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                 <TableCell>John Doe</TableCell>
        //                                 <TableCell>johndoe@abc.com</TableCell>
        //                                 <TableCell>Pro</TableCell>
        //                                 <TableCell>2024/04/01</TableCell>
        //                                 </TableRow>
        //                                 <TableRow>
        //                                 <TableCell>John Doe</TableCell>
        //                                 <TableCell>johndoe@abc.com</TableCell>
        //                                 <TableCell>Pro</TableCell>
        //                                 <TableCell>2024/04/01</TableCell>
        //                                 </TableRow>
        //                             </TableBody>
        //                         </Table>
        //                     </CardContent>
        //                 </Card>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Dashboard