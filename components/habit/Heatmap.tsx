import { getSession } from '@/lib/getSession'
import { HabitEntry } from '@/models/HabitEntry'
import React, { useEffect } from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const xLabels = new Array(31).fill(0).map((_, i) => `${i}`)
const yLabels = ['Su', 'M', 'Tu', 'W', 'Th', 'F','Sa']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 2))
  )

const Heatmap = ({habitId,entries}) => {
  console.log("entries from heatmap:", entries);
  
  // Check if entries is a string and parse it
  let parsedEntries = [];

  if (typeof entries === 'string') {
    try {
      parsedEntries = JSON.parse(entries); // Parse the JSON string
    } catch (error) {
      console.error("Error parsing entries:", error);
      return null; // Handle parsing error accordingly
    }
  } else if (Array.isArray(entries)) {
    parsedEntries = entries; // If it's already an array, use it directly
  } else {
    console.error("Entries is not a valid array or string:", entries);
    return null; // Handle the error accordingly
  }

  // Map entries to completed values (1 for true, 0 for false)
  const completedValues = parsedEntries.map(entry => entry.completed ? 1 : 0);
  console.log("Completed values (1 for true, 0 for false):", completedValues);

 
  // Create a new array to hold completed values for each day of the week
  const completedArray = new Array(yLabels.length).fill(0).map(() => 
    Array(xLabels.length).fill(0)
  );

  // Populate completedArray with completedValues
  completedValues.forEach((value, index) => {
    const dayIndex = index % yLabels.length; // Find the day index
    completedArray[dayIndex][Math.floor(index / yLabels.length)] = value;
  });

  console.log("Final Completed values array:", completedArray);

  return (
    <div className='w-full pl-1'>

        <p>{habitId}</p>
        <p>{completedValues}</p>

      <HeatMapGrid
        data={completedArray}
        // xLabels={xLabels}
        // yLabels={yLabels}
        // Render cell with tooltip
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}></div>
        )}
        // xLabelsStyle={(index) => ({
        //   color: index % 2 ? 'transparent' : '#777',
        //   fontSize: '.8rem',
        // })}
        // yLabelsStyle={() => ({
        //   fontSize: '.7rem',
        //   textTransform: 'uppercase',
        //   color: '#777'
        // })}
        cellStyle={(_x, _y, ratio) => ({
            background: ratio == 0 ? 'rgb(40,40,40)' : `rgb(12, 160, 44, ${ratio})`,
        //   background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: '.8rem',
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
          margin: `1px`,
          border: `0px`,
          borderRadius: `2px`,
        })}
        cellHeight='0.7rem'
        // xLabelsPos='bottom'
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        // yLabelsPos='left'
        square
      />
    </div>
  )
}

export default Heatmap
