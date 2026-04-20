import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdList, 
  MdAddCircleOutline, 
  MdAccountBalanceWallet, 
  MdInsertChartOutlined,
  MdMenu,
  MdClose
} from 'react-icons/md';
import './Layout.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { path: '/transactions', label: 'Transactions', icon: <MdList /> },
  { path: '/transactions/new', label: 'Add Transaction', icon: <MdAddCircleOutline /> },
  { path: '/budget', label: 'Budget', icon: <MdAccountBalanceWallet /> },
  { path: '/analytics', label: 'Analytics', icon: <MdInsertChartOutlined /> },
];

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="logo">
          <span className="logo-icon">💸</span>
          <h2>FinanceApp</h2>
        </div>
        <button className="btn-icon" onClick={toggleSidebar}>
          {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`sidebar glass-panel ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="logo-icon">💸</span>
          <h2>FinanceApp</h2>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
