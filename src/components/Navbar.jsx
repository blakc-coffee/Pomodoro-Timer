
import { FiSettings } from 'react-icons/fi'; // You'll need to install react-icons
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Pomodoro</h1>
        <button className="settings-button" aria-label="Settings">
          <FiSettings size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;