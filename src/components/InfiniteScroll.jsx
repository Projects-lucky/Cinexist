// This component implements an infinite scrolling mechanism to dynamically load and display data as the user scrolls.
// It provides a reusable and customizable solution for fetching and rendering paginated data.

// Props:
// - fetchData: A function that fetches data for the current page. It should return a promise that resolves to an array of items.
// - renderItem: A function that renders each item in the list. It receives the item and its index as arguments.
// - loadingComponent: A React component to display while data is being loaded (default: `<div>Loading...</div>`).
// - errorComponent: A React component to display if an error occurs while fetching data (default: `<div>Error loading data</div>`).
// - emptyComponent: A React component to display if no data is available (default: `<div>No data available</div>`).
// - containerClassName: A string of additional CSS classes for the container element (default: empty string).
// - itemClassName: A string of additional CSS classes for each item element (default: empty string).
// - threshold: A number between 0 and 1 that determines how close the sentinel element must be to the viewport
//   before triggering the next data fetch (default: 0.5).

// Why: This component is designed to enhance the user experience by automatically loading more data as the user scrolls,
// reducing the need for manual pagination and providing a seamless browsing experience.

// Key Features:
// - Infinite scrolling: Automatically fetches and appends data as the user scrolls to the bottom of the list.
// - Customizable components: Allows customization of loading, error, and empty states.
// - Intersection Observer: Uses the Intersection Observer API to efficiently detect when the user reaches the end of the list.
// - Error handling: Displays an error message if data fetching fails.
// - Performance optimization: Supports lazy loading and avoids unnecessary re-renders.

import { useState, useEffect, useRef, useCallback } from 'react';

const InfiniteScroll = ({
  fetchData,
  renderItem,
  loadingComponent = <div>Loading...</div>,
  errorComponent = <div>Error loading data</div>,
  emptyComponent = <div>No data available</div>,
  containerClassName = '',
  itemClassName = '',
  threshold = 0.5,
}) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  const sentinelRef = useRef(null);

  const loadItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(false);

    try {
      const newItems = await fetchData(page);
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setHasMore(newItems.length > 0);
    } catch (err) {
      setError(true);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, fetchData]);

  useEffect(() => {
    // Initial load
    loadItems();
  }, []);

  useEffect(() => {
    if (!hasMore) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadItems();
        }
      },
      { threshold }
    );

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadItems, hasMore, threshold]);

  return (
    <div className={`infinite-scroll-container ${containerClassName}`}>
      {items.length === 0 && !loading ? (
        emptyComponent
      ) : (
        <>
          {items.map((item, index) => (
            <div key={index} className={`infinite-scroll-item ${itemClassName}`}>
              {renderItem(item, index)}
            </div>
          ))}
          
          {loading && loadingComponent}
          {error && errorComponent}
          
          {hasMore && !loading && !error && (
            <div ref={sentinelRef} style={{ height: '1px' }} />
          )}
        </>
      )}
    </div>
  );
};

export default InfiniteScroll;