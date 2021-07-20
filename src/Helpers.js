let placeStartCell = false;
let placeEndCell = false;
let placeWalls = false;
let visualising = false;

const placeStartButtonId = "placeStartButton";
const placeEndButtonId = "placeEndButton";
const placeWallsButtonId = "placeWallsButton";
const visualiseButtonId = "visualiseButton";

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
        visited: false
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
//
// @return null
export function handleNavClick(buttonId, grid){
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
      dijstras(grid);
    }
  } else if(buttonId === placeWallsButtonId && placeWalls){ // Place walls is toggled on (and button was clicked again) -> toggle it off
    placeWalls = false;
    document.getElementById(buttonId).classList.remove("active");
  }
}

export function dijstras( { grid, setGrid, startCell, endCell } ){
  // Function to get immediate siblings of the cell at row, col
  function getSiblings(row, col, grid){
    let output = [];
    // Get top
    if(row-1 >= 0 && !grid[row-1][col].visited && !grid[row-1][col].wall){
      output.push([row-1, col]);
    }
    // Get bottom
    if(row+1 < grid.length && !grid[row+1][col].visited && !grid[row+1][col].wall){
      output.push([row+1, col]);
    }
    // Get left
    if(col-1 >= 0 && !grid[row][col-1].visited && !grid[row][col-1].wall){
      output.push([row, col-1]);
    }
    // Get right
    if(col+1 < grid[0].length && !grid[row][col+1].visited && !grid[row][col+1].wall){
      output.push([row, col+1]);
    }

    return output;
  }

  let foundEnd = false;
  let foundCells = [startCell];

  // Continue looping until we have reached the end node, or there are no more unvisited nodes
  while(foundCells.length > 0 && !foundEnd){
    let newGrid = grid.slice(); // Copy the grid (to make edits to)
    let currCell = foundCells.shift(); // Get the next cell in the foundCells array
    let siblings = getSiblings(currCell[0], currCell[1], newGrid); // Get the immediate siblings of the cell we are looking at
    foundCells = foundCells.concat(siblings); // Add the siblings of current cell to foundCells array

    for(let i = 0; i < siblings.length; i++){ // Loop through each sibling -> set to visited
      if(newGrid[siblings[i][0]][siblings[i][1]].endCell){ // If the cell is the end cell
        foundEnd = true;
        break;
      } else {
        newGrid[siblings[i][0]][siblings[i][1]].visited = true;
      }
    }
    
    setGrid(newGrid);
  }

  document.getElementById(visualiseButtonId).classList.remove("active");
  visualising = false;
}