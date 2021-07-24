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
// @param grid            Arr: the grid array
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

// Gets called every time the user clicks on an option in the navbar
//
// @param grid            Arr: the grid array
// @param setGrid         Func: the function to set the grid
// @param startCell       Arr: the coords of the starting cell
//
// @return null
export function dijstras( { grid, setGrid, startCell } ){
  // Function -> Gets the coords [x, y] of each cell in the grid (to track min distance)
  function getAllCells(grid){
    let output = [];

    for(let x = 0; x < grid.length; x++){
      for(let y = 0; y < grid[x].length; y++){
        output.push([x, y]);
      }
    }

    return output;
  }

  // Function to sort cells by distance
  function sortByDistance(unvisitedCells, grid){
    return unvisitedCells.sort((cellA, cellB) => grid[cellA[0]][cellA[1]].distance - grid[cellB[0]][cellB[1]].distance);
  }

  // Function to update the distances of each neighbour by 1
  function updateNeighbours(currCell, grid){
    let row = currCell[0];
    let col = currCell[1];
    const currDist = grid[row][col].distance

    // Get top, bottom, left, and right -> update dist and set prev node
    if(row-1 >= 0 && !grid[row-1][col].visited){
      grid[row-1][col].distance = currDist + 1;
      grid[row-1][col].prevCell = currCell;
    }
    if(row+1 < grid.length && !grid[row+1][col].visited){
      grid[row+1][col].distance = currDist + 1;
      grid[row+1][col].prevCell = currCell;
    }
    if(col-1 >= 0 && !grid[row][col-1].visited){
      grid[row][col-1].distance = currDist + 1;
      grid[row][col-1].prevCell = currCell;
    }
    if(col+1 < grid[0].length && !grid[row][col+1].visited){
      grid[row][col+1].distance = currDist + 1;
      grid[row][col+1].prevCell = currCell;
    }

    return grid;
  }

  let foundEnd = false;
  let lastCell = null;
  let unvisitedCells = getAllCells(grid);
  grid[startCell[0]][startCell[1]].distance = 0;

  while(unvisitedCells.length > 0 && !foundEnd){ // Continue looping till we visited all nodes or we reached end node
    let newGrid = grid.slice();
    unvisitedCells = sortByDistance(unvisitedCells, newGrid);
    let currCell = unvisitedCells.shift(); // Get first cell off the array (least distance)
    lastCell = currCell; // Set the last cell to be the current cell (if we reach end, so we can back-track)

    if(newGrid[currCell[0]][currCell[1]].wall) continue; // Ignore if wall
    if(newGrid[currCell[0]][currCell[1]].distance === Infinity) foundEnd = true; // We are stuck in loop, stop the loop.
    if(newGrid[currCell[0]][currCell[1]].endCell) foundEnd = true; // We found the end cell -> end

    newGrid[currCell[0]][currCell[1]].visited = true; // Update current node to be visited
    newGrid[currCell[0]][currCell[1]].distance += 1; // Update current node distance to be +1
    newGrid = updateNeighbours(currCell, newGrid); // Update all the neighbours to have a distacne of +1
    setGrid(newGrid);
  }

  // Highlight the path
  let currCell = lastCell;

  while(currCell !== null){
    let newGrid = grid.slice();

    newGrid[currCell[0]][currCell[1]].highlight = true; // Highlight the current cell
    currCell = newGrid[currCell[0]][currCell[1]].prevCell; // Get the previous cell

    setGrid(newGrid);
  }

  document.getElementById(visualiseButtonId).classList.remove("active");
  visualising = false;
}