import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Helper function to check if the current route matches
  const isActive = (path) => location.pathname === path;

  // Common neon button style
  const neonButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    border: '2px solid #39FF14',
    color: '#39FF14',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: '0.3s ease',
    fontSize: '16px',
  };

  // Neon hover effect
  const neonHoverEffect = {
    backgroundColor: '#39FF14',
    color: '#000',
  };

  // Navbar container style
  const navbarStyle = {
    backgroundColor: '#1c1c1c',
    padding: '15px',
  };

  return (
    <nav style={navbarStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/" style={{ color: '#39FF14', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>
          Fitness Tracker
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link
            to="/"
            style={{
              ...neonButtonStyle,
              ...(isActive('/') ? neonHoverEffect : {}),
            }}
          >
            <DashboardIcon style={{ marginRight: '8px' }} />
            Dashboard
          </Link>
          <Link
            to="/workouts"
            style={{
              ...neonButtonStyle,
              ...(isActive('/workouts') ? neonHoverEffect : {}),
            }}
          >
            <FitnessCenterIcon style={{ marginRight: '8px' }} />
            Workouts
          </Link>
          <Link
            to="/goals"
            style={{
              ...neonButtonStyle,
              ...(isActive('/goals') ? neonHoverEffect : {}),
            }}
          >
            <EmojiEventsIcon style={{ marginRight: '8px' }} />
            Goals
          </Link>
        </div>

        {/* User Authentication Buttons */}
        <div style={{ display: 'flex', gap: '15px' }}>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  style={{
                    ...neonButtonStyle,
                    ...(isActive('/admin') ? neonHoverEffect : {}),
                  }}
                >
                  <AdminPanelSettingsIcon style={{ marginRight: '8px' }} />
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                style={{
                  ...neonButtonStyle,
                  backgroundColor: '#39FF14',
                  color: '#000',
                }}
              >
                <LogoutIcon style={{ marginRight: '8px' }} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={neonButtonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, neonHoverEffect)}
                onMouseLeave={(e) => Object.assign(e.target.style, neonButtonStyle)}
              >
                <LoginIcon style={{ marginRight: '8px' }} />
                Login
              </Link>
              <Link
                to="/signup"
                style={neonButtonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, neonHoverEffect)}
                onMouseLeave={(e) => Object.assign(e.target.style, neonButtonStyle)}
              >
                <PersonAddIcon style={{ marginRight: '8px' }} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
