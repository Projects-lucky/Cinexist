// This component renders a modal to display a YouTube trailer video for a TV show.
// It includes functionality to automatically close the modal when the mouse leaves the modal area.

// Props:
// - trailerKey: A string representing the YouTube video key for the trailer.
// - onClose: A function to handle the closing of the modal when the mouse leaves the modal area.

// Why: This component is designed to enhance the user experience by providing a seamless and interactive way
// to view TV show trailers directly within the application without navigating to external platforms.

// Key Features:
// - Modal functionality: Displays a full-screen modal with a dark overlay.
// - YouTube integration: Embeds a YouTube video using the provided trailer key.
// - Auto-close on mouse leave: Automatically closes the modal when the mouse leaves the modal area.
// - Responsive design: Adapts to various screen sizes with a flexible aspect ratio.

import { useRef } from "react";

const TvCardTrailerModal = ({ trailerKey, onClose }) => {
  const modalRef = useRef(null);

  const handleMouseLeave = (e) => {
    // Check if the mouse left the modal area
    if (e.relatedTarget && !modalRef.current.contains(e.relatedTarget)) {
      onClose();
    }
  };

  return (
    <div
      className="absolute min-w-full min-h-full z-10 bg-black/90 flex items-center justify-center"
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={modalRef}
        className="w-full h-auto relative max-w-full aspect-video"
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&disablekb=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          className="w-full min-h-full object-cover absolute rounded-lg"
        />
      </div>
    </div>
  );
};

export default TvCardTrailerModal;