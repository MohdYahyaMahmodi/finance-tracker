import React, { useState, useEffect } from 'react';

function DateFilter({ setDateRange, transactions }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredIncome, setFilteredIncome] = useState(0);
  const [filteredExpense, setFilteredExpense] = useState(0);

  useEffect(() => {
    if (startDate || endDate) {
      const filtered = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return transactionDate >= start && transactionDate <= end;
      });

      const income = filtered.reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum, 0);
      const expense = filtered.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0);

      setFilteredIncome(income);
      setFilteredExpense(expense);
    } else {
      setFilteredIncome(0);
      setFilteredExpense(0);
    }
  }, [startDate, endDate, transactions]);

  const handleFilter = () => {
    setDateRange({
      start: startDate ? new Date(startDate) : null,
      end: endDate ? new Date(endDate) : null,
    });
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setDateRange({ start: null, end: null });
    setFilteredIncome(0);
    setFilteredExpense(0);
  };

  return (
    <div className="bg-dark-surface p-4 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold mb-4 text-dark-text-secondary">Filter Transactions</h2>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label htmlFor="startDate" className="block text-dark-text-secondary mb-2">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
          />
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
          <label htmlFor="endDate" className="block text-dark-text-secondary mb-2">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-dark-text-secondary">Income: <span className="text-income">${filteredIncome.toFixed(2)}</span></p>
          <p className="text-dark-text-secondary">Expenses: <span className="text-expense">${filteredExpense.toFixed(2)}</span></p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleFilter}
            className="bg-dark-border text-dark-text px-4 py-2 rounded hover:bg-dark-text hover:text-dark-bg"
          >
            Apply Filter
          </button>
          <button
            onClick={handleReset}
            className="bg-dark-border text-dark-text px-4 py-2 rounded hover:bg-dark-text hover:text-dark-bg"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateFilter;