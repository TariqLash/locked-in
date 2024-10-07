"use client"
import React from 'react'
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

const App = () => {
  return (
    <div className='w-full pl-1'>
      <HeatMapGrid
        data={data}
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

export default App
