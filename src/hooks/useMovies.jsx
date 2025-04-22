// This file contains custom hooks for fetching and managing movie-related data from the API.
// It provides reusable hooks for fetching popular movies, movie details, genres, ratings, reviews, trailers, and similar movies.

// Why: These hooks are designed to simplify API interactions and state management for movie-related data,
// enabling consistent and efficient data fetching across the application.

// Key Features:
// - Fetch popular movies with ratings.
// - Fetch movie details, genres, and movies by genre.
// - Support for paginated genres and movies.
// - Fetch similar movies, reviews, and trailers.
// - Fetch content ratings for movies and TV shows.
// - Optimized caching and error handling using `react-query` and custom state management.

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  getPopularMovies,
  getMovieDetails,
  getMoviesByGenre,
  getMovieRating,
  getMovieGenresList,
  getMovieFullDetails,
  getTVFullDetails,
  getMovieCredits,
  getSimilarMovies,
  getMovieReviews,
  getMovieTrailer,
  getTVShowRating,
} from "../api/movies";

// Fetch Movie Genres
export const useMoviesGenres = () => {
  return useQuery({
    queryKey: ["MoviesGenres"],
    queryFn: getMovieGenresList,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};

// Fetch Popular Movies
export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const moviesResponse = await getPopularMovies();
      if (!moviesResponse?.results) return { results: [] };

      const moviesWithRatings = await Promise.all(
        moviesResponse.results.map(async (movie) => {
          try {
            const rating = await getMovieRating(movie.id);
            return { ...movie, rating };
          } catch {
            return { ...movie, rating: "Not Rated" };
          }
        })
      );

      return { ...moviesResponse, results: moviesWithRatings };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
    retryDelay: 1000,
    keepPreviousData: true,
  });
};

// Fetch Movie Details
export const useMovieDetails = (movieId) => {
  return useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });
};

// Fetch Movies by Genre
export const useMoviesByGenre = (genreId) => {
  return useQuery({
    queryKey: ["moviesByGenre", genreId],
    queryFn: () => getMoviesByGenre(genreId),
    enabled: !!genreId,
  });
};

// Fetch Paginated Genres
export const usePaginatedGenres = (genresPerPage = 5) => {
  const [currentGenrePage, setCurrentGenrePage] = useState(1);

  const { data: genresData, isLoading: isGenresLoading, error: genresError } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: getMovieGenresList,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const { data: allGenresWithMovies, isLoading: isMoviesLoading, error: moviesError } = useQuery({
    queryKey: ["allGenresWithMovies"],
    queryFn: async () => {
      if (!genresData?.genres) return [];
      const results = await Promise.all(
        genresData.genres.map(async (genre) => {
          const moviesResponse = await getMoviesByGenre(genre.id, 1);
          const movies = moviesResponse?.results || [];
          return movies.length > 0 ? { ...genre, movies } : null;
        })
      );
      return results.filter(Boolean);
    },
    enabled: !!genresData,
    staleTime: 60 * 60 * 1000,
  });

  const totalGenrePages = allGenresWithMovies
    ? Math.ceil(allGenresWithMovies.length / genresPerPage)
    : 0;

  const paginatedGenres = allGenresWithMovies
    ? allGenresWithMovies.slice(
        (currentGenrePage - 1) * genresPerPage,
        currentGenrePage * genresPerPage
      )
    : [];

  return {
    paginatedGenres,
    currentGenrePage,
    totalGenrePages,
    setCurrentGenrePage,
    isLoading: isGenresLoading || isMoviesLoading,
    error: genresError || moviesError,
  };
};

// Fetch Genre-Wise Movies with Pagination
export const useGenreWiseMovies = (genresPerPage = 5, moviesPerPage = 10) => {
  const [currentGenrePage, setCurrentGenrePage] = useState(1);
  const [moviePages, setMoviePages] = useState({});

  const { data: genresData, isLoading: isGenresLoading, error: genresError } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: getMovieGenresList,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const { data: allGenresWithMovies, isLoading: isMoviesLoading, error: moviesError } = useQuery({
    queryKey: ["allGenresWithMovies", currentGenrePage],
    queryFn: async () => {
      if (!genresData?.genres) return [];
      const paginatedGenres = genresData.genres.slice(
        (currentGenrePage - 1) * genresPerPage,
        currentGenrePage * genresPerPage
      );

      const results = await Promise.all(
        paginatedGenres.map(async (genre) => {
          const currentPage = moviePages[genre.id] || 1;
          const moviesResponse = await getMoviesByGenre(genre.id, currentPage, moviesPerPage);
          const movies = moviesResponse?.results || [];
          return movies.length > 0 ? { ...genre, movies } : null;
        })
      );

      return results.filter(Boolean);
    },
    enabled: !!genresData,
    staleTime: 60 * 60 * 1000,
  });

  const totalGenrePages = genresData
    ? Math.ceil(genresData.genres.length / genresPerPage)
    : 0;

  return {
    paginatedGenres: allGenresWithMovies || [],
    currentGenrePage,
    totalGenrePages,
    setCurrentGenrePage,
    isLoading: isGenresLoading || isMoviesLoading,
    error: genresError || moviesError,
  };
};

// Fetch Full Movie or TV Show Details
export const useMovieFullDetails = (id, type) => {
  return useQuery({
    queryKey: ["fullDetails", id, type],
    queryFn: () => (type === "movie" ? getMovieFullDetails(id) : getTVFullDetails(id)),
    enabled: !!id && !!type,
    staleTime: 60 * 60 * 1000,
  });
};

// Fetch Movie Credits
export const useMovieCredits = (movieId) => {
  return useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
  });
};

// Fetch Similar Movies
export const useSimilarMovies = (movieId) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      setLoading(true);
      const data = await getSimilarMovies(movieId);
      setSimilarMovies(data?.results || []);
      setLoading(false);
    };

    if (movieId) fetchSimilar();
  }, [movieId]);

  return { similarMovies, loading };
};

// Fetch Movie Reviews
export const useMovieReviews = (movieId) => {
  return useQuery({
    queryKey: ["movieReviews", movieId],
    queryFn: () => getMovieReviews(movieId),
    enabled: !!movieId,
  });
};

// Fetch Movie Trailer
export const useTrailer = (movieId) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      setIsLoading(true);
      const videos = await getMovieTrailer(movieId);
      const youtubeVideos = videos.filter((v) => v.site === "YouTube");
      const trailer = youtubeVideos.find((v) => v.type === "Trailer");
      setTrailerKey(trailer?.key || null);
      setIsLoading(false);
    };

    if (movieId) fetchTrailer();
  }, [movieId]);

  return { trailerKey, isLoading };
};

// Fetch Content Rating
export const useContentRating = (id, type) => {
  const [certification, setCertification] = useState("N/A");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      if (!id || !type) return;

      setIsLoading(true);
      try {
        const rating = type === "movie" ? await getMovieRating(id) : await getTVShowRating(id);
        setCertification(rating || "Not Rated");
      } catch (err) {
        setError(err.message || "An error occurred");
        setCertification("N/A");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, [id, type]);

  return { certification, isLoading, error };
};