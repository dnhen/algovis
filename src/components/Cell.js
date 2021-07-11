const Cell = ( {style, row, col, onClick, special} ) => {
  return (
    <div className={`cell ${special}`} style={style} row={row} col={col} onClick={() => onClick(row, col)} />
  );
}

export default Cell;
