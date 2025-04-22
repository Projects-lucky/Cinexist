// This component renders a social media sharing button with options to share content on Facebook, Twitter, and WhatsApp.
// It includes an animated toggle button and dynamically generated share links.

// Props:
// - title: A string representing the title of the content to be shared.
// - url: A string representing the URL of the content to be shared.

// Why: This component is designed to enhance the user experience by providing an easy and interactive way
// for users to share content on popular social media platforms, increasing engagement and visibility.

// Key Features:
// - Animated toggle button: A visually appealing button that rotates when toggled.
// - Social media links: Provides share options for Facebook, Twitter, and WhatsApp.
// - Dynamic URL encoding: Encodes the title and URL to ensure compatibility with social media platforms.
// - Responsive design: Adapts to various layouts and screen sizes.

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const SocialShare = ({ title, url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <motion.div
        className="w-12 h-12 bg-indigo-500 text-white flex items-center justify-center rounded-full cursor-pointer shadow-lg"
        onClick={handleToggle}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xl">📤</span>
      </motion.div>

      {/* Share Options */}
      {isOpen && (
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center"
          >
            <FaFacebookF size={20} />
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center"
          >
            <FaTwitter size={20} />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center"
          >
            <FaWhatsapp size={20} />
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default SocialShare;