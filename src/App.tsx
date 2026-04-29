import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import Navigation from './components/Navigation';
import NotificationContainer from './components/NotificationContainer';
import { useAuthStore } from './store/store';

function App() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patients/:id" element={<PatientsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
            <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
          </Routes>
        </main>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
