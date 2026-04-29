import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, usePatientsStore } from '../store/store';
import StatCard from '../components/StatCard';
import '../styles/Dashboard.css';

export function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const patients = usePatientsStore((state) => state.patients);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const stats = [
    { icon: '👥', label: 'Total Patients', value: patients.length },
    { icon: '✅', label: 'Active Patients', value: patients.filter((p) => p.status === 'active').length },
    { icon: '📋', label: 'Appointments', value: Math.floor(Math.random() * 20) + 10 },
    { icon: '📊', label: 'Avg Rating', value: '4.8' },
  ];

  const recentPatients = patients.slice(-5).reverse();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.displayName}! </h1>
          <p>Here's your healthcare platform overview</p>
        </div>
        <button onClick={() => navigate('/patients')} className="btn btn-primary">
          + Add Patient
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-content">
        <section className="recent-section">
          <h2>Recent Patients</h2>
          {recentPatients.length > 0 ? (
            <div className="patients-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Last Visit</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="patient-name">{patient.name}</td>
                      <td>{patient.email}</td>
                      <td>
                        <span className={`badge badge-${patient.status}`}>
                          {patient.status === 'active' ? '✓ Active' : '○ Inactive'}
                        </span>
                      </td>
                      <td>{new Date(patient.lastVisit).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/patients/${patient.id}`)}
                          className="btn-link"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>📭 No patients yet. Start by adding a new patient!</p>
              <button onClick={() => navigate('/patients')} className="btn btn-secondary">
                Add First Patient
              </button>
            </div>
          )}
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate('/analytics')}>
              <span>📊</span>
              <div>
                <h3>Analytics</h3>
                <p>View health insights</p>
              </div>
            </button>
            <button className="action-btn" onClick={() => navigate('/patients')}>
              <span>👥</span>
              <div>
                <h3>Manage Patients</h3>
                <p>View all patients</p>
              </div>
            </button>
            <button className="action-btn" onClick={() => {
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((registration) => {
                  registration.active?.postMessage({ type: 'SHOW_NOTIFICATION' });
                });
              }
            }}>
              <span>🔔</span>
              <div>
                <h3>Send Notification</h3>
                <p>Test notifications</p>
              </div>
            </button>
            <button className="action-btn" onClick={() => navigate('/login')}>
              <span>🚪</span>
              <div>
                <h3>Logout</h3>
                <p>Exit platform</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
