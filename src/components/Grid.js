import { useState, useEffect } from 'react';
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
  const [startCell, setStartCell] = useState([0,0]);
  const [endCell, setEndCell] = useState([rows-1, cols-1]);

  useEffect(() => {
    initGrid();
  }, []);

  const initGrid = () => {
    const grid = [];

    // Init grid
    for(let row = 0; row < rows; row++){
      let currRow = [];
      for(let col = 0; col < cols; col++){
        currRow.push(createCell(row, col, false));
      }
      grid.push(currRow);
    }
    setGrid(grid);
  }

  // Function to make cells (this adds the start, visited, and end classes if they are applicable)
  const createCell = (row, col, visited) => {
    let special = "";

    if(row === startCell[0] && col == startCell[1]){
      special = "start";
    } else if(row === endCell[0] && col == endCell[1]){
      special = "end";
    } else if(visited) {
      special = "visited";
    }
    
    return (<Cell
          key={col}
          style={cellStyle}
          row={row}
          col={col}
          onClick={handleClick}
          special={special} />);
  }

  // Function to handle when we click on cells
  const handleClick = (row, col) => {
    console.log(row + ' - ' + col);
  }

  return (
    <div className="grid">
      {grid.map((row, rowId) => {
        return (
          <div className="row" key={rowId}>
            {row.map((cell, cellId) => {
              return cell;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
