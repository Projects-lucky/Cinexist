// This component renders a search bar for filtering movies and TV shows.
// It allows users to input a search query and updates the query state dynamically.

// Props:
// - query: A string representing the current search query.
// - setQuery: A function to update the search query state when the user types in the search bar.

// Why: This component is designed to provide a simple and intuitive way for users to search for movies or TV shows,
// enhancing the user experience by enabling quick and dynamic filtering of content.

// Key Features:
// - Dynamic input handling: Updates the query state in real-time as the user types.
// - Placeholder text: Provides a hint to users about the purpose of the search bar.
// - Styled input: Includes styling for focus and hover states to improve usability and visual appeal.

const SearchBar = ({ query, setQuery }) => (
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search movies and TV shows..."
    className="search- w-80 h-14 px-3 border border-c-red rounded-lg ring-2 ring-c-red/30 focus:outline-none focus:ring-3 focus:ring-c-red transition duration-200 ease-in-out"
  />
);

export default SearchBar;