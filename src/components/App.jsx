// This component serves as the entry point for rendering the application's routes.
// It ensures that all routes are managed in a centralized way using the `AppRoutes` component.
// The `AppRoutes` component handles the routing logic for the application, including lazy-loaded pages and protected routes.

import AppRoutes from '../routes/AppRoutes';

export default function App() {
  // Render the `AppRoutes` component to manage the application's navigation.
  return <AppRoutes />;
}