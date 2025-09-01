import React, { useState } from 'react';
import './TransactionList.css';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [filterType, setFilterType] = useState('ALL');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Food & Dining': 'fas fa-utensils',
      'Transportation': 'fas fa-car',
      'Shopping': 'fas fa-shopping-bag',
      'Entertainment': 'fas fa-film',
      'Bills & Utilities': 'fas fa-bolt',
      'Healthcare': 'fas fa-heartbeat',
      'Education': 'fas fa-graduation-cap',
      'Travel': 'fas fa-plane',
      'Salary': 'fas fa-briefcase',
      'Freelance': 'fas fa-laptop',
      'Investment': 'fas fa-chart-line',
      'Business': 'fas fa-building',
      'Gift': 'fas fa-gift',
      'Other': 'fas fa-ellipsis-h'
    };
    return icons[category] || 'fas fa-ellipsis-h';
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType === 'ALL') return true;
    return transaction.type === filterType;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDeleteTransaction(id);
    }
  };

  return (
    <div className="transaction-list-container">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="fas fa-list me-2"></i>
              All Transactions
            </h2>
            <div className="btn-group" role="group">
              <input
                type="radio"
                className="btn-check"
                name="filterType"
                id="all"
                value="ALL"
                checked={filterType === 'ALL'}
                onChange={(e) => setFilterType(e.target.value)}
              />
              <label className="btn btn-outline-primary" htmlFor="all">
                All
              </label>

              <input
                type="radio"
                className="btn-check"
                name="filterType"
                id="expense"
                value="EXPENSE"
                checked={filterType === 'EXPENSE'}
                onChange={(e) => setFilterType(e.target.value)}
              />
              <label className="btn btn-outline-danger" htmlFor="expense">
                Expenses
              </label>

              <input
                type="radio"
                className="btn-check"
                name="filterType"
                id="income"
                value="INCOME"
                checked={filterType === 'INCOME'}
                onChange={(e) => setFilterType(e.target.value)}
              />
              <label className="btn btn-outline-success" htmlFor="income">
                Income
              </label>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No transactions found</h4>
              <p className="text-muted">Start by adding your first transaction!</p>
            </div>
          ) : (
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="transaction-row">
                          <td>
                            <span className={`badge ${transaction.type === 'EXPENSE' ? 'bg-danger' : 'bg-success'}`}>
                              <i className={`fas fa-arrow-${transaction.type === 'EXPENSE' ? 'down' : 'up'} me-1`}></i>
                              {transaction.type}
                            </span>
                          </td>
                          <td>
                            <strong>{transaction.description}</strong>
                          </td>
                          <td>
                            <span className="category-badge">
                              <i className={`${getCategoryIcon(transaction.category)} me-2`}></i>
                              {transaction.category}
                            </span>
                          </td>
                          <td>
                            <span className={`amount ${transaction.type === 'EXPENSE' ? 'text-danger' : 'text-success'}`}>
                              {transaction.type === 'EXPENSE' ? '-' : '+'}
                              {formatCurrency(transaction.amount)}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">
                              {formatDate(transaction.date)}
                            </small>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(transaction.id)}
                              title="Delete transaction"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
