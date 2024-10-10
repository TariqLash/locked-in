import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({habitId,entries}) => {

  // const entries = JSON.stringify([
  //   {"_id": "1", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-09-10T10:00:00.000Z", "__v": 0},
  //   {"_id": "2", "habit": "habit_1", "user": "user_1", "completed": false, "date": "2024-09-11T10:00:00.000Z", "__v": 0},
  //   {"_id": "3", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-09-12T10:00:00.000Z", "__v": 0},
  //   {"_id": "4", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-09-15T10:00:00.000Z", "__v": 0},
  //   {"_id": "5", "habit": "habit_1", "user": "user_1", "completed": false, "date": "2024-09-20T10:00:00.000Z", "__v": 0},
  //   {"_id": "6", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-09-25T10:00:00.000Z", "__v": 0},
  //   {"_id": "7", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-09-28T10:00:00.000Z", "__v": 0},
  //   {"_id": "8", "habit": "habit_1", "user": "user_1", "completed": false, "date": "2024-09-30T10:00:00.000Z", "__v": 0},
  //   {"_id": "9", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-10-01T10:00:00.000Z", "__v": 0},
  //   {"_id": "10", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-10-05T10:00:00.000Z", "__v": 0},
  //   {"_id": "11", "habit": "habit_1", "user": "user_1", "completed": true, "date": "2024-10-08T10:00:00.000Z", "__v": 0},
  //   {"_id": "12", "habit": "habit_1", "user": "user_1", "completed": false, "date": "2024-10-09T10:00:00.000Z", "__v": 0}
  // ]);
  

  let parsedEntries = [];

  // Safely parse entries, ensuring it's an array
  try {
    parsedEntries = JSON.parse(entries);
  } catch (error) {
    console.error("Error parsing entries:", error);
  }

  const formatHeatmapData = (entries) => {
    // Check if entries is an array
    if (!Array.isArray(entries)) {
      console.error("Entries is not an array:", entries);
      return [];
    }

    return entries
      .filter(entry => entry.completed === true) // Include only entries where completed is true
      .map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
        return { date: formattedDate };
      });
  };

  const heatmapData = formatHeatmapData(parsedEntries);



  const today = new Date(); // Today's date
  const fourMonthsAgo = new Date(today); // Create a new date object based on today's date
  fourMonthsAgo.setMonth(today.getMonth() - 4); // Set the month to one month ago
  today.setHours(0, 0, 0, 0); // Set time to midnight for today

  return (
    <div className='w-full mx-auto p-4'>
      <CalendarHeatmap
        startDate={fourMonthsAgo} // Start date
        endDate={today} // End date set to today
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return 'color-empty'; // Gray for empty squares
          }
          return 'color-completed'; // One color for completed squares
        }}
        transformDayElement={(element, value, index) => 
          React.cloneElement(element, { rx: 2, ry: 2 }) // Adjust rx and ry to round the corners
        }
      />
    </div>
  );
};

export default Heatmap;


// import { getSession } from '@/lib/getSession'
// import { HabitEntry } from '@/models/HabitEntry'
// import React, { useEffect } from 'react'
// import { HeatMapGrid } from 'react-grid-heatmap'

// const xLabels = new Array(31).fill(0).map((_, i) => `${i}`)
// const yLabels = ['Su', 'M', 'Tu', 'W', 'Th', 'F','Sa']
// // const data = new Array(yLabels.length)
// //   .fill(0)
// //   .map(() =>
// //     new Array(xLabels.length)
// //       .fill(0)
// //       .map(() => Math.floor(Math.random() * 2))
// //   )

// const Heatmap = ({habitId,entries}) => {
  
//   // Check if entries is a string and parse it
//   let parsedEntries = [];

//   if (typeof entries === 'string') {
//     try {
//       parsedEntries = JSON.parse(entries); // Parse the JSON string
//     } catch (error) {
//       console.error("Error parsing entries:", error);
//       // Ensure the heatmap renders even with invalid data
//       parsedEntries = [];
//     }
//   } else if (Array.isArray(entries)) {
//     parsedEntries = entries; // If it's already an array, use it directly
//   } else {
//     console.error("Entries is not a valid array or string:", entries);
//     parsedEntries = []; // Ensure the heatmap renders even with invalid data
//   }

//   // Create an array of completed values (0 for false, 1 for true)
//   let completedValues = parsedEntries.map(entry => entry.completed ? 1 : 0);


//   // Create a new array to hold completed values for each day of the week
//   const completedArray = new Array(yLabels.length).fill(0).map(() => 
//     Array(xLabels.length).fill(0)
//   );

//   // Populate completedArray with completedValues
//   completedValues.forEach((value, index) => {
//     const dayIndex = index % yLabels.length; // Find the day index
//     completedArray[dayIndex][Math.floor(index / yLabels.length)] = value;
//   });


//   return (
//     <div className='w-full pl-1'>

//       <HeatMapGrid
//         data={completedArray}
//         // xLabels={xLabels}
//         // yLabels={yLabels}
//         // Render cell with tooltip
//         cellRender={(x, y, value) => (
//           <div title={`Pos(${x}, ${y}) = ${value}`}></div>
//         )}
//         // xLabelsStyle={(index) => ({
//         //   color: index % 2 ? 'transparent' : '#777',
//         //   fontSize: '.8rem',
//         // })}
//         // yLabelsStyle={() => ({
//         //   fontSize: '.7rem',
//         //   textTransform: 'uppercase',
//         //   color: '#777'
//         // })}
//         cellStyle={(_x, _y, ratio) => ({
//             background: ratio == 0 ? 'rgb(40,40,40)' : `rgb(12, 160, 44, ${ratio})`,
//         //   background: `rgb(12, 160, 44, ${ratio})`,
//           fontSize: '.8rem',
//           color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
//           margin: `1px`,
//           border: `0px`,
//           borderRadius: `2px`,
//         })}
//         cellHeight='0.7rem'
//         // xLabelsPos='bottom'
//         onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
//         // yLabelsPos='left'
//         square
//       />
//     </div>
//   )
// }

// export default Heatmap
