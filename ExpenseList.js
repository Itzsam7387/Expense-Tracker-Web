import React from 'react';
import ExpenseItem from './ExpenseItem'; // We will create this

function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p>No expenses recorded yet. Add one above!</p>;
  }

  return (
    <div className="expense-list-container">
      <ul>
        {expenses.map(expense => (
          // Render ExpenseItem for each expense
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;