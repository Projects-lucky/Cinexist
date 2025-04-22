// This file defines the `AuthContext` for managing user authentication state across the application.
// It provides context for login, logout, and error handling, and includes a mock API for demonstration purposes.

// Components and Hooks:
// - AuthProvider: A context provider that wraps the application and provides authentication-related state and functions.
// - useAuth: A custom hook to access the authentication context.

// Props for AuthProvider:
// - children: React components that will have access to the authentication context.

// Why: This context is designed to centralize authentication logic, making it easier to manage user state,
// handle login/logout functionality, and provide error feedback across the application.

// Key Features:
// - Login functionality: Authenticates the user using a mock API and stores user data in localStorage.
// - Logout functionality: Clears user data from state and localStorage.
// - Error handling: Provides error messages for failed login attempts.
// - Navigation: Redirects the user to the home page after a successful login.
// - Mock API: Simulates an authentication API for demonstration purposes.

import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Login function
  const login = async (credentials) => {
    try {
      // Replace with real API call
      const response = await fakeAuthAPI(credentials);
      
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/"); // Redirect to home after login
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API function
const fakeAuthAPI = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "demo" && password === "demo123") {
        resolve({ user: { name: "Demo User" } });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);