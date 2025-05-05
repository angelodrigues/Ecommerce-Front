import { useState } from 'react';
import './login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-section">
      <div className="login-card">
        <h2 className='text-4xl text-white font-inter capitalize p-4 pb-[80px]'>{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="p-4 form">
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
              <a href="#" className='text-lg text-white font-inter capitalize'>Forgot Password?</a>
            </div>
          )}

          <button type="submit">{isLogin ? "Login" : "Register"}</button>

          <p>
            {isLogin ? (
              <>
                  <span className="text-lg text-white font-inter">
                    Don't have an account?{" "}
                  </span>                
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                  }}

                  className='text-lg text-white font-inter capitalize'
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
                <span className='text-lg text-white font-inter capitalize'>
                    Already have an account?{" "}
                </span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(true);
                  }}

                  className='text-lg text-white font-inter capitalize'
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
