// This component fetches and displays a list of similar movies or TV shows based on the provided movie or TV show ID.
// It dynamically renders the content in a grid layout and supports both movies and TV shows.

// Props:
// - movieId: A string representing the unique identifier of the movie or TV show for which similar content is fetched.
// - mediaType: A string indicating the type of media ("movie" or "tv") to determine the content type.

// Why: This component is designed to enhance the user experience by providing recommendations for similar content,
// allowing users to explore related movies or TV shows seamlessly.

// Key Features:
// - Data fetching: Fetches similar movies or TV shows using the `useSimilarMovies` custom hook.
// - Loading state: Displays a loading animation while fetching data.
// - Grid layout: Dynamically displays the fetched content in a responsive grid layout.
// - Media type handling: Supports both movies and TV shows, rendering appropriate components (`NewMovieCard` or `TvShowCard`).
// - Infinite scrolling: Integrates infinite scrolling for a smooth browsing experience.

import { useSimilarMovies } from "../hooks/useMovies";
import SliderCarousel from '../components/NewCardFrame';
import NewMovieCard from '../components/NewMovieCard';
import TvShowCard from '../components/TvShowCard';
import LoaderAnim from '../components/LoaderAnim';
import InfiniteScroll from '../components/InfiniteScroll';

const FSimilarMovies = ({ movieId, mediaType }) => {
  const { similarMovies, loading } = useSimilarMovies(movieId, mediaType);

  return (
    <div className="mx-auto w-full h-auto flex flex-col">
      <h1>more like this</h1>

      {/* Loading State */}
      {loading && <LoaderAnim />}
      
      {/* Movies Grid */}
      <div className="cat-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto h-[85vh] scrollbar-hide">
        {similarMovies?.map((item) => (
          <div key={item.id} className="relative w-full h-auto flex flex-col items-center justify-start p-2">
            {item.media_type === "movie" || mediaType === "movie" ? (
              <NewMovieCard movies={item} />
            ) : (
              <TvShowCard movies={item} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FSimilarMovies;