import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore, usePatientsStore, Patient } from '../store/store';
import '../styles/Patients.css';

export function PatientsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const patients = usePatientsStore((state) => state.patients);
  const viewMode = usePatientsStore((state) => state.viewMode);
  const setViewMode = usePatientsStore((state) => state.setViewMode);
  const addPatient = usePatientsStore((state) => state.addPatient);
  const updatePatient = usePatientsStore((state) => state.updatePatient);
  const deletePatient = usePatientsStore((state) => state.deletePatient);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    medicalHistory: '',
    status: 'active',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // Load sample data if empty
    if (patients.length === 0) {
      const samplePatients: Patient[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1-555-0101',
          dateOfBirth: '1990-05-15',
          medicalHistory: 'Hypertension, Diabetes',
          status: 'active',
          lastVisit: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1-555-0102',
          dateOfBirth: '1985-08-22',
          medicalHistory: 'Asthma',
          status: 'active',
          lastVisit: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          phone: '+1-555-0103',
          dateOfBirth: '1978-03-10',
          medicalHistory: 'Heart Disease, Obesity',
          status: 'inactive',
          lastVisit: new Date(Date.now() - 259200000).toISOString(),
        },
      ];
      samplePatients.forEach((p) => addPatient(p));
    }
  }, [user, navigate, patients.length, addPatient]);

  if (!user) return null;

  const selectedPatient = id ? patients.find((p) => p.id === id) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updatePatient(editingId, formData);
      setEditingId(null);
    } else {
      const newPatient: Patient = {
        id: Date.now().toString(),
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        dateOfBirth: formData.dateOfBirth || '',
        medicalHistory: formData.medicalHistory || '',
        status: formData.status as 'active' | 'inactive' || 'active',
        lastVisit: new Date().toISOString(),
      };
      addPatient(newPatient);
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      medicalHistory: '',
      status: 'active',
    });
    setShowForm(false);
  };

  const handleEdit = (patient: Patient) => {
    setFormData(patient);
    setEditingId(patient.id);
    setShowForm(true);
  };

  const handleDelete = (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(patientId);
      if (selectedPatient?.id === patientId) {
        navigate('/patients');
      }
    }
  };

  return (
    <div className="patients-container">
      <div className="patients-header">
        <div>
          <h1>Patients Management 👥</h1>
          <p>Total: {patients.length} patients</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞ Grid
            </button>
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ≡ List
            </button>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                name: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                medicalHistory: '',
                status: 'active',
              });
            }}
            className="btn btn-primary"
          >
            + New Patient
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>{editingId ? 'Edit Patient' : 'Add New Patient'}</h2>
          <form onSubmit={handleSubmit} className="patient-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Patient name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="patient@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1-555-0000"
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Medical History</label>
                <textarea
                  value={formData.medicalHistory || ''}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  placeholder="List any medical conditions..."
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Patient' : 'Add Patient'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={`patients-view ${viewMode}`}>
        {viewMode === 'grid' ? (
          <div className="grid-view">
            {patients.map((patient) => (
              <div key={patient.id} className="patient-card">
                <div className="card-header">
                  <h3>{patient.name}</h3>
                  <span className={`status-badge badge-${patient.status}`}>
                    {patient.status === 'active' ? '✓' : '○'}
                  </span>
                </div>
                <div className="card-body">
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{patient.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone:</span>
                    <span className="value">{patient.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">DOB:</span>
                    <span className="value">{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Medical History:</span>
                    <span className="value">{patient.medicalHistory}</span>
                  </div>
                </div>
                <div className="card-footer">
                  <button onClick={() => handleEdit(patient)} className="btn-action btn-edit">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(patient.id)} className="btn-action btn-delete">
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="btn-action btn-view"
                  >
                    👁️ View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="list-view">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date of Birth</th>
                  <th>Medical History</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="name-cell">{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phone}</td>
                    <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                    <td className="history-cell">{patient.medicalHistory}</td>
                    <td>
                      <span className={`badge badge-${patient.status}`}>
                        {patient.status === 'active' ? '✓ Active' : '○ Inactive'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(patient)} className="btn-sm btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(patient.id)} className="btn-sm btn-delete">
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/patients/${patient.id}`)}
                        className="btn-sm btn-view"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedPatient && (
        <div className="patient-details-modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => navigate('/patients')}>
              ×
            </button>
            <h2>{selectedPatient.name}</h2>
            <div className="details-grid">
              <div><strong>Email:</strong> {selectedPatient.email}</div>
              <div><strong>Phone:</strong> {selectedPatient.phone}</div>
              <div><strong>Date of Birth:</strong> {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</div>
              <div><strong>Status:</strong> <span className={`badge badge-${selectedPatient.status}`}>{selectedPatient.status}</span></div>
              <div><strong>Medical History:</strong> {selectedPatient.medicalHistory}</div>
              <div><strong>Last Visit:</strong> {new Date(selectedPatient.lastVisit).toLocaleString()}</div>
            </div>
            <button onClick={() => navigate('/patients')} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientsPage;
