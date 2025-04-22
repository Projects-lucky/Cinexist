// This component renders the "Categories" page, allowing users to browse movies or TV shows by genre.
// It integrates a sidebar for genre selection, a grid layout for displaying content, and pagination for navigation.

// Why: This component is designed to enhance user experience by organizing content into genres, enabling users
// to explore movies or TV shows efficiently with dynamic filtering and pagination.

// Key Features:
// - Sidebar integration: Includes a collapsible sidebar for selecting genres and switching between movies and TV shows.
// - Unified fetch function: Dynamically fetches content based on the selected genre, media type, and current page.
// - Loading and error states: Displays a loading animation or error message during data fetching.
// - Content grid: Renders movies or TV shows in a responsive grid layout using `NewMovieCard` and `TvShowCard` components.
// - Pagination: Provides navigation for browsing through multiple pages of content.
// - Header and footer: Includes a consistent layout with a header and footer for navigation and branding.

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../layout/Sidebar';
import NewMovieCard from '../components/NewMovieCard';
import TvShowCard from '../components/TvShowCard';
import LoaderAnim from '../components/LoaderAnim';
import CategoryPagination from '../components/CategoryPagination';
import { getMoviesByGenre, getTVShowsByGenre } from '../api/movies';
import Header from '../layout/header';
import Footer from '../layout/footer';

const Categories = () => {
  // State Management
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaType, setMediaType] = useState("movies");

  // Unified fetch function
  const fetchContent = async () => {
    if (mediaType === "movies") {
      return await getMoviesByGenre(selectedGenre, currentPage);
    } else {
      return await getTVShowsByGenre(selectedGenre, currentPage);
    }
  };

  // Data Fetching Hook
  const { data, isLoading, error } = useQuery({
    queryKey: ["genreContent", mediaType, selectedGenre, currentPage],
    queryFn: fetchContent,
  });

  // Handle Genre Selection from Sidebar
  const handleGenreSelect = (genreId, type) => {
    setSelectedGenre(genreId);
    setCurrentPage(1); // Reset to first page on new genre selection
    setMediaType(type);
  };

  return (
    <>
      <Header />
      <div className='w-full h-full flex flex-row items-start relative overflow-hidden bg-c-d-grey'>
        {/* Sidebar Section */}
        <section className='w-auto h-full flex flex-col justify-start items-start absolute top-0 left-0'>
          <Sidebar onGenreSelect={handleGenreSelect} onMediaTypeChange={setMediaType} />
        </section>

        {/* Main Content Section */}
        <section className='w-full h-[100vh] flex flex-col space-y-2.5 relative'>
          <div className='w-full h-full flex flex-col space-y-2.5 p-4 relative'>
            {/* Loading & Error States */}
            {isLoading && (
              <div className="text-white absolute top-[40%] left-[50%] w-full h-full">
                <LoaderAnim />Loading movies...
              </div>
            )}
            {error && <div className="text-red-500">Error: {error.message}</div>}

            {/* Content Grid */}
            <div className="cat-grid w-full overflow-y-auto h-[85vh] scrollbar-hide overflow-x-hidden">
              {data?.results?.map((item) =>
                mediaType === "movies" ? (
                  <NewMovieCard
                    key={item.id}
                    movies={item}
                    genres={data?.genres || []} // Pass genre list if needed
                  />
                ) : (
                  <TvShowCard
                    key={item.id}
                    movies={item}
                    genres={data?.genres || []}
                  />
                )
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className='flex flex-row justify-center items-center w-auto h-auto p-2'>
            {data?.total_pages > 1 && (
              <CategoryPagination
                currentPage={currentPage}
                totalPages={data.total_pages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Categories;