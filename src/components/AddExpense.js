import React, { useState } from "react";
import axios from "axios";

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses",
        { title, amount, date, category },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      onAdd(res.data); // update Dashboard state
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("");
    } catch (err) {
      alert("Error adding expense!");
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;

//Add Expense completed