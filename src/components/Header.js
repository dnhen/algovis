import logo from './Logo.svg';

const Header = ( { onClick, info } ) => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} className="logo" alt="Logo" />
        <p className="header-text">ALGOVIS</p>
        <p className="navOption" id="placeStartButton" onClick={() => onClick("placeStartButton")}>Place Starting Node</p>
        <p className="navOption" id="placeEndButton" onClick={() => onClick("placeEndButton")}>Place Ending Node</p>
        <p className="navOption" id="placeWallsButton" onClick={() => onClick("placeWallsButton")}>Place Walls</p>
        <div className="navOption">
          <select id="algoSelectBox">
            <option className="dropped" value="dijkstras">Dijkstra's</option>
            <option className="dropped" value="astar">A*</option>
          </select>
        </div>
        <p className="navOption" id="visualiseButton" onClick={() => onClick("visualiseButton", info)}>Visualise!</p>
        <p className="navOption" id="resetButton" onClick={() => onClick("resetButton", info)}>Reset</p>
      </div>
    </header>
  );
}

export default Header;