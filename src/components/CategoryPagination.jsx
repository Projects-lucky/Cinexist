// This component renders a pagination control for navigating through pages of content.
// It provides an interactive and visually appealing way to navigate between pages with smooth animations and responsive design.

// Props:
// - currentPage: The current active page number.
// - totalPages: The total number of pages available.
// - onPageChange: A function to handle page changes when a user interacts with the pagination controls.

// Why: This component is designed to enhance the user experience by providing an intuitive and interactive way
// to navigate through paginated content, such as categories or lists of items.

// Key Features:
// - Dynamic page numbers: Displays the current page, previous page, next page, and ellipsis if there are more pages.
// - Navigation buttons: Includes left and right buttons for navigating to the previous or next page.
// - Hover and tap animations: Uses `framer-motion` for smooth animations on hover and tap interactions.
// - Disabled states: Disables navigation buttons when on the first or last page to prevent invalid actions.

import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Icons for navigation

const CategoryPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];

    if (currentPage > 1) {
      pages.push(currentPage - 1); // Add the previous page
    }

    pages.push(currentPage); // Add the current page

    if (currentPage < totalPages) {
      pages.push(currentPage + 1); // Add the next page
    }

    if (currentPage < totalPages - 1) {
      pages.push("..."); // Add ellipsis if there are more pages
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      {/* Left Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft size={20} />
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {getVisiblePages().map((page, index) => (
          <motion.button
            key={`${page}-${index}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-4 py-2 rounded-full ${
              page === currentPage
                ? "bg-red-500 text-white font-bold"
                : "bg-gray-700 text-gray-300"
            } ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
          >
            {page}
          </motion.button>
        ))}
      </div>

      {/* Right Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronRight size={20} />
      </motion.button>
    </div>
  );
};

export default CategoryPagination;