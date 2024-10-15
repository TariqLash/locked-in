import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

  {/* @ts-expect-error avoid error */}
const Heatmap = ({entries}) => {

  let parsedEntries = [];

  // Safely parse entries, ensuring it's an array
  try {
    parsedEntries = JSON.parse(entries);
  } catch (error) {
    console.error("Error parsing entries:", error);
  }

    {/* @ts-expect-error avoid error */}
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

  // Find the latest entry date or fallback to today
  const latestEntryDate = parsedEntries.length > 0 
  // @ts-expect-error avoid error
    ? new Date(Math.max(...parsedEntries.map(entry => new Date(entry.date)))) 
    : new Date(); // Fallback to today if no entries are available
  const formattedEndDate = latestEntryDate.toISOString().split('T')[0];

  const fourMonthsAgo = new Date(latestEntryDate); // Start from four months before the latest entry date
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4); // Set the month to four months ago

  const formattedStartDate = fourMonthsAgo.toISOString().split('T')[0];
  return (
    <div className='w-full mx-auto p-4'>
      <CalendarHeatmap
        startDate={formattedStartDate} // Start date
        endDate={formattedEndDate} // End date set to latest entry date
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return 'color-empty'; // Gray for empty squares
          }
          return 'color-completed'; // One color for completed squares
        }}
        transformDayElement={(element) => 
          React.cloneElement(element, { rx: 2, ry: 2 }) // Adjust rx and ry to round the corners
        }
      />
    </div>
  );
};

export default Heatmap;
