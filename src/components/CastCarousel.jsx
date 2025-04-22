// This component renders a horizontal carousel to display the cast of a movie or TV show.
// It provides an interactive and visually appealing way to showcase cast members with their profile pictures, names, and roles.

// Props:
// - cast: An array of cast objects, where each object contains details such as `id`, `name`, `character`, and `profile_path`.

// Why: This component is designed to enhance the user experience by allowing users to view the cast of a movie or TV show
// in a scrollable and interactive format, with hover effects and fallback images for missing profile pictures.

// Key Features:
// - Horizontal scrolling: Users can scroll through the cast members horizontally.
// - Hover effects: Cast cards scale slightly when hovered to provide an interactive experience.
// - Fallback image: Displays a default image if a cast member's profile picture is unavailable.
// - Lazy loading: Images are loaded lazily to improve performance.

import { motion } from 'framer-motion';
import WebLogo from "../assets/icons/download (2).svg";

const CastCarousel = ({ cast }) => {
  const fallbackImage = WebLogo; // Fallback image URL

  return (
    <div className="relative px-2 py-6 bg-c-dark-grey rounded-lg w-full h-auto flex flex-col items-start justify-between overflow-hidden">
      <h2 className="text-2xl font-semibold capitalize text-c-white">casts</h2>
      <div className="overflow-x-auto py-4 scrollbar-hide w-full relative h-auto flex flex-row items-start justify-start space-x-4">
        <div className="flex gap-5">
          {cast?.slice(0, 20).map(person => (
            <motion.div 
              key={person.id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-32 text-center"
            >
              <img
                className="w-36 h-44 rounded-lg object-cover mb-2 bg-c-red"
                src={person.profile_path 
                  ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                  : fallbackImage // Use fallback image if profile_path is not available
                }
                alt={person.name}
                loading="lazy"
              />
              <p className="font-semibold text-c-white">{person.name}</p>
              <p className="text-sm text-c-l-grey">{person.character}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastCarousel;