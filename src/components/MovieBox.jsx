// This component renders a styled box to display information about a movie or TV show.
// It includes an image, title, media type, rating, and hover effects for interactivity.

// Props:
// - item: An object containing details about the movie or TV show. Expected properties include:
//   - poster_path: The URL path for the poster image.
//   - title: The title of the movie (optional).
//   - name: The name of the TV show (optional).
//   - media_type: A string indicating whether the item is a "movie" or "tv".
//   - vote_average: A number representing the average rating of the item.

// Why: This component is designed to provide a visually appealing and interactive way to display
// movie or TV show details, enhancing the user experience with hover effects and responsive design.

// Key Features:
// - Poster image: Displays the movie or TV show's poster, with a placeholder if no image is available.
// - Media type indicator: Shows whether the item is a movie or TV show.
// - Rating display: Displays the average rating with a star icon.
// - Hover effect: Scales the box slightly when hovered for a dynamic appearance.

import NewMovieCard from './NewMovieCard';

const MovieBox = ({ item }) => {
  if (!item) return null;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 transition-transform transform hover:scale-105">
      <img
        src={item.poster_path 
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
          : "https://via.placeholder.com/500x750"} // Placeholder if no image
        alt={item.title || item.name}
        className="w-full h-72 object-cover rounded-lg"
      />
      <div className="mt-2 text-white">
        <h3 className="text-lg font-semibold">
          {item.title || item.name}
        </h3>
        <p className="text-gray-400 text-sm">
          {item.media_type === "movie" ? "🎬 Movie" : "📺 TV Show"}
        </p>
        <p className="text-yellow-400 font-bold">⭐ {item.vote_average?.toFixed(1) || "N/A"}</p>
      </div>
      <h1 className="text-center w-full">This is content box</h1>
    </div>
  );
};

export default MovieBox;