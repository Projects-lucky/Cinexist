// This component renders a scrollable frame of TV show cards with dynamic height adjustment and hover effects.
// It provides an interactive and visually appealing way to display a list of TV shows with smooth animations and navigation controls.

// Props:
// - cards: An array of TV show objects to be displayed as cards.
// - genres: An array of genres used to categorize or label the TV shows.
// - title: A string representing the title of the card frame section.

// Why: This component is designed to enhance the user experience by allowing users to scroll through TV show cards
// with smooth animations, hover effects, and dynamic height adjustments based on the hovered card.
// It also includes navigation buttons for easier scrolling.

// Key Features:
// - Dynamic height adjustment: The container height changes based on the hovered card to improve visual alignment.
// - Smooth scrolling: Users can scroll through the cards using navigation buttons or by dragging.
// - Hover effects: Cards respond to hover events, providing an interactive experience.
// - Animation: Uses `framer-motion` for smooth animations when cards are added, removed, or hovered.

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TvShowCard from './TvShowCard';

const CardFrameTvShows = ({ cards, genres, title }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Tracks the index of the hovered card
  const [containerHeight, setContainerHeight] = useState('auto'); // Manages the dynamic height of the container
  const scrollRef = useRef(null); // Reference to the scrollable container
  const cardRefs = useRef([]); // References to individual card elements

  // Initialize card refs to match the number of cards
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, cards.length);
  }, [cards]);

  // Handles scrolling in the specified direction
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Adjusts the container height based on the hovered card
  useEffect(() => {
    if (hoveredIndex !== null && cardRefs.current[hoveredIndex]) {
      const hoveredCard = cardRefs.current[hoveredIndex];
      const hoveredHeight = hoveredCard.getBoundingClientRect().height;
      setContainerHeight(`${hoveredHeight + 40}px`);
    } else {
      setContainerHeight('auto');
    }
  }, [hoveredIndex]);

  return (
    <div className="relative w-full px-12 bg-c-d-grey">
      <h2 className="text-2xl font-semibold capitalize text-c-l-grey my-4">{title}</h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Container with dynamic height */}
      <motion.div
        className="overflow-hidden"
        animate={{ height: containerHeight }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      >
        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex space-x-1 overflow-x-scroll py-4 px-2 scrollbar-hide transition-all duration-300 ease-in-out"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-10"
              >
                <TvShowCard key={card.id} movies={card} genres={genres} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CardFrameTvShows;