// This component renders a detailed card for a TV show.
// It includes the poster, title, rating, genres, and additional metadata, with interactive hover effects.

// Props:
// - movies: An object containing details about the TV show. Expected properties include:
//   - id: The unique identifier for the TV show.
//   - poster_path: The URL path for the poster image.
//   - title: The title of the TV show (optional).
//   - name: The name of the TV show (optional).
//   - genre_ids: An array of genre IDs associated with the TV show.
//   - vote_average: A number representing the average rating of the item.
//   - first_air_date: The release date for the TV show (optional).
//   - original_language: The original language of the TV show.
//   - overview: A brief description of the TV show.
// - genres: An array of genre objects used to map genre IDs to genre names.

// Why: This component is designed to provide a visually appealing and interactive way to display TV show details,
// enhancing the user experience with hover effects and watchlist functionality.

// Key Features:
// - Poster display: Shows the TV show's poster, with a placeholder if no image is available.
// - Metadata display: Includes the title, genres, release date, language, and rating.
// - Watchlist integration: Allows users to add or remove the TV show from their watchlist.
// - Hover effects: Reveals additional details and interactive elements on hover.

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Ratingbar from './Ratingbar';
import { MdBookmarkAdd } from "react-icons/md";
import { BsBadgeHdFill } from "react-icons/bs";
import { useWatchlist } from '../context/WatchlistContext';

const NewTvShowCard = ({ movies, genres }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isInWatchlist = watchlist.some(item => item.id === movies.id);

  const handleBookmarkClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movies.id);
    } else {
      addToWatchlist(movies);
    }
  };

  const genreNames = movies.genre_ids
    .map(id => genres.find(g => g.id === id)?.name) // Find genre name by ID
    .filter(Boolean) // Remove undefined values
    .join(" • ") || "N/A"; // Convert array to string

  const formatDateWithDot = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate.replace(",", " •"); // Adds "•" instead of a comma
  };

  return (
    <div className="movie-card w-72 h-auto flex flex-col group mx-12 shrink-0 group relative">
      <div className="relative w-full h-80 overflow-hidden flex shrink-0 rounded-lg group-hover:rounded-bl-none group-hover:rounded-br-none">
        <img
          loading="lazy"
          src={movies.poster_path ? `https://image.tmdb.org/t/p/w500${movies.poster_path}` : '/placeholder-movie.jpg'}
          alt={movies.title || movies.name}
          className="movie-poster w-full h-full object-cover absolute contrast-110 brightness-105 saturate-110"
        />
        <Ratingbar value={movies.vote_average?.toFixed(1)} className="absolute top-1 left-1" />
        <MdBookmarkAdd
          className={`absolute right-0 w-8 h-12 ${isInWatchlist ? 'text-c-red' : 'text-c-l-grey'} cursor-pointer`}
          onClick={handleBookmarkClick}
        />
        <div className="w-auto h-auto hidden group-hover:flex flex-row justify-center items-center absolute top-[50%] left-[35%] animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-15 fill-c-red stroke-2 stroke-c-white hover:fill-c-d-grey hover:stroke-c-red hover:scale-105 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-2xl text-white font-bold capitalize hover:scale-105 relative">play</h2>
        </div>
        <h2 className="movie-title line-clamp-2 font-semibold capitalize text-c-white text-lg absolute bottom-0 bg-gradient-to-b from-c-l-grey/0 to-c-black w-full h-auto py-2 xs:flex md:hidden">
          {movies.title || movies.name}
        </h2>
      </div>

      <div className="movie-details hidden w-full h-auto bg-c-black text-c-l-grey group-hover:flex flex-col transition-all delay-150 duration-300 ease-in-out space-y-1.5 pl-0.5 group-hover:rounded-bl-lg group-hover:rounded-br-lg">
        <h2 className="movie-title line-clamp-2 font-semibold capitalize text-c-white text-xl">
          {movies.title || movies.name}
        </h2>
        <div className="meta-info flex flex-row flex-wrap space-x-3.5">
          <p className="movie-rating bg-c-d-grey rounded-lg px-1.5 text-c-l-grey">
            {movies.rating}
          </p>
          <p className="movie-duration text-c-l-grey bg-c-d-grey rounded-lg px-1.5">
            {formatDateWithDot(movies.first_air_date || movies.release_date || "NA")}
          </p>
          <p className="movie-duration text-c-l-grey bg-c-d-grey rounded-lg px-1.5 uppercase">
            {movies.original_language}
          </p>
          <BsBadgeHdFill className="size-6" />
        </div>
        <div className="meta-info flex flex-row flex-wrap space-x-3.5">
          <p className="movie-duration text-c-l-grey bg-c-d-grey rounded-lg px-1.5">
            {genreNames}
          </p>
        </div>
        <p className="movie-description line-clamp-3">{movies.overview}</p>
      </div>
    </div>
  );
};

export default NewTvShowCard;