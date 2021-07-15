import logo from './Logo.svg';

const Header = ( { startNodeFunc, endNodeFunc } ) => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} className="logo" alt="Logo" />
        <p className="header-text">ALGOVIS</p>
        <p id="placeStartButton" className="navOption" onClick={startNodeFunc}>Place Starting Node</p>
        <p id="placeEndButton" className="navOption" onClick={endNodeFunc}>Place Ending Node</p>
        <p className="navOption">Visualise!</p>
      </div>
    </header>
  );
}

export default Header;