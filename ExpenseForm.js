import React, { useState } from 'react';
import { parse, format, isValid } from 'date-fns'; // Import date-fns functions

function ExpenseForm({ onAddExpense }) {
  const [expenseData, setExpenseData] = useState({
    title: '',
    amount: '',
    date: '', // This will now store the display format (MM/DD/YYYY)
    category: ''
  });
  const [dateError, setDateError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'date') {
      // Attempt to parse the date as MM/DD/YYYY
      const parsedDate = parse(value, 'MM/dd/yyyy', new Date());
      // Check if the parsed date is valid AND if the input string
      // when formatted back, matches the original input, to ensure
      // strict adherence to the MM/DD/YYYY format.
      if (value && !isValid(parsedDate) || (value && format(parsedDate, 'MM/dd/yyyy') !== value)) {
        setDateError('Please enter date in MM/DD/YYYY format.');
      } else {
        setDateError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dateError) {
      alert(dateError);
      return;
    }

    let formattedDateForBackend = null;
    if (expenseData.date) {
      // Parse the MM/DD/YYYY string
      const parsedDate = parse(expenseData.date, 'MM/dd/yyyy', new Date());
      if (isValid(parsedDate)) {
        // Format it to YYYY-MM-DD for the backend (LocalDate)
        formattedDateForBackend = format(parsedDate, 'yyyy-MM-dd');
      } else {
        // Should be caught by dateError, but as a safeguard
        alert("Invalid date entered. Please use MM/DD/YYYY.");
        return;
      }
    }

    const dataToSend = {
      ...expenseData,
      date: formattedDateForBackend // Use the date formatted for backend
    };

    onAddExpense(dataToSend);

    setExpenseData({
      title: '',
      amount: '',
      date: '',
      category: ''
    });
    setDateError('');
  };

  return (
    <div className="expense-form-container">
      <h3>Add New Expense</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={expenseData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expenseData.amount}
          onChange={handleChange}
          step="0.01"
          required
        />
        <input
          type="text" // <--- STILL TEXT INPUT
          name="date"
          placeholder="MM/DD/YYYY" // <--- PLACEHOLDER
          value={expenseData.date}
          onChange={handleChange}
          required
        />
        {dateError && <p style={{ color: 'red', fontSize: '0.8rem', width: '100%' }}>{dateError}</p>}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expenseData.category}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;