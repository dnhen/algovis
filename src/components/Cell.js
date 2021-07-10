import { useState } from 'react';

const Cell = ( {cellStyle, startCell, endCell, visitedCell, onClick} ) => {
  const [start, setStart] = useState(startCell);
  const [end, setEnd] = useState(endCell);
  const [visited, setVisited] = useState(visitedCell);

  return (
    <div className={start ? 'cell start' : end ? 'cell end' : visited ? 'cell visited' : 'cell'} style={cellStyle}>
      
    </div>
  );
}

export default Cell;
