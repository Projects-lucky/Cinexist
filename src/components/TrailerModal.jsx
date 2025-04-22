// This component renders a modal to display a YouTube trailer video.
// It includes animations for opening and closing the modal and a close button for user interaction.

// Props:
// - trailerKey: A string representing the YouTube video key for the trailer.
// - onClose: A function to handle the closing of the modal.
// - text: An optional string for additional context or description (not currently used in the implementation).

// Why: This component is designed to enhance the user experience by providing a visually appealing and interactive way
// to view trailers directly within the application without navigating to external platforms.

// Key Features:
// - Modal functionality: Displays a full-screen modal with a dark overlay.
// - YouTube integration: Embeds a YouTube video using the provided trailer key.
// - Close button: Allows users to close the modal with a visually distinct button.
// - Animations: Smooth fade-in and fade-out animations for opening and closing the modal.

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from "react-icons/fa";

const TrailerModal = ({ trailerKey, onClose, text }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-10 bg-black/90 flex items-center justify-center"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl hover:text-red-500"
        >
          <FaTimes />
        </button>
        
        {/* Trailer Video */}
        <div className="w-full h-auto relative max-w-4xl aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&disablekb=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            className="w-full h-full object-cover absolute rounded-lg"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TrailerModal;