// This is a reusable Button component that supports icons, labels, and tooltips.
// It is designed to be flexible and customizable through props for styling and behavior.

// Props:
// - icon: A React component for the button's icon (optional).
// - label: A string or element to display as a label (optional).
// - Text: A string or element to display as a tooltip when the button is hovered (optional).
// - onClick: A function to handle the button's click event (optional).
// - buttonClassName: Additional CSS classes for the button element (default: empty string).
// - iconClassName: Additional CSS classes for the icon element (default: empty string).
// - labelClassName: Additional CSS classes for the label span (default: empty string).
// - textClassName: Additional CSS classes for the tooltip text (default: empty string).

// Why: This component provides a consistent and customizable button UI across the application.
// It supports hover effects, tooltips, and dynamic content, making it versatile for various use cases.

export default function Button({
  icon: Icon,
  label,
  Text,
  onClick,
  buttonClassName = "",       // Default empty string if not provided
  iconClassName = "",         // For the Icon component
  labelClassName = "",        // For the label span
  textClassName = "",         // For the tooltip text
}) {
  return (
    <button
      onClick={onClick}
      className={`w-auto h-auto flex flex-col decoration-0 group relative ${buttonClassName}`}
    >
      {Icon && (
        <Icon className={`border-0 outline-0 text-4xl ${iconClassName}`} />
      )}
      {label && (
        <span className={`hidden ${labelClassName}`}>{label}</span>
      )}
      {Text && (
        <p className={`hidden group-hover:flex absolute top-full z-20 mt-2.5 -ml-2.5 text-c-white bg-c-black rounded p-2 whitespace-nowrap text-sm ${textClassName}`}>
          {Text}
        </p>
      )}
    </button>
  );
}