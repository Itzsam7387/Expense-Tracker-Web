import React from 'react';

function ExpenseItem({ expense }) {
  return (
    <li className="expense-item">
      <div>
        <strong>{expense.title}</strong> - ${expense.amount ? expense.amount.toFixed(2) : '0.00'}
      </div>
      <div>
        Date: {expense.date} | Category: {expense.category}
      </div>
    </li>
  );
}

export default ExpenseItem;