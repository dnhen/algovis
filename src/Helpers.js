let placeStartCell = false;
let placeEndCell = false;

let placeStartButtonId = "placeStartButton";
let placeEndButtonId = "placeEndButton";

// Updates the grid, rendering each cell and setting the start and end nodes their correct colours
//
// @param rows            Int: number of rows in the grid
// @param cols            Int: number of columns in the grid
// @param start           Arr: start cell array in format [row, column] of the current start val
// @param end             Arr: end cell array in format [row, column] of the current end val
//
// @return null
export function updateGrid(rows, cols, start, end){
  let newGrid = [];

  // Loop through all rows, and cols and set the grid to be them
  for(let row = 0; row < rows; row++){
    let newRow = [];
    for(let col = 0; col < cols; col++){
      newRow.push({
        row: {row},
        col: {col},
        startCell: row === start[0] && col === start[1],
        endCell: row === end[0] && col === end[1]
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
//
// @return null
export function handleClick(row, col, setStartCell, setEndCell){
  if(placeStartCell){ // If placeStartCell is active, set the new start cell and reset the navbar to be not highlighted
    setStartCell([row, col]);
    placeStartCell = false;
    document.getElementById(placeStartButtonId).classList.remove("active");
  } else if(placeEndCell){ // If placeEndCell is active, set the new end cell and reset the navbar to be not highlighted
    setEndCell([row, col]);
    placeEndCell = false;
    document.getElementById(placeEndButtonId).classList.remove("active");
   } else {
    console.log("clicked empty");
   }
}

// Gets called every time the user clicks on an option in the navbar
//
// @return null
export function handleNavClick(buttonId){
  if(!placeStartCell && !placeEndCell){
    // Set clicked button to be active
    document.getElementById(buttonId).classList.add("active");
    if(buttonId === placeStartButtonId){ // User clicked place start node button
      placeStartCell = true;
    } else if(buttonId === placeEndButtonId){ // User clicked place end node button
      placeEndCell = true;
    }
  }
}