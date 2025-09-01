import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-wallet me-2"></i>
          SpendSmart
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-chart-line me-1"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                <i className="fas fa-plus me-1"></i>
                Add Transaction
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transactions">
                <i className="fas fa-list me-1"></i>
                All Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary">
                <i className="fas fa-chart-pie me-1"></i>
                Summary
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
