import { useState } from "react";

function Login({ goToRegister, goBack }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill in all fields!");
      return;
    }

    alert("Login form submitted!");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>🍕 PizzaHub</h1>
        <h2>Welcome Back!</h2>
        <p>Login to order your favourite pizza.</p>

        <form onSubmit={handleLogin}>

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
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        <p>
          Don't have an account?
          <button type="button" onClick={goToRegister}>
            Register
          </button>
        </p>

        <button type="button" onClick={goBack}>
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Login;