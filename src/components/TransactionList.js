import React, { useState } from 'react';

function TransactionList({ transactions, deleteTransaction, editTransaction, categories }) {
  const [editingId, setEditingId] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({});

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditedTransaction(transaction);
  };

  const handleSave = () => {
    editTransaction(editedTransaction);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="bg-dark-surface p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-dark-text-secondary">Transaction History</h2>
      <ul className="divide-y divide-dark-border">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-4">
            {editingId === transaction.id ? (
              <div className="flex flex-col space-y-2">
                <select
                  value={editedTransaction.type}
                  onChange={(e) => setEditedTransaction({ ...editedTransaction, type: e.target.value })}
                  className="bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <input
                  type="number"
                  value={editedTransaction.amount}
                  onChange={(e) => setEditedTransaction({ ...editedTransaction, amount: parseFloat(e.target.value) })}
                  className="bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
                />
                <select
                  value={editedTransaction.category}
                  onChange={(e) => setEditedTransaction({ ...editedTransaction, category: e.target.value })}
                  className="bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={editedTransaction.description}
                  onChange={(e) => setEditedTransaction({ ...editedTransaction, description: e.target.value })}
                  className="bg-dark-bg text-dark-text border border-dark-border rounded px-3 py-2"
                  placeholder="Description"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSave} className="bg-income text-dark-text px-3 py-1 rounded">Save</button>
                  <button onClick={handleCancel} className="bg-expense text-dark-text px-3 py-1 rounded">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-dark-text">{transaction.category}</span>
                  <p className="text-sm text-dark-text-secondary">{transaction.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={transaction.type === 'income' ? 'text-income' : 'text-expense'}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="text-dark-text-secondary hover:text-dark-text"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-expense hover:text-dark-text"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;