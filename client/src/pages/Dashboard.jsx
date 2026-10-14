import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get('/applications');
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/applications', { company, position });
      setCompany('');
      setPosition('');
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/applications/${id}`);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>
      <h1>Welcome, {user?.name}!</h1>
      <p><strong>Your Skill Profile:</strong> {user?.skills?.join(', ')}</p>

      <div style={{ background: '#f3f4f6', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
        <h3>Track New Job Application</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required style={{ flex: 1, padding: '8px' }} />
          <input type="text" placeholder="Role/Position" value={position} onChange={(e) => setPosition(e.target.value)} required style={{ flex: 1, padding: '8px' }} />
          <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none' }}>Add</button>
        </form>
      </div>

      <h3>Your Applications</h3>
      {applications.length === 0 ? <p>No applications logged yet.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {applications.map((app) => (
            <li key={app._id} style={{ padding: '12px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{app.position}</strong> at {app.company} 
                <span style={{ marginLeft: '10px', padding: '2px 6px', background: '#e5e7eb', borderRadius: '4px' }}>{app.status}</span>
              </div>
              <button onClick={() => handleDelete(app._id)} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;