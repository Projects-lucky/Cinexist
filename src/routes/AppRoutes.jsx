// This component defines the application's routing structure using React Router.
// It includes lazy-loaded routes for better performance and a fallback loader for suspense handling.

// Why: This component is designed to manage navigation across the application, ensuring a seamless user experience
// by organizing routes and protecting specific pages with authentication checks.

// Key Features:
// - Lazy loading: Dynamically loads pages to improve performance and reduce initial load time.
// - Fallback loader: Displays a loading animation (`LoaderAnim`) while lazy-loaded components are being fetched.
// - Protected routes: Restricts access to certain routes (e.g., dashboard, admin panel) using `ProtectedRoutes`.
// - Route definitions: Maps paths to corresponding components, including pages like Home, Search, Categories, etc.
// - 404 handling: Displays the `NotFound` component for undefined routes.
// - Responsive design: Ensures proper navigation across various devices and screen sizes.

import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy-loaded pages for better performance
const HomePage = lazy(() => import('../pages/Home'));
const SearchPage = lazy(() => import('../pages/search'));
const LoginForm = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Categories = lazy(() => import('../pages/categories'));
const PageDetails = lazy(() => import('../pages/details'));
const WatchList = lazy(() => import('../pages/watchList'));
const SignupForm = lazy(() => import('../pages/SignupForm'));
import FallBack from '../components/FallBack';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Suspense fallback={<FallBack/>}>
      <Routes>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/pageDetails/:id" element={<PageDetails />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/admin" element={<div>Admin Panel</div>} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;