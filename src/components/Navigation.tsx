import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import '../styles/Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user || location.pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button onClick={() => navigate('/dashboard')} className="brand-logo">
          🏥 Healthcare SaaS
        </button>
      </div>

      <ul className="navbar-menu">
        <li>
          <button
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${isActive('/patients') ? 'active' : ''}`}
            onClick={() => navigate('/patients')}
          >
             Patients
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
            onClick={() => navigate('/analytics')}
          >
             Analytics
          </button>
        </li>
      </ul>

      <div className="navbar-user">
        <span className="user-name">👤 {user.displayName}</span>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
