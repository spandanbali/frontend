import React, { useState } from "react";
import EditExpense from "./EditExpense";

const ExpenseItem = ({ expense, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      {isEditing ? (
        <EditExpense
          expense={expense}
          onUpdate={onUpdate}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h4>{expense.title}</h4>
          <p>Amount: ${expense.amount}</p>
          <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
          <p>Category: {expense.category}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(expense._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ExpenseItem;
