const Cell = ( {style, cellid, onClick, special} ) => {
  return (
    <div className={`cell ${special}`} style={style} id={cellid} onClick={() => onClick({cellid})} />
  );
}

export default Cell;
