// This component renders a styled login button with hover animations and a link to the login page.
// It integrates with the authentication context to trigger a login action when clicked.

// Props: None

// Why: This component is designed to provide a visually appealing and interactive login button
// that enhances the user experience and integrates seamlessly with the application's authentication system.

// Key Features:
// - Authentication integration: Calls the `login` function from the authentication context to log in a user.
// - Hover animations: Includes multiple layered animations for a dynamic hover effect.
// - Navigation: Redirects the user to the login page when clicked.

import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary
import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const { login } = useAuth();
  
  const handleLogin = () => {
    login({ name: "Guest User" });
  };
  
  return (
    <>
      <Link to="/login">
        <button
          onClick={handleLogin}
          className="overflow-hidden md:w-26 p-2 md:h-10 sm:w-20 sm:h-9 bg-black text-white border-none rounded-md md:text-lg xs:text-md font-bold cursor-pointer relative z-10 group"
        >
          Login !
          <span
            className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
          ></span>
          <span
            className="absolute w-36 h-32 -top-8 -left-2 bg-c-l-grey rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
          ></span>
          <span
            className="absolute w-36 h-32 -top-8 -left-2 bg-c-d-grey rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"
          ></span>
          <span
            className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute md:top-2.5 md:left-6 xs:top-1 xs:left-2 z-10"
          >
            Login !
          </span>
        </button>
      </Link>
    </>
  );
};

export default LoginButton;