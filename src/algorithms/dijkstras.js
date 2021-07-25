// Function to return in order the grid as cells are visited, and the final path of cells
//
// @param grid            Arr: the grid array
// @param setGrid         Func: the function to set the grid
// @param startCell       Arr: the coords of the starting cell
//
// @return                Arr: the final array of all grid variations (for visited cells) and final path in format [grids, paths]
export function dijkstras( { grid, setGrid, startCell } ){
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

  let gridArray = [];
  let foundEnd = false;
  let lastCell = null;
  let unvisitedCells = getAllCells(grid);
  grid[startCell[0]][startCell[1]].distance = 0;
  let newGrid = copyGrid(grid);

  while(unvisitedCells.length > 0 && !foundEnd){ // Continue looping till we visited all nodes or we reached end node
    //let newGrid = grid.slice();
    unvisitedCells = sortByDistance(unvisitedCells, newGrid);
    let currCell = unvisitedCells.shift(); // Get first cell off the array (least distance)
    lastCell = currCell; // Set the last cell to be the current cell (if we reach end, so we can back-track)

    if(newGrid[currCell[0]][currCell[1]].wall) continue; // Ignore if wall
    if(newGrid[currCell[0]][currCell[1]].distance === Infinity) foundEnd = true; // We are stuck in loop, stop the loop.
    if(newGrid[currCell[0]][currCell[1]].endCell) foundEnd = true; // We found the end cell -> end

    newGrid[currCell[0]][currCell[1]].visited = true; // Update current node to be visited
    newGrid[currCell[0]][currCell[1]].distance += 1; // Update current node distance to be +1
    newGrid = updateNeighbours(currCell, newGrid); // Update all the neighbours to have a distacne of +1
    
    //setGrid(newGrid);
    gridArray.push(newGrid);
    newGrid = copyGrid(newGrid);
  }

  // Highlight the path
  let finalPath = [];
  let currCell = lastCell;
  newGrid = copyGrid(newGrid);

  while(currCell !== null){

    newGrid[currCell[0]][currCell[1]].highlight = true; // Highlight the current cell
    currCell = newGrid[currCell[0]][currCell[1]].prevCell; // Get the previous cell

    //setGrid(newGrid);
    finalPath.push(newGrid);
    newGrid = copyGrid(newGrid);
  }
  
  return [gridArray, finalPath];
}

function copyGrid(grid){
  let output = [];

  grid.forEach((row, rowId) => {
    let newRow = [];
    row.forEach((cell, cellId) => {
      newRow.push({
        row: cell.row,
        col: cell.col,
        startCell: cell.startCell,
        endCell: cell.endCell,
        wall: cell.wall, // Loop through the walls array and set true value if the row and col is in the walls array, then check if true was found
        visited: cell.visited,
        distance: cell.distance,
        prevCell: cell.prevCell,
        highlight: cell.highlight
      });
    });
    output.push(newRow);
  })

  return output;
}