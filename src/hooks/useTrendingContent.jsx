// This file contains custom hooks for fetching trending content (movies, TV shows, or both) from the API.
// It provides reusable hooks for fetching trending movies, TV shows, and combined content with optional ratings.

// Why: These hooks are designed to simplify API interactions and state management for trending content,
// enabling consistent and efficient data fetching across the application.

// Key Features:
// - Fetch trending movies, TV shows, or both based on a specified time window ("day" or "week").
// - Fetch ratings for the first 10 items for better performance.
// - Optimized caching and error handling using `react-query`.
// - Fallbacks for missing data to prevent errors.

import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, getTrendingTVShows, getTrendingAll, getMovieRating, getTVShowRating } from "../api/movies";

// Trending Movies Hook
export const useTrendingMovies = (timeWindow = "day") => {
  return useQuery({
    queryKey: ["trendingMovies", timeWindow],
    queryFn: async () => {
      try {
        const moviesResponse = await getTrendingMovies(timeWindow);

        // If no results, return empty array to prevent errors
        if (!moviesResponse?.results) {
          return { results: [] };
        }

        // Only fetch ratings for the first 10 movies for better performance
        const moviesToProcess = moviesResponse.results.slice(0, 10);

        // Process movies in parallel with error handling for each
        const moviesWithRatings = await Promise.all(
          moviesToProcess.map(async (movie) => {
            try {
              const rating = await getMovieRating(movie.id);
              return { ...movie, rating };
            } catch (error) {
              console.error(`Error fetching rating for movie ${movie.id}:`, error);
              return { ...movie, rating: 'Not Rated' }; // Fallback
            }
          })
        );

        return {
          ...moviesResponse,
          results: [
            ...moviesWithRatings,
            ...moviesResponse.results.slice(10), // Include remaining movies without ratings
          ],
        };
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw new Error('Failed to load trending movies');
      }
    },
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};

// Trending TV Shows Hook
export const useTrendingTVShows = (timeWindow = "day") => {
  return useQuery({
    queryKey: ["trendingTVShows", timeWindow],
    queryFn: async () => {
      try {
        const tvShowsResponse = await getTrendingTVShows(timeWindow);

        // If no results, return empty array to prevent errors
        if (!tvShowsResponse?.results) {
          return { results: [] };
        }

        // Only fetch ratings for the first 10 TV shows for better performance
        const tvShowsToProcess = tvShowsResponse.results.slice(0, 10);

        // Process TV shows in parallel with error handling for each
        const tvShowsWithRatings = await Promise.all(
          tvShowsToProcess.map(async (tvShow) => {
            try {
              const rating = await getTVShowRating(tvShow.id);
              return { ...tvShow, rating };
            } catch (error) {
              console.error(`Error fetching rating for TV show ${tvShow.id}:`, error);
              return { ...tvShow, rating: 'Not Rated' }; // Fallback
            }
          })
        );

        return {
          ...tvShowsResponse,
          results: [
            ...tvShowsWithRatings,
            ...tvShowsResponse.results.slice(10), // Include remaining TV shows without ratings
          ],
        };
      } catch (error) {
        console.error('Error fetching trending TV shows:', error);
        throw new Error('Failed to load trending TV shows');
      }
    },
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};

// Trending All Hook (Both Movies & TV Shows)
export const useTrendingAll = (timeWindow = "day") => {
  return useQuery({
    queryKey: ["trendingAll", timeWindow],
    queryFn: () => getTrendingAll(timeWindow),
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};