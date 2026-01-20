
import { FiSettings } from 'react-icons/fi'; // You'll need to install react-icons
import '../styles/navbar.css';
import { useTheme } from '../context/ThemeContext';
import { FaPalette } from 'react-icons/fa';

const Navbar = () => {
  const { toggleTheme, themeName } = useTheme();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Pomodoro</h1>
        <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label={`Change theme (current: ${themeName})`}
            title={`Change theme (${themeName})`}
          >
            <FaPalette />
          </button>
          <button className="settings-button" aria-label="Settings">
          <FiSettings size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;