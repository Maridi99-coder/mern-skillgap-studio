import React, { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const SkillAnalyzer = () => {
  const { user } = useContext(AuthContext);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/skills/analyze', {
        jobDescription,
        userSkills: user?.skills || []
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>
      <h2>Job Description & Skill Gap Analyzer</h2>
      <p>Analyze how well your current skills match any target job opening.</p>
      
      <form onSubmit={handleAnalyze}>
        <textarea
          rows="7"
          placeholder="Paste Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
          {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '25px', padding: '20px', border: '1px solid #d1d5db', borderRadius: '8px', background: '#f9fafb' }}>
          <h3 style={{ margin: 0 }}>Match Score: <span style={{ color: result.matchScore >= 70 ? 'green' : 'orange' }}>{result.matchScore}%</span></h3>
          <p><strong>Matched Skills:</strong> {result.matchedSkills.join(', ') || 'None'}</p>
          <p><strong>Missing Skills:</strong> {result.missingSkills.join(', ') || 'None'}</p>
          <p style={{ fontStyle: 'italic', color: '#374151' }}><strong>Recommendation:</strong> {result.recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default SkillAnalyzer;