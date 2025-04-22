// This component renders a user profile dropdown menu with options for viewing profile settings and logging out.
// It includes interactive hover effects, dropdown functionality, and accessibility features.

// Props: None

// Why: This component is designed to enhance the user experience by providing a convenient and interactive way
// for users to access their profile settings and log out of the application.

// Key Features:
// - User information: Displays the user's name and email in the dropdown menu.
// - Profile settings link: Provides a link to navigate to the profile settings page.
// - Logout functionality: Allows users to log out of the application.
// - Dropdown toggle: Opens and closes the dropdown menu when the profile button is clicked.
// - Outside click handling: Closes the dropdown menu when clicking outside of it.
// - Responsive design: Adapts to various screen sizes and layouts.

import { RiUser6Fill, RiLogoutCircleRLine } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown}
                className="w-10 h-10 flex justify-center items-center p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="User profile"
                aria-expanded={isOpen}
            >
                <RiUser6Fill className="text-2xl text-white" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-c-d-grey rounded-md shadow-lg py-1 z-50 shadow-c-black/50">
                    <div className="px-4 py-2 border-b border-c-l-grey">
                        <p className="text-sm text-white font-medium">
                            {user?.name || "Guest"}
                        </p>
                        <p className="text-xs text-gray-400">
                            {user?.email || ""}
                        </p>
                    </div>
                    
                    <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-white hover:bg-c-d-grey"
                        onClick={() => setIsOpen(false)}
                    >
                        Profile Settings
                    </Link>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-white group hover:bg-gray-700 flex items-center"
                    >
                        <RiLogoutCircleRLine className="mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;