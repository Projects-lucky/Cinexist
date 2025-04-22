// This file defines the `WatchlistContext` for managing the user's watchlist state across the application.
// It provides context for adding, removing, and persisting watchlist items using localStorage.

// Components and Hooks:
// - WatchlistProvider: A context provider that wraps the application and provides watchlist-related state and functions.
// - useWatchlist: A custom hook to access the watchlist context.

// Props for WatchlistProvider:
// - children: React components that will have access to the watchlist context.

// Why: This context is designed to centralize watchlist management, making it easier to handle adding/removing items
// and persisting the watchlist state across sessions.

// Key Features:
// - Add to watchlist: Adds a movie or TV show to the watchlist if it doesn't already exist.
// - Remove from watchlist: Removes a movie or TV show from the watchlist by its ID.
// - LocalStorage integration: Persists the watchlist state in localStorage to maintain data across sessions.
// - Initialization: Loads the watchlist from localStorage when the application starts.

import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    // Initialize state from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('watchlist');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Add a movie or TV show to the watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      // Check if the movie already exists in the watchlist
      if (!prev.some(item => item.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  // Remove a movie or TV show from the watchlist by its ID
  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter(item => item.id !== movieId));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom hook to access the WatchlistContext
export const useWatchlist = () => useContext(WatchlistContext);