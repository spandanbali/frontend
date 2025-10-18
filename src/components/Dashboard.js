import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExpenseItem from "./ExpenseItem";
import AddExpense from "./AddExpense";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  // Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Delete an expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Add new expense to list
  const handleAdd = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  // Update an existing expense
  const handleUpdate = (updatedExpense) => {
    setExpenses(
      expenses.map((exp) =>
        exp._id === updatedExpense._id ? updatedExpense : exp
      )
    );
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login"); // redirect to login
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>
        Logout
      </button>
      <AddExpense onAdd={handleAdd} />
      <h3>All Expenses</h3>
      {expenses.length === 0 && <p>No expenses yet.</p>}
      {expenses.map((exp) => (
        <ExpenseItem
          key={exp._id}
          expense={exp}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default Dashboard;

//Dashboard completed