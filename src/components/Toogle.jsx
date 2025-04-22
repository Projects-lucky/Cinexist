// This component renders a dynamic content box with a title, description, icon, and a clickable button.
// It provides a flexible and reusable UI element for displaying content with an action button.

// Props:
// - title: A string representing the title of the content box.
// - description: A string representing the description or additional details for the content box.
// - icon: A React element representing an optional icon to display alongside the title.
// - onClick: A function to handle the button click event.

// Why: This component is designed to enhance the user experience by providing a visually appealing and interactive
// content box that can be reused across different parts of the application for various purposes.

// Key Features:
// - Icon support: Displays an optional icon next to the title.
// - Action button: Includes a button with customizable functionality via the `onClick` prop.
// - Responsive design: Adapts to various layouts and screen sizes.
// - Hover effects: Provides visual feedback when interacting with the button.

const DynamicContentBox = ({ title, description, icon, onClick }) => {
  return (
    <div className="w-auto h-auto flex flex-col decoration-0 group relative">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-gray-600">{description}</p>
      <button
        onClick={onClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Click Me
      </button>
    </div>
  );
};

export default DynamicContentBox;