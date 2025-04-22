// This file contains custom hooks for fetching and managing TV show-related data from the API.
// It provides reusable hooks for fetching TV genres, TV shows by genre, popular TV shows, and trailers.

// Why: These hooks are designed to simplify API interactions and state management for TV show-related data,
// enabling consistent and efficient data fetching across the application.

// Key Features:
// - Fetch TV genres for categorization.
// - Fetch TV shows by genre with pagination support.
// - Fetch popular TV shows with ratings.
// - Fetch trailers for TV shows.
// - Optimized caching and error handling using `react-query`.

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTVGenres, getTVShowsByGenre, getPopularTVShows, getTVShowRating, getTvShowTrailer } from "../api/movies";

// Fetch TV Genres Hook
export const useTVGenres = () => {
  return useQuery({
    queryKey: ["tvGenres"],
    queryFn: getTVGenres,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};

// Fetch TV Shows by Genre Hook
export const useTVShowsByGenre = (genreId, page = 1) => {
  return useQuery({
    queryKey: ["tvShowsByGenre", genreId, page],
    queryFn: () => getTVShowsByGenre(genreId, page),
    enabled: !!genreId, // Only run if genreId is provided
    staleTime: 10 * 60 * 1000,
  });
};

// Fetch Popular TV Shows Hook
export const usePopularTVShows = () => useQuery({
  queryKey: ["popularTVShows"],
  queryFn: async () => {
    const tvShows = await getPopularTVShows();

    // Fetch rating for each TV show
    const tvShowsWithRatings = await Promise.all(
      tvShows.results.map(async (tv) => {
        const rating = await getTVShowRating(tv.id);
        return { ...tv, rating };
      })
    );

    return { results: tvShowsWithRatings };
  },
  staleTime: 10 * 60 * 1000, // Cache for 10 minutes
});

// Fetch TV Show Trailer Hook
export const useTvTrailer = (movieId) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      setIsLoading(true);
      try {
        const videos = await getTvShowTrailer(movieId); // Get video details
        const youtubeVideos = videos.filter(v => v.site === 'YouTube'); // Filter for YouTube videos
        const trailer = youtubeVideos.find(v => v.type === 'Trailer'); // Find trailer type
        const teaser = youtubeVideos.find(v => v.type === 'Teaser'); // Find teaser type
        setTrailerKey(trailer?.key || teaser?.key || null); // Set the trailer or teaser key
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) fetchTrailer();
  }, [movieId]);

  return { trailerKey, isLoading };
};