// This component renders a season selector dropdown and displays the episodes of the selected season.
// It allows users to browse through seasons and view the episodes for each season dynamically.

// Props:
// - seasons: An array of season objects. Each season object is expected to have the following properties:
//   - id: The unique identifier for the season.
//   - season_number: The number of the season.
//   - episodes: An array of episode objects, where each episode object includes:
//     - id: The unique identifier for the episode.
//     - still_path: The URL path for the episode's image.
//     - name: The name of the episode.
//     - episode_number: The number of the episode within the season.

// Why: This component is designed to enhance the user experience by providing an intuitive way to navigate through
// seasons and view episode details, making it easier to explore TV show content.

// Key Features:
// - Season dropdown: Allows users to select a season from a dropdown menu.
// - Episode list: Dynamically displays the episodes of the selected season.
// - Responsive design: Adapts to various screen sizes with a grid layout for episodes.
// - Image and metadata: Displays the episode's image, name, and number for better context.

import { useState } from 'react';

const SeasonSelector = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  return (
    <div className="mb-8">
      {/* Season Dropdown */}
      <select 
        onChange={(e) => setSelectedSeason(Number(e.target.value))}
        className="bg-gray-800 text-white p-2 rounded"
      >
        {seasons?.map(season => (
          <option key={season.id} value={season.season_number}>
            Season {season.season_number}
          </option>
        ))}
      </select>

      {/* Episode List */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {seasons
          ?.find(s => s.season_number === selectedSeason)
          ?.episodes?.map(episode => (
            <div key={episode.id} className="bg-gray-800 p-4 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                alt={episode.name}
                className="rounded mb-2"
              />
              <h3 className="font-bold">{episode.name}</h3>
              <p className="text-sm text-gray-400">
                Episode {episode.episode_number}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeasonSelector;