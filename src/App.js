import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import DateFilter from './components/DateFilter';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [categories, setCategories] = useState(['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Healthcare', 'Other']);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
    filterTransactions(transactions, dateRange);
  }, [transactions, categories, dateRange]);

  const loadData = () => {
    const jsonData = localStorage.getItem('financeTrackerData');
    if (jsonData) {
      const data = JSON.parse(jsonData);
      setTransactions(data.transactions || []);
      setCategories(data.categories || categories);
    }
  };

  const saveData = () => {
    const data = {
      transactions: transactions,
      categories: categories
    };
    localStorage.setItem('financeTrackerData', JSON.stringify(data));
  };

  const filterTransactions = (transactions, { start, end }) => {
    const filtered = transactions.filter(t => {
      const date = new Date(t.date);
      if (start && end) {
        return date >= new Date(start) && date <= new Date(end);
      } else if (start) {
        return date >= new Date(start);
      } else if (end) {
        return date <= new Date(end);
      }
      return true;
    });
    setFilteredTransactions(filtered);
    calculateFinancials(filtered);
  };

  const calculateFinancials = (transactions) => {
    const { balance, income, expense } = transactions.reduce((acc, t) => {
      if (t.type === 'income') {
        acc.balance += t.amount;
        acc.income += t.amount;
      } else {
        acc.balance -= t.amount;
        acc.expense += t.amount;
      }
      return acc;
    }, { balance: 0, income: 0, expense: 0 });

    setBalance(balance);
    setIncome(income);
    setExpense(expense);
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (editedTransaction) => {
    setTransactions(transactions.map(t => t.id === editedTransaction.id ? editedTransaction : t));
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const exportData = () => {
    const data = {
      transactions: transactions,
      categories: categories
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'finance_tracker_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setTransactions(data.transactions || []);
        setCategories(data.categories || categories);
        saveData(); // Save imported data to localStorage
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        alert('Error importing data. Please make sure the file is a valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard balance={balance} income={income} expense={expense} transactions={filteredTransactions} />
        <div className="mb-8 flex justify-between items-center">
          <button onClick={exportData} className="bg-dark-border text-dark-text px-4 py-2 rounded hover:bg-dark-text hover:text-dark-bg">
            Export Data
          </button>
          <div>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              style={{ display: 'none' }}
              id="import-json"
            />
            <label htmlFor="import-json" className="bg-dark-border text-dark-text px-4 py-2 rounded hover:bg-dark-text hover:text-dark-bg cursor-pointer">
              Import Data
            </label>
          </div>
        </div>
        <DateFilter setDateRange={setDateRange} transactions={transactions} />
        <TransactionForm addTransaction={addTransaction} categories={categories} addCategory={addCategory} />
        <TransactionList 
          transactions={filteredTransactions} 
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
          categories={categories}
        />
      </main>
    </div>
  );
}

export default App;