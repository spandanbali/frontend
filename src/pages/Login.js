import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", res.data.token); 

      alert("Login successful!");
      navigate("/dashboard"); // redirect to Dashboard
    } catch (err) {
      alert("Login failed!");
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
