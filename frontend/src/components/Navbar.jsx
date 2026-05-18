import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Users, UserPlus, BrainCircuit, LogOut } from 'lucide-react';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar animate-fade-in">
      <Link to="/" className="nav-brand">
        <Users size={28} color="var(--primary-color)" />
        HR Core
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          Directory
        </Link>
        <Link to="/add-employee" className={`nav-link ${isActive('/add-employee')}`}>
          <UserPlus size={18} className="inline mr-1" />
          Add Employee
        </Link>
        <Link to="/ai-recommendations" className={`nav-link ${isActive('/ai-recommendations')}`}>
          <BrainCircuit size={18} className="inline mr-1" />
          AI Insights
        </Link>
        
        <div className="flex items-center gap-4 ml-4 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)'}}>
          <span className="text-sm text-gray-300">{user?.email}</span>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
