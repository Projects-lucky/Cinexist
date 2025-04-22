// This component renders the "Search" page, allowing users to search for movies and TV shows.
// It includes a search bar, category tabs, trending content, and displays search results dynamically.

// Why: This component is designed to provide a seamless search experience, enabling users to find movies or TV shows
// based on their queries or explore trending and top-rated content.

// Key Features:
// - Search bar: Allows users to input queries and search for movies or TV shows.
// - Category tabs: Enables users to filter search results by "All," "Movies," or "TV Shows."
// - Trending content: Displays trending movies, TV shows, or top-rated movies based on the selected tab.
// - Dynamic search results: Filters and displays search results based on the active category.
// - Loading and error states: Handles loading animations and displays error messages when necessary.
// - Responsive design: Adapts to various screen sizes for an optimal user experience.

import { useState, useEffect } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import {
  getTrendingMovies,
  getTrendingTVShows,
  getTopRatedMovies,
} from "../api/movies";
import NewMovieCard from "../components/NewMovieCard";
import TvShowCard from "../components/TvShowCard";
import SwitchTabs from "../components/SwitchTabs";
import SearchBar from "../components/SearchBar";
import LoaderAnim from '../components/LoaderAnim';
import Header from '../layout/header';
import Footer from '../layout/footer';

const SearchPage = () => {
  const [query, setQuery] = useState(""); // Search query
  const [activeTab, setActiveTab] = useState("All"); // Active search tab
  const [trendingTab, setTrendingTab] = useState("Trending Movies"); // Active trending tab
  const [trendingContent, setTrendingContent] = useState([]); // State to hold trending content
  const [loadingTrending, setLoadingTrending] = useState(true); // Loading state for trending content

  // Debounced search hook
  const { data: searchResults, loading, error } = useDebouncedSearch(query);

  // Fetch trending content based on the selected tab
  useEffect(() => {
    const fetchTrendingContent = async () => {
      setLoadingTrending(true);
      try {
        let results = [];
        if (trendingTab === "Trending Movies") {
          results = await getTrendingMovies();
        } else if (trendingTab === "Trending TV Shows") {
          results = await getTrendingTVShows();
        } else if (trendingTab === "Top Rated Movies") {
          results = await getTopRatedMovies();
        }
        setTrendingContent(results?.results || []);
      } catch (err) {
        console.error("Error fetching trending content:", err);
        setTrendingContent([]);
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrendingContent();
  }, [trendingTab]);

  // Filter search results based on the active tab
  const filteredResults = searchResults?.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Movies") return item.media_type === "movie";
    if (activeTab === "TV Shows") return item.media_type === "tv";
    return false;
  });

  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-start relative space-y-8 bg-c-d-grey overflow-hidden">
        <div className="w-full h-full p-2 bg-c-dark min-h-screen text-c-white">
          {/* Search Bar */}
          <div className="w-full h-auto mb-6 flex justify-center items-center">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* Search Category Tabs */}
          <div className="w-full h-auto mb-6 flex justify-center items-center">
            <SwitchTabs
              title="search category"
              options={["All", "Movies", "TV Shows"]}
              onSwitch={(tab) => setActiveTab(tab)}
            />
          </div>

          {/* Trending Content Tabs */}
          <div className="w-full h-auto mb-6 flex justify-center items-center">
            <SwitchTabs
              title="Trending Content"
              options={["Trending Movies", "Trending TV Shows", "Top Rated Movies"]}
              onSwitch={(tab) => setTrendingTab(tab)}
            />
          </div>

          {/* Single Result Box */}
          <div className="mt-4 space-y-4 w-full h-[600px] cat-grid flex flex-row flex-wrap items-center justify-center p-2 overflow-x-scroll scrollbar-hide">
            {query ? (
              // Display Search Results
              <>
                {loading && (
                  <div className="fixed inset-0 bg-black bg-opacity-50">
                    <LoaderAnim />
                    <p className="text-center absolute top-[40%] left-[50%] translate-x-[-50%]">
                      Loading...
                    </p>
                  </div>
                )}
                {error && <p className="text-red-500 text-center">Error: {error}</p>}
                {!loading && !error && (
                  <div className="w-full h-[600px] cat-grid overflow-y-scroll scrollbar-hide bg-c-red">
                    {filteredResults?.length > 0 ? (
                      filteredResults.map((item) => {
                        if (item.media_type === "movie") {
                          return <NewMovieCard key={item.id} movies={item} />;
                        } else if (item.media_type === "tv") {
                          return <NewMovieCard key={item.id} movies={item} />;
                        }
                        return null;
                      })
                    ) : (
                      <p className="text-center">No results found.</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              // Display Trending Content
              <>
                {loadingTrending && (
                  <div className="fixed inset-0 bg-black bg-opacity-50">
                    <p className="text-center absolute top-[40%] left-[50%] translate-x-[-50%]">
                      Loading...
                    </p>
                  </div>
                )}
                {!loadingTrending && trendingContent.length > 0 ? (
                  trendingContent.map((item) => {
                    if (item.media_type === "movie") {
                      return <NewMovieCard key={item.id} movies={item} />;
                    } else if (item.media_type === "tv") {
                      return <TvShowCard key={item.id} movies={item} />;
                    }
                    return null;
                  })
                ) : (
                  <p className="text-center capitalize before:content-['!'] before:text-c-red before:text-2xl before:mx-0.5 before:font-extrabold">
                    No related content found.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;