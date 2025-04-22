// This component renders a tab switcher with multiple options, allowing users to toggle between different views or categories.

// Props:
// - title: A string representing the title of the tab switcher.
// - options: An array of strings representing the tab options (default: empty array).
// - onSwitch: A function to handle the tab switch event. It receives the selected option as an argument.

// Why: This component is designed to enhance the user experience by providing an intuitive and interactive way
// to switch between different categories or views, such as movies, TV shows, or other content types.

// Key Features:
// - Dynamic tab switching: Updates the active tab and triggers the `onSwitch` callback when a tab is clicked.
// - Highlighted active tab: Visually distinguishes the active tab for better user feedback.
// - Responsive design: Adapts to various layouts and screen sizes.
// - Hover effects: Provides visual feedback when hovering over inactive tabs.

import { useState } from "react";

const SwitchTabs = ({ title, options = [], onSwitch }) => {
  const [active, setActive] = useState(0);

  const handleSwitch = (index) => {
    setActive(index);
    onSwitch(options[index]);
  };

  return (
    <div className="mb-4 flex flex-col">
      {/* Title */}
      <h2 className="text-xl font-bold text-c-white mb-2 text-center">{title}</h2>

      {/* Switch Buttons */}
      <div className="flex gap-2 flex-row w-auto h-auto">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => handleSwitch(index)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              active === index
                ? "bg-c-red text-c-white"
                : "bg-c-d-grey text-c-white hover:bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwitchTabs;