import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login-section">
      <div className="login-card">
        <h2>Login</h2>
        <form className="form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
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
