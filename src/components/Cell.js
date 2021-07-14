import { useContext } from 'react';
import { GridContext } from '../GridContext';

const Cell = ( {style, row, col, onClick, special} ) => {
  const grid = useContext(GridContext);

  return (
    <div className={`cell ${special}`} style={style} row={row} col={col} onClick={() => onClick(row, col, grid)} />
  );
}

export default Cell;
