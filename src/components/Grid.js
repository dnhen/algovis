import { useContext } from 'react';
import { GridContext } from '../GridContext';

const Grid = () => {
  const grid = useContext(GridContext);

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
