// This component fetches movies grouped by genres and displays them in a slider carousel format.
// It includes pagination for navigating through multiple genre pages and handles loading and error states.

// Why: This component is designed to enhance the user experience by providing an organized and interactive way
// to explore movies by genres, with seamless pagination and visually appealing carousels.

// Props: None

// Key Features:
// - Genre-wise data fetching: Fetches movies grouped by genres using the `useGenreWiseMovies` custom hook.
// - Slider carousel: Displays movies for each genre in a slider carousel format using the `SliderCarousel` component.
// - Pagination: Includes pagination for navigating through genre pages using the `Pagination` component.
// - Loading state: Displays a loading animation while fetching data.
// - Error handling: Displays error messages if data fetching fails.
// - No data handling: Displays a message if no genres with movies are found.
// - Scroll-to-top: Automatically scrolls to the top of the page when the genre page changes.

import React from "react";
import { useGenreWiseMovies } from "../hooks/useMovies";
import SliderCarousel from '../components/NewCardFrame';
import LoaderAnim from '../components/LoaderAnim';
import Pagination from '../components/Pagination ';

const FNcardframe = () => {
  // Fetch Genre-Wise Movies data
  const {
    paginatedGenres,
    currentGenrePage,
    totalGenrePages,
    goToNextGenrePage,
    goToPreviousGenrePage,
    setGenrePage,
    isLoading: genreMoviesLoading,
    error: genreMoviesError,
  } = useGenreWiseMovies(5, 10); // 5 genres per page, 10 movies per genre

  // Handle page change for genre pagination
  const handleGenrePageChange = (newPage) => {
    // Validate newPage
    if (typeof newPage !== "number" || isNaN(newPage)) {
      console.error("Invalid page number:", newPage);
      return;
    }

    // Prevent out-of-bounds page change
    if (newPage < 1 || newPage > totalGenrePages) {
      console.error("Page number out of bounds:", newPage);
      return;
    }

    // Update the genre page
    setGenrePage(newPage);

    // Scroll to top on page change
    window.scrollTo(0, 0);
  };

  // Show loading state
  if (genreMoviesLoading) {
    return (
      <div className="mx-auto w-auto h-auto flex flex-col">
        <LoaderAnim />
        <p className="text-white text-center py-8 mx-auto">Loading Movies...</p>
      </div>
    );
  }

  // Show error state
  if (genreMoviesError) {
    return (
      <div className="text-red-500 text-center py-8">
        <p>Genre Movies Error: {genreMoviesError.message}</p>
      </div>
    );
  }

  // Filter out genres with no movies
  const genresWithMovies = paginatedGenres.filter((genre) => genre.movies?.length > 0);

  return (
    <div className="w-full h-auto flex flex-col relative overflow-y-visible z-0">
      {/* Genre Sections */}
      {genresWithMovies.length > 0 ? (
        <>
          {genresWithMovies.map(({ id, name, movies }) => (
            <SliderCarousel
              key={id} 
              Smovies={movies}  
              Sgenres={[{ id, name }]} // Pass only current genre info
              Stitle={name}
              SmediaType="movie"
            />
          ))}
          
          {/* Genre Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination 
              currentPage={currentGenrePage}
              totalPages={totalGenrePages}
              onPageChange={(page) => handleGenrePageChange(page)}
            />
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-400">
          No genres with movies found
        </div>
      )}
    </div>
  );
};

export default FNcardframe;