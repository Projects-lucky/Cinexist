// This component renders a dynamic and interactive carousel to showcase movies.
// It includes features like auto-advancing slides, hover effects, trailer playback, and navigation controls.

// Props:
// - movies: An array of movie objects to display in the carousel. Each object should include:
//   - id: The unique identifier for the movie.
//   - title: The title of the movie.
//   - backdrop_path: The URL path for the backdrop image.
//   - release_date: The release date of the movie.
//   - vote_average: The average rating of the movie.
//   - overview: A brief description of the movie.
// - loading: A boolean indicating whether the data is still loading (default: false).

// Why: This component is designed to provide a visually engaging and interactive way to display movies,
// enhancing the user experience with smooth animations, trailer previews, and navigation options.

// Key Features:
// - Auto-advancing slides: Automatically transitions between movies every 4 seconds.
// - Hover effects: Pauses auto-advancing and reveals navigation controls when hovered.
// - Trailer playback: Allows users to play the trailer directly within the carousel.
// - Navigation controls: Includes left/right arrows and progress indicators for manual navigation.
// - Watchlist integration: Lets users add or remove movies from their watchlist.
// - Responsive design: Adapts to various screen sizes for an optimal viewing experience.

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight, FaStar, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TvCardTrailerModal from '../components/TvCardTrailerModal';
import { useTrailer } from '../hooks/useMovies';
import { useWatchlist } from '../context/WatchlistContext';

const MovieCarousel = ({ movies, loading = false }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const videoRef = useRef(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const currentMovie = movies[currentIndex];

  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isInWatchlist = watchlist.some(item => item.id === currentMovie?.id);

  const { trailerKey } = useTrailer(currentMovie?.id);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && movies?.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, movies?.length]);

  const handleBookmarkClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(currentMovie.id);
    } else {
      addToWatchlist(currentMovie);
    }
  };

  const handlePlayTrailer = (e) => {
    e.stopPropagation();
    if (trailerKey) {
      setShowTrailer((prev) => !prev);
    } else {
      alert('Trailer not available for this movie.');
    }
  };

  const handleCardClick = () => {
    navigate(`/pageDetails/${currentMovie.id}?type=movie`);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        No movies available
      </div>
    );
  }

  return (
    <div
      className="relative w-full lg:h-screen md:h-[60vh] sm:h-96 xs:h-72 overflow-hidden bg-black rounded-lg z-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          onClick={handleCardClick}
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {showTrailer && trailerKey ? (
            <TvCardTrailerModal trailerKey={trailerKey} onClose={() => setShowTrailer(false)} />
          ) : (
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
              alt={currentMovie.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Movie Info */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-8 md:p-12 z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl font-bold text-white mb-2">
            {currentMovie.title}
          </h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="text-white/80">
              {currentMovie.release_date?.split('-')[0] || 'N/A'}
            </span>
            <span className="text-white/80">|</span>
            <span className="flex items-center gap-1 text-white/80">
              <FaStar className="text-yellow-400" />
              {currentMovie.vote_average?.toFixed(1) || 'N/A'}
            </span>
          </div>
          <p className="text-lg text-white/80 mb-6 line-clamp-2">
            {currentMovie.overview || 'No description available'}
          </p>
          <div className="flex gap-4 relative flex-row items-center w-auto h-auto flex-wrap">
            <button
              className="lg:px-6 lg:py-3 md:px-4 md:py-3 sm:px-2 sm:py-3 xs:px-1 xs:py-2 md:text-lg xs:text-xs bg-white text-black rounded-md flex items-center gap-2 font-bold hover:bg-white/90 transition-all"
              onClick={handlePlayTrailer}
            >
              <FaPlay /> {showTrailer ? 'PAUSE' : 'PLAY TRAILER'}
            </button>
            <button
              onClick={handleCardClick}
              className="md:px-6 md:py-3 xs:p-2 md:text-lg xs:text-xs bg-white/10 backdrop-blur-sm text-white rounded-md flex items-center gap-2 hover:bg-white/20 transition-all"
            >
              <FaInfoCircle /> DETAILS
            </button>
            <button
              className="md:px-4 md:py-3 xs:p-2 xs:text-xs md:text-lg bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center gap-2 hover:bg-white/20 transition-all"
            >
              <FaPlus
                className={`${isInWatchlist ? 'fill-c-red' : 'fill-c-l-grey'}`}
                onClick={handleBookmarkClick}
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <motion.div
        className="absolute top-1/2 left-4 right-4 flex justify-between z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)}
          className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all hover:ring-2 hover:ring-c-red active:ring-c-white"
        >
          <FaChevronLeft className="text-white text-xl" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % movies.length)}
          className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all hover:ring-2 hover:ring-c-red active:ring-c-white"
        >
          <FaChevronRight className="text-white text-xl" />
        </button>
      </motion.div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="relative h-1 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 20, backgroundColor: '#ffffff30' }}
              animate={{
                width: index === currentIndex ? 40 : 20,
                backgroundColor: index === currentIndex ? '#ffffff' : '#ffffff30',
              }}
              transition={{ duration: 0.3 }}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-c-red"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                />
              )}
            </motion.div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;