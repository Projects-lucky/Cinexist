// This component renders a text block with a "Read More" or "Read Less" toggle functionality.
// It allows users to expand or collapse long text content dynamically.

// Props:
// - text: A string representing the text content to be displayed.
// - maxLines: A number specifying the maximum number of lines to display when the text is collapsed (default: 2).

// Why: This component is designed to enhance the user experience by providing a clean and interactive way
// to display lengthy text content, allowing users to expand or collapse it as needed.

// Key Features:
// - Expand/collapse functionality: Toggles between showing a limited number of lines and the full text.
// - Line clamping: Uses CSS `line-clamp` for modern browsers and fallback styles for compatibility.
// - Interactive button: Provides a "Read More" or "Read Less" button for user interaction.
// - Responsive design: Adapts to various layouts and screen sizes.

import { useState } from 'react';

const ReadMore = ({ text, maxLines = 2 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-prose">
      {/* Text Content */}
      <div 
        className={`overflow-hidden ${isExpanded ? '' : 'line-clamp-2'}`}
        style={{ 
          // Fallback for browsers that don't support line-clamp
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: isExpanded ? 'unset' : maxLines
        }}
      >
        {text}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleExpand}
        className="text-blue-600 hover:text-blue-800 mt-1 text-sm font-medium focus:outline-none"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};

export default ReadMore;