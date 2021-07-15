import logo from './Logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} className="logo" alt="Logo" />
        <p className="header-text">ALGOVIS</p>
        <p id="placeStartButton" className="navOption">Place Starting Node</p>
        <p id="placeEndButton" className="navOption">Place Ending Node</p>
        <p className="navOption">Visualise!</p>
      </div>
    </header>
  );
}

export default Header;