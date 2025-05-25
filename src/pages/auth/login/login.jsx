import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../authCheck/AuthContext';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (formData.email === 'angelo@gmail.com' && formData.password === '12345') {
        login({ name: 'Angelo', email: formData.email });
        setTimeout(() => navigate('/auth/user'), 0);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Handle registration logic here
      console.log('Registration data:', formData);
    }
  };

  return (
    <div className="login-section">
      <div className="login-card">
        <h2 className='text-4xl text-white font-inter capitalize p-4 pb-[80px]'>{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="p-4 form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="name-fields">
              <div className="floating-label half">
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder=" " 
                  required 
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="floating-label half">
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder=" " 
                  required 
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
          )}

          <div className="floating-label">
            <input 
              type="email" 
              id="email" 
              placeholder=" " 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="floating-label">
            <input 
              type="password" 
              id="password" 
              placeholder=" " 
              required 
              value={formData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
                    setError('');
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
                    setError('');
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
