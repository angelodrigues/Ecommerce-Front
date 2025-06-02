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
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await fetch('http://localhost:8090/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Erro ao fazer login');
        }

        const data = await response.json();
        login({ email: formData.email, token: data.token });
        navigate('/auth/user');
      } else {
      const response = await fetch('http://localhost:8090/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password
        })
      });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Erro ao registrar usuário');
        }

        alert('Usuário registrado com sucesso!');
        setIsLogin(true);
        setFormData({ email: '', password: '', firstName: '', lastName: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="login-card">
        <h2 className="text-4xl text-white font-inter capitalize p-4 pb-[80px]">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
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
          {loading && <p className="text-white text-sm mt-2">Carregando...</p>}

          {isLogin && (
            <div className="options">
              <a href="#" className="text-lg text-white font-inter capitalize">
                Forgot Password?
              </a>
            </div>
          )}

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

          <p>
            {isLogin ? (
              <>
                <span className="text-lg text-white font-inter">
                  Don't have an account?{' '}
                </span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                    setError('');
                  }}
                  className="text-lg text-white font-inter capitalize"
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
                <span className="text-lg text-white font-inter capitalize">
                  Already have an account?{' '}
                </span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(true);
                    setError('');
                  }}
                  className="text-lg text-white font-inter capitalize"
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
