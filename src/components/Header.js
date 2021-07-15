import logo from './Logo.svg';

const Header = ( { onClick } ) => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} className="logo" alt="Logo" />
        <p className="header-text">ALGOVIS</p>
        <p className="navOption" id="placeStartButton" onClick={() => onClick("placeStartButton")}>Place Starting Node</p>
        <p className="navOption" id="placeEndButton" onClick={() => onClick("placeEndButton")}>Place Ending Node</p>
        <p className="navOption">Visualise!</p>
      </div>
    </header>
  );
}

export default Header;