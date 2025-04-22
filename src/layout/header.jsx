// This component renders the header section of the application, providing navigation links, user authentication options,
// and a responsive design for both desktop and mobile views. It includes a sticky header that changes appearance on scroll.

// Why: This component is designed to enhance user experience by offering quick access to essential navigation links,
// user authentication options, and a responsive layout for seamless interaction across devices.

// Key Features:
// - Sticky header: The header remains fixed at the top of the page and changes appearance when the user scrolls.
// - Navigation links: Provides links to "Home," "Search," "Categories," and "Watchlist" pages.
// - User authentication: Displays a login button or user profile based on the authentication state.
// - Responsive design: Includes a hamburger menu for mobile devices and a full navigation bar for larger screens.
// - Dynamic styling: Changes the header's background and shadow based on the scroll position.

import { useState, useEffect } from 'react';
import { ImHome } from "react-icons/im"; // Home icon
import { LuSearch } from "react-icons/lu"; // Search icon
import { MdOutlineBookmarkAdd } from "react-icons/md"; // Watchlist icon
import { TbCategoryFilled } from "react-icons/tb"; // Categories icon
import { RiUser6Fill } from "react-icons/ri"; // User icon
import WebLogo from "../assets/icons/download (2).svg";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import Profile from "../components/Profile";
import LinkTag from "../components/LinkTag";
import HamburgerMenu from '../components/HamburgerMenu';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Check if the page is scrolled
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { user, isLoading } = useAuth();

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <header className={`Header w-full h-16 flex flex-col justify-center items-center sticky top-0 z-1 mb-2 py-10 transition-all duration-300 backdrop-blur-xl ${isScrolled ? 'bg-c-white/20 shadow-md' : 'bg-transparent'}`}>
                <nav className="Navbar w-full flex flex-row pl-2 pt-1.5 justify-between items-center relative">
                    {/* Logo Section */}
                    <div className="hover:border-2 border-c-l-grey hover:bg-c-red rounded-lg p-1 w-auto h-auto justify-between items-center flex flex-row space-x-7 overflow-hidden bg-c-l-grey">
                        <img src={WebLogo} alt="cinexist" className="md:w-36 md:h-12 xs:w-26 xs:h-8 object-cover scale-150" />
                    </div>

                    {/* Navigation Links for Desktop */}
                    <div className="hover:border-2 border-c-l-grey hover:bg-c-red rounded-lg md:px-4 md:py-2.5 xs:p-2 w-auto h-auto justify-between items-center flex-row md:space-x-7 xs:space-x-1.5 sm:hidden xs:hidden md:flex">
                        <LinkTag href="/home" icon={ImHome} Text="home" />
                        <LinkTag href="/search" icon={LuSearch} Text="search" />
                        <LinkTag href="/categories" icon={TbCategoryFilled} Text="categories" />
                    </div>

                    {/* User Authentication and Watchlist */}
                    <div className="hover:border-2 border-c-l-grey hover:bg-c-red sm:hidden xs:hidden md:flex rounded-lg md:px-4 md:py-2.5 xs:p-2 w-auto h-auto justify-between items-center flex-row md:space-x-7 xs:space-x-1.5">
                        {user ? <Profile /> : <LoginButton />}
                        <LinkTag href="/watchlist" icon={MdOutlineBookmarkAdd} Text="Watchlist" />
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className="hover:border-2 border-c-l-grey hover:bg-c-red rounded-lg md:px-4 md:py-2.5 xs:p-2 w-auto h-auto justify-between items-center xs:flex flex-row md:space-x-7 xs:space-x-1.5 md:hidden absolute right-0 z-50">
                        <HamburgerMenu />
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;