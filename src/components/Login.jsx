import React from 'react';
import {RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import LogoSignup from '../assets/LogoSignup.png';
import { useNavigate } from 'react-router-dom';
import Background from './Background';

const Login = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  // In your Login component
const handleLogin = () => {
  if (username === 'Arvin' && password === '12345') {
    localStorage.setItem('userToken', 'exampleToken');
    localStorage.setItem('username', username);
    localStorage.setItem('email', 'user@example.com'); // Replace with actual email
    setIsLoggedIn(true);
    navigate('/successful-login');
  } else {
    alert('Invalid login credentials');
  }
};

  return (
    <Background>
    <div className="min-h-full w-full flex items-center justify-center">
      <div className="w-full h-full max-w-md p- mx-4">
        <div className="text-center mb-8">
          <img src={LogoSignup} alt="Blood Bank Logo" className="mx-auto w-32 h-32 mb-2" />
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username or Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
              <span className="ml-2 text-sm text-gray-600 font-bold">Remember Me</span>
            </label>
            <button
              type="button"
              className="text-sm text-red-600 hover:text-red-700"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            LOGIN
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600 font-bold">Don't have an account yet? </span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
    </Background>
  );
};

export default Login;
