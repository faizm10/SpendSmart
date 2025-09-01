import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ summary }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-12">
          <h1 className="dashboard-title">
            <i className="fas fa-chart-line me-3"></i>
            Financial Dashboard
          </h1>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card summary-card income-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-success">
                    <i className="fas fa-arrow-up me-2"></i>
                    Total Income
                  </h5>
                  <h3 className="card-text text-success">
                    {formatCurrency(summary.totalIncome)}
                  </h3>
                </div>
                <div className="summary-icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card summary-card expense-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-danger">
                    <i className="fas fa-arrow-down me-2"></i>
                    Total Expenses
                  </h5>
                  <h3 className="card-text text-danger">
                    {formatCurrency(summary.totalExpenses)}
                  </h3>
                </div>
                <div className="summary-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card summary-card ${summary.balance >= 0 ? 'balance-positive' : 'balance-negative'}`}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">
                    <i className="fas fa-balance-scale me-2"></i>
                    Current Balance
                  </h5>
                  <h3 className={`card-text ${summary.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatCurrency(summary.balance)}
                  </h3>
                </div>
                <div className="summary-icon">
                  <i className="fas fa-wallet"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-bolt me-2"></i>
                Quick Actions
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <Link to="/add" className="btn btn-primary btn-lg w-100 mb-3">
                    <i className="fas fa-plus me-2"></i>
                    Add New Transaction
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link to="/transactions" className="btn btn-outline-primary btn-lg w-100 mb-3">
                    <i className="fas fa-list me-2"></i>
                    View All Transactions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
