import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="dashboard-header">
        <div className="brand-logo">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>EventHub</span>
        </div>

        <div className="user-profile-menu">
          <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Organizer'}</span>
            <span className="user-email">{user?.email || 'organizer@event.com'}</span>
          </div>

          <button type="button" className="logout-btn" onClick={handleLogout} title="Logout">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-content">
          <h2>Welcome back, {user?.name || 'Organizer'}! 🎉</h2>
          <p>Your event management dashboard is active. You have 3 upcoming events scheduled this week.</p>
        </div>
        <button className="create-event-btn" onClick={() => navigate('/register-event')}>
          + Create New Event
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon purple">🗓️</div>
          <div className="metric-details">
            <span className="metric-value">12</span>
            <span className="metric-label">Active Events</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon cyan">🎟️</div>
          <div className="metric-details">
            <span className="metric-value">1,480</span>
            <span className="metric-label">Tickets Sold</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green">💰</div>
          <div className="metric-details">
            <span className="metric-value">$24,950</span>
            <span className="metric-label">Revenue</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon gold">⭐</div>
          <div className="metric-details">
            <span className="metric-value">4.9 / 5</span>
            <span className="metric-label">Organizer Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
