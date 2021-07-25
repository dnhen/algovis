import { dijstras } from './algorithms/dijstras.js';

let placeStartCell = false;
let placeEndCell = false;
let placeWalls = false;
let visualising = false;

const placeStartButtonId = "placeStartButton";
const placeEndButtonId = "placeEndButton";
const placeWallsButtonId = "placeWallsButton";
const visualiseButtonId = "visualiseButton";

const displayTimeout = 10;

// Updates the grid, rendering each cell and setting the start and end nodes their correct colours
//
// @param rows            Int: number of rows in the grid
// @param cols            Int: number of columns in the grid
// @param start           Arr: start cell array in format [row, column] of the current start val
// @param end             Arr: end cell array in format [row, column] of the current end val
// @param walls           Arr: wall array in format [[row, column], [row, column], etc...] of where the walls are
//
// @return null
export function updateGrid(rows, cols, start, end, walls){
  let newGrid = [];

  // Loop through all rows, and cols and set the grid to be them
  for(let row = 0; row < rows; row++){
    let newRow = [];
    for(let col = 0; col < cols; col++){
      newRow.push({
        row: {row},
        col: {col},
        startCell: row === start[0] && col === start[1],
        endCell: row === end[0] && col === end[1],
        wall: walls.some((val, valId) => val[0] === row && val[1] === col), // Loop through the walls array and set true value if the row and col is in the walls array, then check if true was found
        visited: false,
        distance: Infinity,
        prevCell: null,
        highlight: false
      });
    }
    newGrid.push(newRow);
  }
  
  return newGrid;
}

// Gets called every time the user clicks on a cell
//
// @param row             Int: the clicked row number
// @param col             Int: the clicked column number
// @param setStartCell    Func: the function to set the start cell state
// @param setEndCell      Func: the function to set the end cell state
// @param wallObj         Obj: walls object which contains {walls, setWalls} that is the useState object
//
// @return null
export function handleClick(row, col, grid, setStartCell, setEndCell, {walls, setWalls}){
  if(placeStartCell && !grid[row][col].wall){ // If placeStartCell is active, set the new start cell and reset the navbar to be not highlighted
    setStartCell([row, col]);
    placeStartCell = false;
    document.getElementById(placeStartButtonId).classList.remove("active");
  } else if(placeEndCell && !grid[row][col].wall){ // If placeEndCell is active, set the new end cell and reset the navbar to be not highlighted
    setEndCell([row, col]);
    placeEndCell = false;
    document.getElementById(placeEndButtonId).classList.remove("active");
   } else if(placeWalls){ // If placeWalls is active, place walls where the user clicks
    if(!walls.some((val, valId) => val[0] === row && val[1] === col)){ // Not in array -> add to walls
      if(!grid[row][col].startCell && !grid[row][col].endCell){ // We arent placing walls on end and start cell
        setWalls(walls.concat([[row, col]]));
      }
    } else { // Remove the wall the user clicked
      const index = walls.findIndex((val, valId) => val[0] === row && val[1] === col);
      let newWalls = walls.slice();
      newWalls.splice(index, 1);
      setWalls(newWalls);
    }
   }
}

// Gets called every time the user clicks on an option in the navbar
//
// @param buttonId        Str: the ID of the button that was pressed
// @param info            Obj: grid, setGrid, startCell, endCell
//
// @return null
export function handleNavClick(buttonId, info){
  if(!placeStartCell && !placeEndCell && !placeWalls && !visualising){ // None of the menu buttons are toggled on
    // Set clicked button to be active
    document.getElementById(buttonId).classList.add("active");

    if(buttonId === placeStartButtonId){ // User clicked place start node button
      placeStartCell = true;
    } else if(buttonId === placeEndButtonId){ // User clicked place end node button
      placeEndCell = true;
    } else if(buttonId === placeWallsButtonId){
      placeWalls = true;
    } else if(buttonId === visualiseButtonId){
      visualising = true;

      const output = dijstras(info);

      visualiseAlgorithm(output[0], output[1], info.setGrid);

      setTimeout(() => { // Run after all displaying is complete
        document.getElementById(visualiseButtonId).classList.remove("active");
        visualising = false;
      }, displayTimeout * output[0].length + (displayTimeout * 2) * output[1].length + 1);
    }
  } else if(buttonId === placeWallsButtonId && placeWalls){ // Place walls is toggled on (and button was clicked again) -> toggle it off
    placeWalls = false;
    document.getElementById(buttonId).classList.remove("active");
  }
}

// Visualises an algorithm once all data is passed into it
//
// @param grids           Arr: an array of updated grids that each time have a new visited cell ticked
// @param paths           Arr: an array of updated grids that each time have a new path cell highlighted
// @param setGrid         Func: the function to set the grid
//
// @return null
export function visualiseAlgorithm(grids, paths, setGrid){
  grids.forEach((grid, i) => {
    setTimeout(() => {
      setGrid(grid);
    }, displayTimeout * i);
  });

  setTimeout(() => {
    paths.forEach((path, i) => {
      setTimeout(() => {
        setGrid(path);
      }, (displayTimeout * 2) * i);
    });
  }, displayTimeout * grids.length + 1);
    
}