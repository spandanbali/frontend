import React, { useState } from "react";
import axios from "axios";

const EditExpense = ({ expense, onUpdate, onClose }) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(expense.date.split("T")[0]); // format date
  const [category, setCategory] = useState(expense.category);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/expenses/${expense._id}`,
        { title, amount, date, category },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      onUpdate(res.data); // update Dashboard
      onClose(); // close edit form
    } catch (err) {
      console.log(err);
      alert("Error updating expense!");
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h4>Edit Expense</h4>
      <form onSubmit={handleUpdate}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} required />
        <input value={date} type="date" onChange={(e) => setDate(e.target.value)} required />
        <input value={category} onChange={(e) => setCategory(e.target.value)} required />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditExpense;

//Edit done
