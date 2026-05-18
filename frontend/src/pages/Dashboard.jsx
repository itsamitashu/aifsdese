import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/employees`;
      if (departmentFilter) {
        url = `${API_URL}/api/employees/search?department=${departmentFilter}`;
      }
      const res = await axios.get(url);
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [departmentFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_URL}/api/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1>Employee Directory</h1>
      </div>

      <div className="glass-card mb-4 flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select 
            className="form-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Development">Development</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-4"><p>Loading employees...</p></div>
      ) : (
        <div className="grid-container">
          {filteredEmployees.map((emp) => (
            <div key={emp._id} className="glass-card flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <div className="flex justify-between items-center">
                <h3>{emp.name}</h3>
                <span className="badge">{emp.department}</span>
              </div>
              <p className="text-muted text-sm">{emp.email}</p>
              
              <div className="mt-2 grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <p className="text-sm text-gray-400">Experience</p>
                  <p className="font-bold">{emp.experience} years</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <p className="text-sm text-gray-400">Score</p>
                  <p className="font-bold">{emp.performanceScore}/100</p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-400 mb-1">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {emp.skills.map((skill, idx) => (
                    <span key={idx} className="badge" style={{ fontSize: '0.75rem', background: 'rgba(79, 70, 229, 0.4)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button onClick={() => handleDelete(emp._id)} className="btn btn-danger" style={{ padding: '0.5rem' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div className="col-span-full text-center p-4">
              <p>No employees found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
