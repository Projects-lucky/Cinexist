// This component renders the "Login" page, allowing users to log in to their accounts.
// It includes a login form, social login options, and a link to the signup page for new users.

// Why: This component is designed to provide a user-friendly interface for logging in,
// ensuring a seamless authentication experience with validation and social login options.

// Key Features:
// - Login form: Includes fields for email and password with validation.
// - Social login options: Provides buttons for logging in with Google, Apple, and Twitter.
// - Terms and conditions: Requires users to agree to the terms and conditions before logging in.
// - Signup link: Redirects users to the signup page if they don't have an account.
// - Responsive design: Adapts to various screen sizes for an optimal user experience.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordMobilePhone } from "react-icons/tb";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Log in to continue your journey
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <MdOutlineAlternateEmail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <TbPasswordMobilePhone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Social Login Options */}
          <div className="flex justify-between gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-1.01 7.28-2.74l-3.57-2.77c-1.02.68-2.32 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.36 7.77 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4.01 3.64 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#000"
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.58 8 8 8v-4h-2v-2h2v-1c0-1.1.9-2 2-2h2v2h-2v1h2v4c4.42 0 8-3.58 8-8 0-5.52-4.48-10-10-10zm1.5 12h-3v-2h3v2zm0-4h-3V8h3v2z"
                />
              </svg>
              Apple
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#1DA1F2"
                  d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.6 8.6 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.15 12.15 0 013.77 4.82a4.28 4.28 0 001.33 5.71 4.26 4.26 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.19 4.28 4.28 0 01-1.93.07 4.28 4.28 0 004 2.98A8.58 8.58 0 012 19.54a12.12 12.12 0 006.58 1.93c7.9 0 12.22-6.54 12.22-12.22 0-.19 0-.37-.01-.55A8.73 8.73 0 0022.46 6z"
                />
              </svg>
              More
            </button>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;