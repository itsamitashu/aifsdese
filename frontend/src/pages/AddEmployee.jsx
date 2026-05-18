import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    skills: '',
    performanceScore: 0,
    experience: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Format skills to array
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);

    if (skillsArray.length === 0) {
      setError('Please provide at least one skill.');
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/employees`, {
        ...formData,
        skills: skillsArray,
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      });
      setSuccess('Employee added successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding employee');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Register New Employee</h1>
      
      <div className="glass-card">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="grid-container" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-input" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email" 
              className="form-input" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <select 
              name="department" 
              className="form-select" 
              value={formData.department} 
              onChange={handleChange}
              required
            >
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Development">Development</option>
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Skills (comma separated)</label>
            <input 
              type="text" 
              name="skills" 
              className="form-input" 
              placeholder="e.g. React, Node.js, MongoDB"
              value={formData.skills} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Performance Score (0-100)</label>
            <input 
              type="number" 
              name="performanceScore" 
              className="form-input" 
              min="0" max="100"
              value={formData.performanceScore} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input 
              type="number" 
              name="experience" 
              className="form-input" 
              min="0"
              value={formData.experience} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary w-full">
              <Save size={20} />
              Save Employee Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
