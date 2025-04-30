import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login-section">
      <div className="login-card">
        <h2>Login</h2>
        <form className="form">
          <div className="floating-label">
            <input type="email" id="email" placeholder=" " required />
            <label htmlFor="email">Email</label>
          </div>

          <div className="floating-label">
            <input type="password" id="password" placeholder=" " required />
            <label htmlFor="password">Password</label>
          </div>

          <div className="options">
            <a href="#">Forgot Password?</a>
          </div>
          <button>Login</button>
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </form>
      </div>
    </div>
  );
}
