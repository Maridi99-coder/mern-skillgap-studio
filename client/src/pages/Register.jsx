import React, { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState('React, Node.js, Express, MongoDB, JavaScript');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skills.split(',').map(s => s.trim());
      const res = await API.post('/auth/register', { name, email, password, skills: skillsArray });
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} style={inputStyle} />
        <button type="submit" style={btnStyle}>Register</button>
      </form>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', cursor: 'pointer' };

export default Register;