import { useState, useEffect } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import Cell from './components/Cell';
import { GridContext } from './GridContext';

const CELL_SIZE = 30; // The size of each cell SIZE x SIZE (has to be > 10)
const MIN_FACTOR = 0.9; // The factor to multiply row and cols to shorten to not be full page

// Calculate how many columns and rows the grid will contain
const cols = Math.floor((window.innerWidth / CELL_SIZE) * MIN_FACTOR);
const rows = Math.floor(((window.innerHeight - 140) / CELL_SIZE) * MIN_FACTOR);

const cellStyle = {
  height: `${CELL_SIZE}px`,
  width: `${CELL_SIZE}px`
}

// Initialise both toggles to be false -> will change when header option clicked
let newStartNodeActive = false;
let newEndNodeActive = false;

function App() {
  // Initialise the grid, and start and end cell values
  const [grid, setGrid] = useState([]);
  const [startCell, setStartCell] = useState([0,0]);
  const [endCell, setEndCell] = useState([rows-1, cols-1]);

  // First call -> start the grid
  useEffect(() => {
    initGrid();
  }, []);

  // Initialise grid by looping through rows and cols and creating a cell at each val
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

    if(row === startCell[0] && col === startCell[1]){
      special = "start";
    } else if(row === endCell[0] && col === endCell[1]){
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
  const handleClick = (row, col, grid) => {
    // Copy the grid
    let newGrid = grid.slice();

    if(newStartNodeActive){
      newGrid[row][col] = createCell(row, col, true)
      // Update active class and bool
      document.getElementById("placeStartButton").classList.remove("active");
      newStartNodeActive = false;
    } else if(newEndNodeActive){
      // Update active class and bool
      document.getElementById("placeEndButton").classList.remove("active");
      newEndNodeActive = false;
    } else {
      // Make new cell in clicked pos -> set the grid
      newGrid[row][col] = createCell(row, col, true);
    }

    setGrid(newGrid);
  }

  const activateNewStartNode = () => {
    if(!newStartNodeActive && !newEndNodeActive){
      document.getElementById("placeStartButton").classList.add("active");
      newStartNodeActive = true;
    }
  }

  const activateNewEndNode = () => {
    if(!newStartNodeActive && !newEndNodeActive){
      document.getElementById("placeEndButton").classList.add("active");
      newEndNodeActive = true;
    }
  }

  return (
    <div className="app">
      <GridContext.Provider value={grid}>
        <Header startNodeFunc={activateNewStartNode} endNodeFunc={activateNewEndNode} />
        <Grid />
      </GridContext.Provider>
    </div>
  );
}

export default App;
