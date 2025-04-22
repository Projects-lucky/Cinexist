// This custom hook provides a reusable fetch instance for making API calls in other custom hooks.
// It handles data fetching, loading state, and error management, making it easier to manage API requests consistently.

// Props:
// - apiFunction: A function that performs the API call. This function should return a promise.
// - params: An optional object containing parameters to be passed to the `apiFunction` (default: {}).

// Why: This hook is designed to centralize and simplify the process of fetching data from APIs,
// reducing code duplication and improving maintainability across the application.

// Key Features:
// - Reusable: Can be used with any API function, making it versatile for different use cases.
// - Data fetching: Executes the provided API function and retrieves the data.
// - Loading state: Indicates when the API call is in progress.
// - Error handling: Captures and provides error messages if the API call fails.
// - Dependency management: Automatically re-fetches data when the `apiFunction` or `params` change.

import { useState, useEffect } from "react";

const useFetch = (apiFunction, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await apiFunction(params);
        setData(result?.results || result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunction, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetch;