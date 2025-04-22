// This component renders a collapsible sidebar that allows users to browse movies or TV shows by genre.
// It provides tabs for switching between movies and TV shows and dynamically fetches genres for each category.

// Why: This component is designed to enhance user experience by offering an intuitive way to explore content
// based on genres, with a responsive and interactive design for better navigation.

// Key Features:
// - Collapsible sidebar: The sidebar can be toggled open or closed, saving screen space when not in use.
// - Tabs for movies and TV shows: Allows users to switch between browsing movie genres and TV show genres.
// - Dynamic genre fetching: Fetches genres for movies and TV shows from the API on component mount.
// - Genre selection: Highlights the selected genre and triggers a callback function (`onGenreSelect`) with the selected genre ID and category.
// - Responsive design: Adapts to different screen sizes and includes smooth animations for opening and closing.
// - Interactive animations: Uses `framer-motion` for hover and tap effects on genres and smooth sidebar transitions.

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Film, Tv } from "lucide-react";
import { getMovieGenresList, getTVGenres } from "../api/movies";

const Sidebar = ({ onGenreSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("movies");
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const sidebarRef = useRef(null);

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      const [movies, tv] = await Promise.all([
        getMovieGenresList(),
        getTVGenres(),
      ]);

      if (movies?.genres) setMovieGenres(movies.genres);
      if (tv?.genres) setTVGenres(tv.genres);
    };

    fetchGenres();
  }, []);

  const genres = activeTab === "movies" ? movieGenres : tvGenres;

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative top-0 left-0 h-screen z-50">
      {/* Toggle Button */}
      <div className="absolute top-6 left-0 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className={`bg-c-red hover:bg-red-600 text-white rounded-r-full px-4 py-2 shadow-lg transition-transform duration-300 ${
            isOpen ? "hidden" : "block"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onMouseLeave={handleMouseLeave}
            className="w-72 h-full bg-gradient-to-b from-black via-zinc-900 to-black text-white shadow-xl p-4 flex flex-col space-y-4"
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-c-red hover:bg-red-600 p-2 rounded-full text-white shadow"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex justify-around">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === "movies"
                    ? "bg-c-red text-black"
                    : "hover:bg-zinc-800"
                }`}
                onClick={() => setActiveTab("movies")}
              >
                <Film className="w-5 h-5" />
                Movies
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === "tv"
                    ? "bg-c-red text-black"
                    : "hover:bg-zinc-800"
                }`}
                onClick={() => setActiveTab("tv")}
              >
                <Tv className="w-5 h-5" />
                TV Shows
              </button>
            </div>

            {/* Genres */}
            <div className="overflow-y-auto mt-2 pr-2 flex-1 scrollbar-hide">
              <ul className="space-y-2">
                {genres && genres.length > 0 ? (
                  genres.map((genre) => (
                    <motion.li
                      key={genre.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedGenreId(genre.id);
                        onGenreSelect(genre.id, activeTab);
                      }}
                      className={`p-2 rounded-md cursor-pointer transition-all ${
                        selectedGenreId === genre.id
                          ? "bg-c-red text-black"
                          : "hover:bg-zinc-800"
                      }`}
                    >
                      {genre.name}
                    </motion.li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm italic">Loading genres...</li>
                )}
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;