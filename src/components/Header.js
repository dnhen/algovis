import logo from './Logo.svg';

const Header = (props) => {
  return (
    <header className="header">
      <div class="header-container">
        <img src={logo} className="logo" />
        <p class="header-text">ALGOVIS</p>
      </div>
    </header>
  );
}

export default Header;