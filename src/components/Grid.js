import Cell from './Cell';

const CELL_SIZE = 30; // The size of each cell SIZE x SIZE (has to be > 10)
const MIN_FACTOR = 0.9; // The factor to multiply row and cols to shorten to not be full page

const Grid = () => {
  // Calculate how many columns and rows the grid will contain
  const cols = Math.floor((window.innerWidth / CELL_SIZE) * MIN_FACTOR);
  const rows = Math.floor(((window.innerHeight - 140) / CELL_SIZE) * MIN_FACTOR);
  const grid = [];
  
  // Create the array grid
  for(let row = 0; row < rows; row++){
    const currRow = [];
    for(let col = 0; col < cols; col++){
      currRow.push({
        start: row===Math.floor(rows/2)&&col===4,
        end: row===Math.floor(rows/2)&&col===cols-5,
        visited: false
      });
    }
    grid.push(currRow);
  }

  return (
    <div className="grid">
      {grid.map((row, rowId) => {
        return (
          <div className="row" key={rowId}>
            {row.map((cell, cellId) => {
              return <Cell key={cellId} cellStyle={{height: `${CELL_SIZE}px`, width: `${CELL_SIZE}px`}} startCell={cell.start} endCell={cell.end} visitedCell={cell.visited} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
