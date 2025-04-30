import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-section">
      <div className="login-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="form">
          {!isLogin && (
            <div className="name-fields">
              <div className="floating-label half">
                <input type="text" id="firstName" placeholder=" " required />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="floating-label half">
                <input type="text" id="lastName" placeholder=" " required />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
          )}

          <div className="floating-label">
            <input type="email" id="email" placeholder=" " required />
            <label htmlFor="email">Email</label>
          </div>

          <div className="floating-label">
            <input type="password" id="password" placeholder=" " required />
            <label htmlFor="password">Password</label>
          </div>

          {isLogin && (
            <div className="options">
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button type="submit">{isLogin ? "Login" : "Register"}</button>

          <p>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                  }}
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(true);
                  }}
                >
                  Login
                </a>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
