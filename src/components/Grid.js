import { useState } from 'react';
import Cell from './Cell';

const CELL_SIZE = 30; // The size of each cell SIZE x SIZE (has to be > 10)
const MIN_FACTOR = 0.9; // The factor to multiply row and cols to shorten to not be full page

// Calculate how many columns and rows the grid will contain
const cols = Math.floor((window.innerWidth / CELL_SIZE) * MIN_FACTOR);
const rows = Math.floor(((window.innerHeight - 140) / CELL_SIZE) * MIN_FACTOR);

const cellStyle = {
  height: `${CELL_SIZE}px`,
  width: `${CELL_SIZE}px`
}

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [startCell, setStartCell] = useState('0-0');
  const [endCell, setEndCell] = useState(`${rows-1}-${cols-1}`)

  // Init grid
  for(let row = 0; row < rows; row++){
    let currRow = [];
    for(let col = 0; col < cols; col++){
      currRow.push([]);
    }
    grid.push(currRow);
  }

  // Function to make cells (this adds the start and end classes if they are applicable)
  const createCell = (key, cellid) => {
    let special = "";

    if(cellid === startCell){
      special = "start";
    } else if(cellid === endCell){
      special = "end";
    }
    
    return (<Cell
          key={key}
          style={cellStyle}
          cellid={cellid}
          onClick={handleClick}
          special={special} />);
  }

  // Function to handle when we click on cells
  const handleClick = (id) => {
    console.log(id);
  }

  return (
    <div className="grid">
      {grid.map((row, rowId) => {
        return (
          <div className="row" key={rowId}>
            {row.map((cell, cellId) => {
              return createCell(`${rowId}-${cellId}`, `${rowId}-${cellId}`);
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
