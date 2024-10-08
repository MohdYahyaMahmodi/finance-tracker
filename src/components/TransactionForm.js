import React, { useState } from 'react';

function TransactionForm({ addTransaction, categories, addCategory }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date).toISOString(),
    });
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      addCategory(newCategory);
      setCategory(newCategory);
      setNewCategory('');
    }
  };

  return (
    <div className="bg-dark-surface p-4 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-4 text-dark-text-secondary">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-dark-text-secondary">Type:</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`px-4 py-2 rounded ${type === 'expense' ? 'bg-expense text-dark-text' : 'bg-dark-border text-dark-text-secondary'}`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`px-4 py-2 rounded ${type === 'income' ? 'bg-income text-dark-text' : 'bg-dark-border text-dark-text-secondary'}`}
            >
              Income
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="amount" className="block mb-2 text-dark-text-secondary">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 text-dark-text-secondary">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="newCategory" className="block mb-2 text-dark-text-secondary">Add New Category:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-grow bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
            />
            <button
              onClick={handleAddCategory}
              className="bg-dark-border text-dark-text px-4 py-2 rounded"
              type="button"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-dark-text-secondary">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="date" className="block mb-2 text-dark-text-secondary">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-dark-border text-dark-text font-bold py-2 px-4 rounded hover:bg-dark-text hover:text-dark-bg">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;