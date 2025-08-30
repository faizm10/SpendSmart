'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  transactionDate: string;
  notes?: string;
  category?: {
    id: number;
    name: string;
    colorHex: string;
  };
}

interface Category {
  id: number;
  name: string;
  colorHex: string;
  iconName: string;
}

interface Budget {
  id: number;
  name: string;
  amount: number;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  isActive: boolean;
  category?: {
    id: number;
    name: string;
  };
}

interface TransactionTotals {
  income: number;
  expenses: number;
  balance: number;
}

const API_BASE_URL = 'http://localhost:8080/api';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [totals, setTotals] = useState<TransactionTotals>({ income: 0, expenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Demo user ID (from the data initializer)
  const DEMO_USER_ID = 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch user data
      const userResponse = await fetch(`${API_BASE_URL}/users/${DEMO_USER_ID}`);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      }

      // Fetch transactions
      const transactionsResponse = await fetch(`${API_BASE_URL}/transactions/user/${DEMO_USER_ID}`);
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
      }

      // Fetch categories
      const categoriesResponse = await fetch(`${API_BASE_URL}/categories/user/${DEMO_USER_ID}`);
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      }

      // Fetch budgets
      const budgetsResponse = await fetch(`${API_BASE_URL}/budgets/user/${DEMO_USER_ID}/active`);
      if (budgetsResponse.ok) {
        const budgetsData = await budgetsResponse.json();
        setBudgets(budgetsData);
      }

      // Fetch totals
      const totalsResponse = await fetch(`${API_BASE_URL}/transactions/user/${DEMO_USER_ID}/totals`);
      if (totalsResponse.ok) {
        const totalsData = await totalsResponse.json();
        setTotals(totalsData);
      }

    } catch (err) {
      setError('Failed to fetch data from backend');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'INCOME':
        return 'text-green-600';
      case 'EXPENSE':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading SpendSmart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Make sure the backend is running on http://localhost:8080</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SpendSmart</h1>
              <p className="text-gray-600">Smart financial management</p>
            </div>
            {user && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.income)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totals.expenses)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                <p className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totals.balance)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            </div>
            <div className="p-6">
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No transactions found</p>
              ) : (
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: transaction.category?.colorHex || '#6B7280' }}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.category?.name || 'Uncategorized'} • {formatDate(transaction.transactionDate)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${getTransactionTypeColor(transaction.type)}`}>
                          {transaction.type === 'EXPENSE' ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{transaction.type.toLowerCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active Budgets */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Active Budgets</h2>
            </div>
            <div className="p-6">
              {budgets.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No active budgets</p>
              ) : (
                <div className="space-y-4">
                  {budgets.map((budget) => (
                    <div key={budget.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{budget.name}</p>
                          <p className="text-sm text-gray-500">
                            {budget.category?.name || 'General'} • {budget.period.toLowerCase()}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">
                          {formatCurrency(budget.amount)}
                        </span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          </div>
          <div className="p-6">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No categories found</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: category.colorHex }}
                    ></div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
