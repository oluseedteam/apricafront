import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@user.com' && password === 'qwerty') {
      onClose();
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="bg-white w-full max-w-[400px] p-10 rounded-xl shadow-lg relative text-center">

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-500 hover:text-black text-2xl leading-none transition-colors"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Header */}
      <h1 className="text-3xl font-medium text-gray-900 mb-3">Log in or sign up</h1>
      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
        Welcome back to Apricafront.
      </p>

      {/* Social Buttons */}
      <div className="flex flex-col gap-3">
        {/* Google */}
        <button className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-full bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Apple */}
        <button className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-full bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="black">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.79.05 1.97-.67 3.28-.59 1.1.06 2.3.45 3.1 1.56-2.8 1.63-2.3 5.38.45 6.54-.53 1.58-1.25 3.14-1.91 4.68zM13 3.5c.54-1.38 1.88-2.4 3.25-2.5.25 1.56-1.11 3.21-2.58 3.28-.68-.02-1.35-.37-1.67-.78z"/>
          </svg>
          Continue with Apple
        </button>

        {/* Microsoft */}
        <button className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-full bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z"/>
            <path fill="#81bc06" d="M12 1h10v10H12z"/>
            <path fill="#05a6f0" d="M1 12h10v10H1z"/>
            <path fill="#ffba08" d="M12 12h10v10H12z"/>
          </svg>
          Continue with Microsoft
        </button>

        {/* Phone */}
        <button className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-full bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Continue with phone
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center my-6 text-gray-500 text-xs font-medium uppercase">
        <div className="flex-1 border-b border-gray-200"></div>
        <span className="px-3">OR</span>
        <div className="flex-1 border-b border-gray-200"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email address" 
          className="w-full p-4 border border-gray-300 rounded-[30px] text-base mb-3 focus:outline-none focus:border-black transition-colors"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 border border-gray-300 rounded-[30px] text-base mb-3 focus:outline-none focus:border-black transition-colors"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit" 
          className="w-full p-4 mt-2 bg-[#111] text-white rounded-full font-semibold text-base hover:bg-[#333] transition-colors"
        >
          Continue
        </button>
      </form>

      {/* Switch to Signup */}
      <div className="mt-6 text-sm text-gray-500">
        Don't have an account?{' '}
        <button 
          onClick={onSwitchToSignup} 
          className="text-black font-semibold hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;