// This component handles route protection by checking if the user is authenticated.
// It ensures that only authenticated users can access certain routes, redirecting unauthenticated users to the login page.

// Why: This component is designed to secure specific parts of the application by restricting access to authenticated users only,
// improving the overall security and user experience.

// Key Features:
// - Authentication check: Verifies if the user is authenticated by checking a value in `localStorage`.
// - Conditional rendering: Renders the protected route's children if the user is authenticated.
// - Redirection: Redirects unauthenticated users to the login page using React Router's `Navigate` component.

import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;