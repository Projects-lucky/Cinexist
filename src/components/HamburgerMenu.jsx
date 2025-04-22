// This component renders a responsive hamburger menu for navigation.
// It provides a slide-in menu with interactive animations and links to various sections of the application.

// Props: None

// Why: This component is designed to enhance the user experience by providing a compact and interactive navigation menu,
// especially for smaller screens or mobile devices.

// Key Features:
// - Hamburger button: Toggles the visibility of the menu.
// - Slide-in menu: The menu slides in from the right with smooth animations.
// - Navigation links: Includes links to different sections of the application, each with an icon and label.
// - Interactive animations: Uses `framer-motion` for hover, tap, and slide animations.
// - Responsive design: Works well on both desktop and mobile devices.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Info, Search, List, LogIn, BookmarkCheck } from 'lucide-react';

const menuItems = [
  { label: 'Home', icon: <Home className="w-5 h-5" />, path: '/home' },
  { label: 'About', icon: <Info className="w-5 h-5" />, path: '/about' },
  { label: 'Categories', icon: <List className="w-5 h-5" />, path: '/categories' },
  { label: 'Search', icon: <Search className="w-5 h-5" />, path: '/search' },
  { label: 'Login', icon: <LogIn className="w-5 h-5" />, path: '/login' },
  { label: 'Watchlist', icon: <BookmarkCheck className="w-5 h-5" />, path: '/watchlist' },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50 bg-emerald-500">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-black text-white fixed top-4 right-4 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-64 h-full z-20 p-6 flex flex-col space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Navigation</h2>
            <nav className="flex flex-col space-y-4 bg-c-black p-1 rounded-b-md relative z-50">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)} // Close menu on click
                    className="flex items-center gap-3 text-lg text-c-white font-medium hover:text-c-red active:text-c-red"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;