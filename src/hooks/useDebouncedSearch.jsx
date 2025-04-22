// This custom hook provides a debounced search functionality to prevent excessive API calls while searching.
// It delays the execution of the search function until the user stops typing for a specified duration.

// Props:
// - query: A string representing the search term entered by the user.
// - delay: A number specifying the debounce delay in milliseconds (default: 500).

// Why: This hook is designed to optimize API calls by reducing the frequency of requests during user input,
// improving performance and reducing server load.

// Key Features:
// - Debounced search: Delays the API call until the user stops typing for the specified delay.
// - Data fetching: Fetches search results using the `multiSearch` API function.
// - Loading state: Indicates when the search is in progress.
// - Error handling: Captures and provides error messages if the API call fails.
// - Real-time updates: Updates the search results dynamically as the query changes.

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { multiSearch } from "../api/movies";

export const useDebouncedSearch = (query, delay = 500) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) return;
      setLoading(true);
      try {
        const response = await multiSearch(searchTerm);
        setData(response.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, delay),
    []
  );

  // Update debounced query and trigger search
  useEffect(() => {
    setDebouncedQuery(query);
    handleSearch(query);
  }, [query]);

  return { data, loading, error };
};