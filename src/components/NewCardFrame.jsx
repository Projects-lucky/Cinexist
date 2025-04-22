// This component renders a horizontal slider carousel to display a list of movies.
// It supports drag-to-scroll functionality, navigation buttons, and hover effects for interactivity.

// Props:
// - Stitle: A string representing the title of the carousel section (default: "Movies").
// - Sgenres: An array of genres used to categorize or label the movies (default: empty array).
// - Smovies: An array of movie objects to be displayed in the carousel (default: empty array).

// Why: This component is designed to provide a visually appealing and interactive way to display a list of movies,
// enhancing the user experience with smooth scrolling, drag-to-scroll functionality, and responsive design.

// Key Features:
// - Drag-to-scroll: Allows users to drag the carousel to scroll through the movies.
// - Navigation buttons: Includes left and right buttons for smooth scrolling by multiple cards.
// - Responsive design: Adapts to various screen sizes for an optimal viewing experience.
// - Hover effects: Highlights individual movie cards when hovered.
// - Empty state: Displays a message if no movies are available.

import React, { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import NewMovieCard from './NewMovieCard';

const SliderCarousel = ({ Stitle = 'Movies', Sgenres = [], Smovies = [] }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag-to-scroll handlers
  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - startX;
    sliderRef.current.scrollLeft = scrollLeft - x;
  };

  // Navigation button handlers
  const scrollTo = (direction) => {
    const slider = sliderRef.current;
    const cardWidth = slider.scrollWidth / Smovies.length;
    const scrollAmount = cardWidth * 4; // Scroll by 4 cards
    
    slider.scrollTo({
      left: direction === 'left' 
        ? slider.scrollLeft - scrollAmount 
        : slider.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full max-w-[1940px] h-64 mx-auto px-4 mt-6">
      <div className="flex items-center justify-between mb-4 py-2">
        <h2 className="text-2xl font-bold text-white">{Stitle}</h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => scrollTo('left')}
            className="p-2 rounded-full bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={sliderRef.current?.scrollLeft === 0}
          >
            <FaChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          
          <button
            onClick={() => scrollTo('right')}
            className="p-2 rounded-full bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={sliderRef.current?.scrollLeft + sliderRef.current?.clientWidth >= sliderRef.current?.scrollWidth}
          >
            <FaChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab space-x-8.5 relative" 
        onMouseDown={startDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onMouseMove={onDrag}
        onTouchStart={startDragging}
        onTouchEnd={stopDragging}
        onTouchMove={onDrag}
      >
        {Smovies.length === 0 ? (
          <p className="py-4 text-white">No movies available</p>
        ) : (
          Smovies.map((movie, index) => (
            <div key={movie.id || index} className="flex-shrink-0 w-[300px] relative hover:z-10">
              <NewMovieCard
                movies={movie}
                genres={Sgenres}
                Index={index}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SliderCarousel;