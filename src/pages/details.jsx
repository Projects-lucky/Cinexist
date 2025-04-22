// This component renders the "Details" page, providing comprehensive information about a specific movie or TV show.
// It includes details such as the title, overview, release date, runtime, genres, cast, seasons (for TV shows), and similar content.

// Why: This component is designed to enhance user engagement by offering detailed information about a selected movie or TV show,
// along with interactive features like trailers, watchlist management, and social sharing.

// Key Features:
// - Hero section: Displays a visually appealing hero banner with the movie/TV show poster, title, and tagline.
// - Detailed information: Includes release date, runtime, status, country, language, genres, and certification.
// - Trailer integration: Allows users to watch the trailer in a modal.
// - Watchlist management: Enables users to add or remove the movie/TV show from their watchlist.
// - Cast carousel: Displays the cast in a horizontal carousel format.
// - Seasons section: Lists all seasons for TV shows with details like air date and episode count.
// - Similar content: Displays a list of similar movies or TV shows.
// - Social sharing: Provides options to share the movie/TV show on social media.
// - Responsive design: Adapts to various screen sizes for an optimal viewing experience.

import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useMovieFullDetails, useTrailer, useContentRating } from '../hooks/useMovies';
import LoaderAnim from '../components/LoaderAnim';
import CastCarousel from '../components/CastCarousel';
import TrailerModal from '../components/TrailerModal';
import Ratingbar from '../components/Ratingbar';
import Button from '../components/Button';
import { useWatchlist } from '../context/WatchlistContext';
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { MdBookmarkAdd } from "react-icons/md";
import FSimilarMovies from '../FetchComponents/FSimilarMovies';
import ReadMore from '../components/TextExpand';
import Footer from '../layout/footer';
import SocialShare from "../components/SocialShare";

const PageDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type"); // Will be 'movie' or 'tv'

  // Fetch content rating using the custom hook
  const { certification, isLoading: ratingLoading, error: ratingError } = useContentRating(id, type);

  // Watchlist context
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  // Fetch movie/TV show full details
  const { data, isLoading: detailsLoading } = useMovieFullDetails(id, type);
  const { details, credits, similar, reviews } = data || {};

  // Fetch trailer details
  const { trailerKey, isLoading: trailerLoading } = useTrailer(id);

  // State for showing the trailer modal
  const [showTrailer, setShowTrailer] = useState(false);

  // Combined loading state
  const isLoading = detailsLoading || trailerLoading;

  // Show loader if data is still loading
  if (isLoading) return <LoaderAnim />;

  // Handle cases where `details` might be undefined
  if (!details) {
    return <div>Error: Movie details not found.</div>;
  }

  // Check if the movie is in the watchlist
  const isInWatchlist = watchlist.some((item) => item.id === details.id);

  // Handle bookmark click
  const handleBookmarkClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(details.id);
    } else {
      addToWatchlist(details);
    }
  };

  // Format the release date with a dot instead of a comma
  const formatDateWithDot = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate.replace(',', ' •'); // Adds "•" instead of a comma
  };

  // Format runtime
  const formattedReleaseDate = formatDateWithDot(details.release_date || details.first_air_date || details.last_episode_to_air.air_date);
  const formattedRuntime = details.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : 'N/A';

  const currentUrl = window.location.href; // Get the current URL for sharing

  return (
    <>
      <div className="relative w-full h-auto p-1 space-y-10 flex flex-col items-start justify-between overflow-hidden bg-c-black">
        {/* Hero Section */}
        <div
          className="relative min-h-[30rem] max-h-auto w-full flex md:flex-row sm:flex-col xs:flex-col sm:space-y-2.5 xs:space-y-3 md:items-end xs:items-center justify-around text-white rounded-lg"
          style={{
            backgroundImage: `
              linear-gradient(to bottom left, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)),
              url(${details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : '/placeholder-movie.jpg'
              })
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        >
          <h1 className='md:absolute md:top-0 mx-auto sm:relative xs:relative flex md:text-xl font-semibold capitalize italic bg-c-black rounded-b-xl p-2'>{details.tagline || details.title}</h1>

          {/* Movie Poster */}
          <img
            className="w-56 h-82 relative md:top-0 md:left-3.5 object-cover contrast-110 brightness-105 saturate-110 rounded-lg capitalize"
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : '/placeholder-movie.jpg'
            }
            alt={details.title || details.name}
          />

          {/* Hero Section Details */}
          <div className="md:w-1/2 sm:w-full xs:w-full h-auto flex flex-col relative backdrop-blur-xs shadow-md rounded-lg p-1 md:space-y-4 sm:space-y-5 xs:space-y-5">
            <h1 className="md:text-4xl sm:text-5xl xs:text-3xl font-semibold capitalize">{details.title || details.original_name || details.name}</h1>
            <ReadMore text={details.overview} />

            {/* Release Date, Runtime, Language, etc. */}
            <div className='w-auto h-auto p-1 flex flex-row space-x-5 flex-wrap space-y-2'>
              <p className='flex whitespace-nowrap flex-wrap'>{formattedReleaseDate}</p>
              <p className='flex whitespace-nowrap flex-wrap'>{formattedRuntime}</p>
              <p className='flex whitespace-nowrap flex-wrap'>{details.status}</p>
              <p className='flex whitespace-nowrap flex-wrap'>{details.origin_country?.join(' • ') || 'NCS'}</p>
              <p className='flex whitespace-nowrap flex-wrap uppercase'>{details.original_language}</p>
              {type === "tv" && (
                <>
                  <p className='flex whitespace-nowrap flex-wrap capitalize'>
                    Season {details.last_episode_to_air?.season_number || "N/A"}
                  </p>
                  <p className='flex whitespace-nowrap flex-wrap capitalize'>
                    Total Episodes {details.last_episode_to_air?.episode_number || "N/A"}
                  </p>
                </>
              )}
              <p className='flex whitespace-nowrap flex-wrap uppercase border-2 px-2 mb-2 rounded-sm bg-c-d-gre/70'>{certification || "N/A"}</p>
            </div>

            {/* Genres Section */}
            <div className='w-auto h-auto p-1 flex flex-col space-y-5'>
              <h2 className="text-2xl font-semibold text-c-red">Genres</h2>
              <div className='w-auto h-auto flex flex-row space-x-5 flex-wrap'>
                {details.genres?.map((genre) => (
                  <p key={genre.id} className="bg-c-black rounded-lg px-1.5 text-c-white">
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Rating Bar, Play Trailer, and Watchlist */}
          <div className="w-auto h-auto flex md:flex-col sm:flex-row xs:flex-row md:space-y-2.5 sm:space-x-4 xs:space-x-5.5 md:items-start md:flex xs:mt-3.5 sm:mt-3.5">
            <Ratingbar
              value={details.vote_average?.toFixed(1)}
              text={"Rating"}
              className="absolute top-1 left-1"
            />
            <div className="flex flex-row justify-center items-start w-auto h-auto">
              {/* Play Trailer Button */}
              <Button
                icon={SiGoogledisplayandvideo360}
                label="Play Trailer"
                onClick={() => setShowTrailer(true)}
                Text="Play Trailer"
                iconClassName="hover:fill-c-red hover:scale-110 transition-all duration-300 cursor-pointer xs:mt-1.5 sm:mt-1.5 md:ml-1.5 text-emerald-400 drop-shadow-2xl drop-shadow-emerald-400"
              />

              {/* Modal */}
              {showTrailer && (
                <TrailerModal
                  trailerKey={trailerKey}
                  onClose={() => setShowTrailer(false)}
                />
              )}
            </div>

            {/* Bookmark Button */}
            <Button
              icon={MdBookmarkAdd}
              label={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              onClick={handleBookmarkClick}
              Text={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              iconClassName={`size-11 mt-1 ${isInWatchlist ? 'text-c-red' : 'text-c-white'} cursor-pointer hover:fill-c-red hover:scale-110 transition-all duration-300 cursor-pointer`}
            />

            <SocialShare url={currentUrl} title={details.title || details.original_name || details.name} />
          </div>
        </div>

        {/* Cast Section */}
        <div className="px-4 py-6 bg-c-dark-grey w-full h-auto flex flex-col items-start justify-between overflow-hidden">
          <CastCarousel cast={credits.cast} />
        </div>

        {/* Seasons Section */}
        {type === "tv" && (
          <div className="px-4 py-6 bg-c-dark-grey w-full h-auto flex flex-col items-start justify-between overflow-hidden">
            <h2 className="text-2xl font-semibold text-c-white capitalize mb-4">all seasons</h2>
            <div className="w-full h-auto flex flex-col space-y-5 flex-wrap">
              {details.seasons?.map((season) => (
                <div key={season.id} className="w-auto md:h-60 xs:h-auto flex md:flex-row xs:flex-col relative md:space-x-6 xs:space-y-4 shadow-md shadow-c-d-grey">
                  <span className='relative w-auto h-60 flex flex-shrink-0'>
                    <img
                      src={
                        season.poster_path
                          ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                          : '/placeholder-movie.jpg'
                      }
                      alt={season.name}
                      className="w-40 h-full object-cover rounded-lg"
                    />
                    <Ratingbar
                      value={details.vote_average?.toFixed(1)}
                      className="absolute top-1 left-1"
                    />
                  </span>

                  <div className="relative w-auto h-full bg-c-black/70 rounded-lg flex flex-col justify-start items-start text-c-white">
                    <h2 className="text-xl font-semibold text-c-white mb-2">{season.name}</h2>
                    <ReadMore text={season.overview} />
                    <p className="text-sm text-c-l-grey">
                      {season.air_date ? formatDateWithDot(season.air_date) : 'N/A'}
                    </p>
                    <p className="text-sm text-c-l-grey">{season.episode_count} Episodes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies or TV Shows Section */}
        <div className='px-4 py-6 bg-c-dark-grey w-full h-auto flex flex-col items-start justify-between overflow-hidden'>
          <h2 className="text-2xl font-semibold text-c-white capitalize">more like this</h2>
          <FSimilarMovies movieId={id} mediaType={type} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PageDetails;