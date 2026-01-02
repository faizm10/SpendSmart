import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  });
  const [userId] = useState('user123'); // For demo purposes, in real app this would come from auth

  const API_BASE_URL = 'http://localhost:8080/api';

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions?userId=${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/summary?userId=${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...transaction, userId }),
      });
      
      if (response.ok) {
        await fetchTransactions();
        await fetchSummary();
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchTransactions();
        await fetchSummary();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard summary={summary} />} />
          <Route path="/add" element={<TransactionForm onAddTransaction={addTransaction} />} />
          <Route path="/transactions" element={<TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />} />
          <Route path="/summary" element={<Summary summary={summary} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
