import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2>SkillGap Studio</h2>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/analyzer" style={styles.link}>Skill Analyzer</Link>
            <span style={{ margin: '0 10px', color: '#666' }}>| {user.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#1e293b', color: '#fff' },
  link: { color: '#60a5fa', marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' },
  btn: { padding: '6px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Navbar;