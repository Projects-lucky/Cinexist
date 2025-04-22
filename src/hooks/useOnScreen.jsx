// This custom hook detects when an element is visible on the screen using the Intersection Observer API.
// It is useful for implementing lazy loading, animations, or triggering events when an element comes into view.

// Props:
// - ref: A React ref object pointing to the DOM element to observe.
// - rootMargin: A string specifying the margin around the root element for the intersection (default: "100px").

// Why: This hook is designed to improve performance and user experience by detecting when an element is visible
// on the screen, allowing developers to trigger actions like loading content or animations only when needed.

// Key Features:
// - Visibility detection: Tracks whether the target element is visible within the viewport.
// - One-time trigger: Disconnects the observer after the element becomes visible to optimize performance.
// - Customizable margin: Allows adjusting the root margin for fine-tuned visibility detection.

import { useEffect, useState } from "react";

const useOnScreen = (ref, rootMargin = "100px") => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, rootMargin]);

  return isVisible;
};

export default useOnScreen;