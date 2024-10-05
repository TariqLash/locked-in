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

// Accept habit data as props
export default function Habitcard({ habitName }) {
  return (
    <>
      <Card className='w-96 h-fit flex flex-col justify-evenly rounded-xl grayBorder m-5'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div className='flex items-center w-fit'>
              <button><EllipsisVertical className='mr-3 w-5' /></button>
              {/* Use habitName from props */}
              <CardTitle className='text-3xl flex items-center'>{habitName}</CardTitle>
            </div>
            <Checkbox className='w-6 h-6 ml-14 rounded' />
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
          <Heatmap />
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
