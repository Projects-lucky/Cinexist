// This component renders a dynamic frame that displays trending movies or TV shows based on the selected category.
// It includes a tab switcher for toggling between movies and TV shows, and dynamically fetches and displays data.

// Why: This component is designed to enhance the user experience by providing an intuitive way to explore trending
// movies and TV shows, with seamless switching between categories and real-time data fetching.

// Props: None

// Key Features:
// - Tab switching: Allows users to toggle between "Movies" and "TV Shows" categories using the `SwitchTabs` component.
// - Dynamic data fetching: Fetches trending movies and TV shows data using custom hooks (`useTrendingMovies`, `useTrendingTVShows`).
// - Genre mapping: Maps genre IDs to genre names for better context using `useMoviesGenres` and `useTVGenres` hooks.
// - Loading states: Displays a loading animation while fetching data for the selected category.
// - Error handling: Displays error messages if data fetching fails for the selected category.
// - Responsive design: Adapts to various screen sizes and layouts.

import { useState } from "react";
import { useTrendingMovies, useTrendingTVShows } from "../hooks/useTrendingContent";
import CardFrameTvShows from '../components/CardFrameTvShows';
import CardFrameMovies from '../components/CardFrameMovies';
import { useTVGenres } from "../hooks/useTVShows";
import { useMoviesGenres } from "../hooks/useMovies";
import SwitchTabs from '../components/SwitchTabs';
import LoaderAnim from '../components/LoaderAnim';

const FcardFrameTrending = () => {
  const [category, setCategory] = useState("Movies");
  
  // Tab switching handler
  const handleSwitch = (selected) => {
    setCategory(selected);
  };

  // Fetch TV shows data
  const { 
    data: tvData, 
    isLoading: tvLoading, 
    error: tvError 
  } = useTrendingTVShows();
  
  // Fetch Movies data
  const { 
    data: movieData, 
    isLoading: movieLoading, 
    error: movieError 
  } = useTrendingMovies();

  // Fetch genres for both
  const { data: tvGenres } = useTVGenres();
  const { data: movieGenres } = useMoviesGenres();

  // Show loading state only for the currently selected category
  if (category === "Movies" && movieLoading) {
    return <div className="mx-auto w-auto h-auto flex flex-col"><LoaderAnim/><p className="text-white text-center py-8 mx-auto">Loading Movies...</p></div>;
  }
  if (category === "TV Shows" && tvLoading) {
    return <div className="mx-auto w-auto h-auto flex flex-col"><LoaderAnim/><p className="text-white text-center py-8 mx-auto">Loading TV Shows...</p></div>;
  }

  // Show errors only for the currently selected category
  if (category === "Movies" && movieError) {
    return <p className="text-red-500 text-center py-8">Movie Error: {movieError.message}</p>;
  }
  if (category === "TV Shows" && tvError) {
    return <p className="text-red-500 text-center py-8">TV Error: {tvError.message}</p>;
  }

  return (
    <div className='w-full h-auto flex flex-col'>
      {/* Tab Switcher */}
      <SwitchTabs 
        title="Trending" 
        options={["Movies", "TV Shows"]} 
        onSwitch={handleSwitch} 
      />
      
      {/* Content Display */}
      {category === "Movies" ? (
        movieData?.results && movieData.results.length > 0 ? (
          <CardFrameMovies 
            cards={movieData.results} 
            genres={movieGenres?.genres || []} 
            title="Trending Movies"
            mediaType="movie"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            No trending movies found
          </div>
        )
      ) : (
        tvData?.results && tvData.results.length > 0 ? (
          <CardFrameTvShows 
            cards={tvData.results} 
            genres={tvGenres?.genres || []} 
            title="Trending TV Shows"
            mediaType="tv"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            No trending TV shows found
          </div>
        )
      )}
    </div>
  );
};

export default FcardFrameTrending;