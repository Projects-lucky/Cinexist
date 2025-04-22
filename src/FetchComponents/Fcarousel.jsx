// This component fetches popular movies and displays them in a carousel format using the `MovieCarousel` component.

// Why: This component is designed to provide a visually appealing and interactive way to showcase the top 10 popular movies,
// enhancing the user experience by allowing users to browse through the movies in a carousel layout.

// Props: None

// Key Features:
// - Data fetching: Fetches popular movies using the `usePopularMovies` custom hook.
// - Loading state: Displays a loading message while fetching data.
// - Error handling: Displays an error message if the data fetching fails.
// - No data handling: Displays a message if no movies are found.
// - Carousel integration: Passes the top 10 movies to the `MovieCarousel` component for display.

import MovieCarousel from '../components/MovieCarousel';
import { usePopularMovies } from "../hooks/useMovies";
import React from "react";

const Fcarousel = () => {
  const { data: movies, loading, error } = usePopularMovies();

  // Show loading state
  if (loading) return <p className="text-white">Loading movies...</p>;

  // Show error state
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Show no data state
  if (!movies?.results || movies.results.length === 0) return <p className="text-gray-400">No movies found.</p>;

  // Extract the top 10 movies
  const topMovies = movies.results.slice(0, 10);

  return (
    <div className='w-full h-auto flex bg-c-d-grey'>
      <MovieCarousel movies={topMovies}/> 
    </div>
  );
};

export default Fcarousel;