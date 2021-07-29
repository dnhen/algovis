// Function to return in order the grid as cells are visited, and the final path of cells
//
// @param grid            Arr: the grid array
// @param setGrid         Func: the function to set the grid
// @param startCell       Arr: the coords of the starting cell
//
// @return                Arr: the final array of all grid variations (for visited cells) and final path in format [grids, paths]
export function astar( { grid, setGrid, startCell, endCell } ){
  // Function to sort cells by distance
  function sortByDistance(unvisitedCells, grid){
    return unvisitedCells.sort((cellA, cellB) => grid[cellA[0]][cellA[1]].distance - grid[cellB[0]][cellB[1]].distance);
  }

  // Function to return the neighbours coords (top bottom left right), that are not walls
  function getNeighbours(currCell, grid){
    let row = currCell[0];
    let col = currCell[1];
    let output = [];

    // Get top, bottom, left, and right -> update dist and set prev node
    if(row-1 >= 0 && !grid[row-1][col].wall){
      output.push([row-1, col]);
    }
    if(row+1 < grid.length && !grid[row+1][col].wall){
      output.push([row+1, col]);
    }
    if(col-1 >= 0 && !grid[row][col-1].wall){
      output.push([row, col-1]);
    }
    if(col+1 < grid[0].length  && !grid[row][col+1].wall){
      output.push([row, col+1]);
    }

    return output;
  }
  /*
  OPEN // the set of nodes to be avaluated
  CLOSED // the ser of nodes already evaluated
  add the start node to OPEN

  loop
    current = node in OPEN with the lowest f_cost
    remove current from OPEN
    add current to CLOSED
    
    if current is the target node
      return // path has been found
    
    foreach neighbour of the current node
      if neighbour is not traversable or neighbour is in CLOSED
        skip to the next neighbour

      if new path to neighbour is shorter OR neighbour is not in OPEN
        set f_cost of neighbour
        set parent of neighbour to current
        if neighbour is not in OPEN
          add neighbour to OPEN
  */

  let gridArray = [];
  let newGrid = copyGrid(grid);
  let lastCell = null;
  let open = [];
  let closed = [];
  let foundEnd = false;
  open.push(startCell);

  while(!foundEnd && open.length > 0){

    open = sortByDistance(open, newGrid); // Sort by the fCost (stored as distance)
    let currCell = open.shift(); // Get the cell with smallest f cost
    closed.push(currCell); // Add the current cell to closed array
    lastCell = currCell;

    if(newGrid[currCell[0]][currCell[1]].endCell){ // We found the end -> path has been found
      foundEnd = true;
    }

    let neighbours = getNeighbours(currCell, newGrid);

    neighbours.forEach((cell, i) => {
      if(!closed.some((val, valId) => val[0] === cell[0] && val[1] === cell[1])){ // If the cell is NOT in closed
        let gCost = Math.floor(Math.sqrt(Math.pow(cell[0]-startCell[0], 2) + Math.pow(cell[1]-startCell[1], 2)));
        let hCost = Math.floor(Math.sqrt(Math.pow(cell[0]-endCell[0], 2) + Math.pow(cell[1]-endCell[1], 2)));
        let fCost = gCost + hCost;

        if(fCost < newGrid[cell[0]][cell[1]].distance || !open.some((val, valId) => val[0] === cell[0] && val[1] === cell[1])){ // If new path is shorter or neighbour not in OPEN
          newGrid[cell[0]][cell[1]].distance = fCost;
          newGrid[cell[0]][cell[1]].visited = true;
          newGrid[cell[0]][cell[1]].prevCell = currCell;
          if(!open.some((val, valId) => val[0] === cell[0] && val[1] === cell[1])){ // if neighbour not in OPEN
            open.push(cell);
          }
        }
      }
    });
    
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