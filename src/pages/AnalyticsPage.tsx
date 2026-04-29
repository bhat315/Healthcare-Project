import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, usePatientsStore } from '../store/store';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../styles/Analytics.css';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const patients = usePatientsStore((state) => state.patients);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Sample data generation
  const patientStatusData = [
    { name: 'Active', value: patients.filter((p) => p.status === 'active').length },
    { name: 'Inactive', value: patients.filter((p) => p.status === 'inactive').length },
  ];

  const visitTrendData = [
    { month: 'Jan', visits: 65 },
    { month: 'Feb', visits: 78 },
    { month: 'Mar', visits: 85 },
    { month: 'Apr', visits: 92 },
    { month: 'May', visits: 88 },
    { month: 'Jun', visits: 95 },
  ];

  const appointmentData = [
    { time: '09:00', appointments: 3 },
    { time: '10:00', appointments: 5 },
    { time: '11:00', appointments: 4 },
    { time: '12:00', appointments: 2 },
    { time: '13:00', appointments: 3 },
    { time: '14:00', appointments: 6 },
    { time: '15:00', appointments: 4 },
  ];

  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics Dashboard 📊</h1>
        <p>Healthcare platform insights and metrics</p>
      </div>

      <div className="analytics-grid">
        <div className="card">
          <h2>Patient Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={patientStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {patientStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Monthly Visit Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card full-width">
          <h2>Hourly Appointments Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="metrics-section">
        <h2>Key Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <h3>Total Patients</h3>
              <p className="metric-value">{patients.length}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-content">
              <h3>Active Patients</h3>
              <p className="metric-value">{patients.filter((p) => p.status === 'active').length}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">📅</div>
            <div className="metric-content">
              <h3>Appointments Today</h3>
              <p className="metric-value">{Math.floor(Math.random() * 15) + 5}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">⭐</div>
            <div className="metric-content">
              <h3>Satisfaction Rate</h3>
              <p className="metric-value">94%</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">⏱️</div>
            <div className="metric-content">
              <h3>Avg Visit Duration</h3>
              <p className="metric-value">32 min</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">📈</div>
            <div className="metric-content">
              <h3>Growth (Monthly)</h3>
              <p className="metric-value">+12.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h2>Report Summary</h2>
        <div className="report-content">
          <div className="report-item">
            <h3>Platform Health</h3>
            <p>
              The healthcare platform is operating at optimal efficiency with a 98.5% uptime
              and excellent user satisfaction rates. Patient engagement metrics show a consistent
              upward trend month-over-month.
            </p>
          </div>

          <div className="report-item">
            <h3>Patient Demographics</h3>
            <p>
              Current patient base shows diverse demographics with representation across all age
              groups. The platform effectively serves diverse healthcare needs with specialized
              care pathways for chronic conditions management.
            </p>
          </div>

          <div className="report-item">
            <h3>Service Quality</h3>
            <p>
              Service delivery metrics remain consistently strong with 94% patient satisfaction
              rate. Average appointment duration is optimized for quality care delivery while
              maintaining efficiency in patient throughput.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
