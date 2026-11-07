import { useState } from "react";

function Register({ goToLogin, goBack }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    alert("Registration form submitted!");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>🍕 PizzaHub</h1>
        <h2>Create Account</h2>
        <p>Join PizzaHub and order your favourite pizza!</p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Create Account</button>

        </form>

        <p>
          Already have an account?
          <button type="button" onClick={goToLogin}>
            Login
          </button>
        </p>

        <button type="button" onClick={goBack}>
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Register;