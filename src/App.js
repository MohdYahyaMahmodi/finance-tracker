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
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || categories;
    setTransactions(storedTransactions);
    setCategories(storedCategories);
    filterTransactions(storedTransactions, dateRange);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('categories', JSON.stringify(categories));
    filterTransactions(transactions, dateRange);
  }, [transactions, dateRange]);

  const filterTransactions = (transactions, { start, end }) => {
    const filtered = transactions.filter(t => {
      const date = new Date(t.date);
      if (start && end) {
        return date >= start && date <= end;
      } else if (start) {
        return date >= start;
      } else if (end) {
        return date <= end;
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

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard balance={balance} income={income} expense={expense} transactions={filteredTransactions} />
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