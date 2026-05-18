import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, TrendingUp, Award, BookOpen, MessageSquare } from 'lucide-react';

const AIRecommendations = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [actionType, setActionType] = useState('feedback');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch employees to populate dropdown
    const fetchEmployees = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/employees`);
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleGenerate = async () => {
    if (!selectedEmployee && actionType !== 'ranking') {
      setError('Please select an employee.');
      return;
    }

    setError('');
    setRecommendation('');
    setLoading(true);

    let payloadEmployees = [];
    if (actionType === 'ranking') {
      payloadEmployees = employees; // Send all for ranking
    } else {
      const emp = employees.find(e => e._id === selectedEmployee);
      if (emp) payloadEmployees.push(emp);
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/ai/recommend`, {
        employees: payloadEmployees,
        actionType
      });
      setRecommendation(res.data.recommendation);
    } catch (err) {
      setError(err.response?.data?.message || 'Error generating recommendation');
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <h1>AI Insights & Recommendations</h1>

      <div className="grid-container" style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Controls */}
        <div className="glass-card h-fit">
          <h3 className="flex items-center gap-2 mb-4">
            <Sparkles size={20} color="var(--warning-color)" />
            Query Settings
          </h3>

          <div className="form-group">
            <label className="form-label">Analysis Type</label>
            <select 
              className="form-select" 
              value={actionType} 
              onChange={(e) => {
                setActionType(e.target.value);
                setRecommendation('');
              }}
            >
              <option value="feedback">Performance Feedback</option>
              <option value="promotion">Promotion Viability</option>
              <option value="training">Training Suggestions</option>
              <option value="ranking">Team Ranking (All Employees)</option>
            </select>
          </div>

          {actionType !== 'ranking' && (
            <div className="form-group">
              <label className="form-label">Select Employee</label>
              <select 
                className="form-select" 
                value={selectedEmployee} 
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">-- Choose Employee --</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id}>{emp.name} ({emp.department})</option>
                ))}
              </select>
            </div>
          )}

          <button 
            className="btn btn-primary w-full mt-4" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Analyzing Data...' : 'Generate Insights'}
          </button>
          
          {error && <div className="alert alert-error mt-4">{error}</div>}
        </div>

        {/* Results */}
        <div className="glass-card">
          <h3 className="mb-4 text-gray-300 flex items-center gap-2">
            {actionType === 'promotion' && <TrendingUp size={20} />}
            {actionType === 'ranking' && <Award size={20} />}
            {actionType === 'training' && <BookOpen size={20} />}
            {actionType === 'feedback' && <MessageSquare size={20} />}
            Analysis Result
          </h3>
          
          <div style={{ 
            background: 'rgba(0,0,0,0.2)', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            minHeight: '200px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.8'
          }}>
            {loading ? (
              <div className="flex items-center justify-center h-full text-muted">
                <Sparkles className="animate-pulse" size={40} />
                <span className="ml-2">AI is thinking...</span>
              </div>
            ) : recommendation ? (
              recommendation
            ) : (
              <div className="text-muted text-center italic mt-10">
                Configure settings and click generate to see AI insights here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
