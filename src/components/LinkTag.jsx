// This component renders a customizable link with an optional icon and tooltip.
// It provides an interactive and visually appealing way to navigate to different sections of the application.

// Props:
// - icon: A React component for the link's icon (optional).
// - Text: A string or element to display as a tooltip when the link is hovered (optional).
// - href: A string representing the URL or route to navigate to.

// Why: This component is designed to enhance the user experience by combining navigation functionality with
// interactive hover effects and tooltips, making it more intuitive and visually engaging.

// Key Features:
// - Icon support: Displays an icon if provided.
// - Tooltip: Shows a tooltip with additional information when the link is hovered.
// - Responsive design: Works well in various layouts and screen sizes.

import { Link } from 'react-router-dom';

export default function LinkTag({ icon: Icon, Text, href }) {
  return (
    <Link to={href} className="w-auto h-auto flex flex-col decoration-0 group relative">
      {Icon && (
        <Icon className="border-0 outline-0 text-4xl fill-c-white size-2/3 relative" />
      )} {/* Render Icon if provided */}
      {Text && (
        <p className="hidden group-hover:flex absolute top-full mt-2.5 -ml-2.5 text-c-white bg-c-d-grey rounded p-2 whitespace-nowrap">
          {Text}
        </p>
      )} {/* Tooltip (Shows on Hover) */}
    </Link>
  );
}