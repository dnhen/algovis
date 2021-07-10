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
  // Init grid
  const grid = [];
  for(let row = 0; row < rows; row++){
    let currRow = [];
    for(let col = 0; col < cols; col++){
      currRow.push(<Cell key={col} style={cellStyle} cellId={`${col}-${row}`} />);
    }
    grid.push(currRow);
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
