// This component renders a pagination control for navigating through multiple pages of content.

// Props:
// - currentPage: The current active page number.
// - totalPages: The total number of pages available.
// - onPageChange: A function to handle page changes when a user interacts with the pagination controls.

// Why: This component is designed to enhance the user experience by providing an intuitive and interactive way
// to navigate through paginated content, such as lists of movies or TV shows.

// Key Features:
// - Previous and Next buttons: Allows users to navigate to the previous or next page.
// - Page numbers: Displays clickable page numbers for direct navigation.
// - Disabled states: Disables the Previous button on the first page and the Next button on the last page.
// - Responsive design: Adapts to various layouts and screen sizes.

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Hide pagination if only 1 page exists

  return (
    <div className="flex justify-center items-center space-x-2 mt-6 py-3">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-c-d-grey/90 text-white rounded disabled:opacity-50"
      >
        ‹ Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${currentPage === page ? "bg-c-red text-black font-bold" : "bg-c-black text-white"}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-c-d-grey/90 text-white rounded disabled:opacity-50"
      >
        Next ›
      </button>
    </div>
  );
};

export default Pagination;