import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TransactionForm.css';

const TransactionForm = ({ onAddTransaction }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    category: ''
  });

  const expenseCategories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ];

  const incomeCategories = [
    'Salary',
    'Freelance',
    'Investment',
    'Business',
    'Gift',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    const transaction = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      description: '',
      amount: '',
      type: 'EXPENSE',
      category: ''
    });
    
    // Navigate back to dashboard
    navigate('/');
  };

  return (
    <div className="transaction-form-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-plus-circle me-2"></i>
                Add New Transaction
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Transaction Type</label>
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="type"
                      id="expense"
                      value="EXPENSE"
                      checked={formData.type === 'EXPENSE'}
                      onChange={handleChange}
                    />
                    <label className="btn btn-outline-danger" htmlFor="expense">
                      <i className="fas fa-arrow-down me-2"></i>
                      Expense
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="type"
                      id="income"
                      value="INCOME"
                      checked={formData.type === 'INCOME'}
                      onChange={handleChange}
                    />
                    <label className="btn btn-outline-success" htmlFor="income">
                      <i className="fas fa-arrow-up me-2"></i>
                      Income
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <i className="fas fa-tag me-1"></i>
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter transaction description"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    <i className="fas fa-dollar-sign me-1"></i>
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    <i className="fas fa-folder me-1"></i>
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {formData.type === 'EXPENSE' 
                      ? expenseCategories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))
                      : incomeCategories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))
                    }
                  </select>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="fas fa-save me-2"></i>
                    Save Transaction
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
