// This component renders a modal to display a YouTube trailer for a movie or TV show.
// It provides an immersive experience by overlaying the trailer on the screen with a semi-transparent background.

// Props:
// - trailerKey: A string representing the YouTube video key for the trailer.
// - onClose: A function to handle closing the modal when the user interacts outside the modal area.

// Why: This component is designed to enhance the user experience by allowing users to watch trailers
// directly within the application without navigating to an external site.

// Key Features:
// - Modal overlay: Displays the trailer in a centered modal with a darkened background.
// - Auto-close on mouse leave: Automatically closes the modal when the mouse leaves the modal area.
// - Embedded YouTube player: Uses an iframe to embed the YouTube trailer with autoplay and other configurations.

import { useRef } from "react";

const CardTrailerModal = ({ trailerKey, onClose }) => {
  const modalRef = useRef(null);

  const handleMouseLeave = (e) => {
    // Check if the mouse left the modal area
    if (!modalRef.current.contains(e.relatedTarget)) {
      onClose();
    }
  };

  return (
    <div
      className="absolute w-full h-full z-10 bg-black/90 flex items-center justify-center"
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={modalRef}
        className="w-full h-auto relative max-w-4xl aspect-video"
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&disablekb=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          className="w-full h-full object-cover absolute rounded-lg"
        />
      </div>
    </div>
  );
};

export default CardTrailerModal;