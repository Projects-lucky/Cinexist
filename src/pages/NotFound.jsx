// This component renders a simple "404 - Page Not Found" page, displayed when a user navigates to a non-existent route.

// Why: This component is designed to inform users that the requested page does not exist, improving user experience
// by providing a clear message and preventing confusion when encountering invalid URLs.

// Key Features:
// - Error message: Displays a prominent "404 - Page Not Found" message.
// - User guidance: Informs users that the page they are looking for does not exist.
// - Responsive design: Ensures the page is properly displayed on various screen sizes.

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-c-d-grey text-c-white">
      <h1 className="text-c-red text-3xl font-semibold">404 - Page Not Found</h1>
      <p className="text-2xl">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;