import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard({ balance = 0, income = 0, expense = 0, transactions = [] }) {
  const chartData = [
    { name: 'Income', amount: income },
    { name: 'Expense', amount: expense },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark-surface p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 text-dark-text-secondary">Current Balance</h3>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
            ${Math.abs(balance).toFixed(2)}
          </p>
        </div>
        <div className="bg-dark-surface p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 text-dark-text-secondary">Total Income</h3>
          <p className="text-3xl font-bold text-income">${income.toFixed(2)}</p>
        </div>
        <div className="bg-dark-surface p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 text-dark-text-secondary">Total Expense</h3>
          <p className="text-3xl font-bold text-expense">${expense.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-dark-surface p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-dark-text-secondary">Financial Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#AAAAAA" />
            <YAxis stroke="#AAAAAA" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Bar dataKey="amount" fill={(entry) => entry.name === 'Income' ? '#4CAF50' : '#F44336'} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;