import React from 'react';
import './Summary.css';

const Summary = ({ summary }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    return ((part / total) * 100).toFixed(1);
  };

  const totalCashFlow = summary.totalIncome + summary.totalExpenses;
  const incomePercentage = calculatePercentage(summary.totalIncome, totalCashFlow);
  const expensePercentage = calculatePercentage(summary.totalExpenses, totalCashFlow);

  return (
    <div className="summary-container">
      <div className="row">
        <div className="col-12">
          <h1 className="summary-title">
            <i className="fas fa-chart-pie me-3"></i>
            Financial Summary
          </h1>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-chart-bar me-2"></i>
                Cash Flow Overview
              </h5>
              <div className="cash-flow-stats">
                <div className="stat-item">
                  <div className="stat-label">Total Income</div>
                  <div className="stat-value text-success">
                    {formatCurrency(summary.totalIncome)}
                  </div>
                  <div className="stat-percentage">
                    {incomePercentage}% of total cash flow
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-label">Total Expenses</div>
                  <div className="stat-value text-danger">
                    {formatCurrency(summary.totalExpenses)}
                  </div>
                  <div className="stat-percentage">
                    {expensePercentage}% of total cash flow
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-label">Net Balance</div>
                  <div className={`stat-value ${summary.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatCurrency(summary.balance)}
                  </div>
                  <div className="stat-percentage">
                    {summary.balance >= 0 ? 'Positive' : 'Negative'} cash flow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-percentage me-2"></i>
                Financial Health
              </h5>
              <div className="health-indicators">
                <div className="health-item">
                  <div className="health-label">Savings Rate</div>
                  <div className="health-value">
                    {summary.totalIncome > 0 
                      ? `${calculatePercentage(summary.balance, summary.totalIncome)}%`
                      : '0%'
                    }
                  </div>
                  <div className="health-description">
                    Percentage of income saved
                  </div>
                </div>
                
                <div className="health-item">
                  <div className="health-label">Expense Ratio</div>
                  <div className="health-value">
                    {summary.totalIncome > 0 
                      ? `${calculatePercentage(summary.totalExpenses, summary.totalIncome)}%`
                      : '0%'
                    }
                  </div>
                  <div className="health-description">
                    Percentage of income spent
                  </div>
                </div>
                
                <div className="health-item">
                  <div className="health-label">Financial Status</div>
                  <div className={`health-value ${summary.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                    {summary.balance >= 0 ? 'Healthy' : 'Needs Attention'}
                  </div>
                  <div className="health-description">
                    {summary.balance >= 0 
                      ? 'You are spending within your means'
                      : 'Your expenses exceed your income'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-lightbulb me-2"></i>
                Financial Insights
              </h5>
              <div className="insights">
                {summary.balance >= 0 ? (
                  <div className="insight positive">
                    <i className="fas fa-check-circle me-2"></i>
                    <strong>Great job!</strong> You're maintaining a positive cash flow. 
                    Consider investing your surplus to grow your wealth.
                  </div>
                ) : (
                  <div className="insight negative">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <strong>Attention needed:</strong> Your expenses exceed your income. 
                    Consider reviewing your spending habits and finding ways to increase income or reduce expenses.
                  </div>
                )}
                
                {summary.totalExpenses > 0 && (
                  <div className="insight">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Tip:</strong> Track your expenses regularly to identify spending patterns 
                    and find opportunities to save money.
                  </div>
                )}
                
                {summary.totalIncome === 0 && summary.totalExpenses === 0 && (
                  <div className="insight">
                    <i className="fas fa-plus-circle me-2"></i>
                    <strong>Get started:</strong> Add your first transaction to begin tracking 
                    your financial journey with SpendSmart.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
