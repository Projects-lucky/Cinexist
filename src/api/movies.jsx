import axios from "axios";
import { API_KEY, BASE_URL } from "./config";

// Centralized API fetch logic (Using Axios)
const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params },
    });
    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error.message);
    return null;
  }
};



//  Movie Functions
export const getPopularMovies = () => fetchFromTMDB("/movie/popular");
export const getMovieDetails = (id) => fetchFromTMDB(`/movie/${id}`);
export const getMoviesByCategory = (category) => fetchFromTMDB(`/movie/${category}`);
export const getMovieTrailer = async (movieId) => {
  const data = await fetchFromTMDB(`/movie/${movieId}/videos`);
  return data?.results || [];
};



//  Genre Functions
export const getMovieGenresList = () => fetchFromTMDB("/genre/movie/list");
export const getMoviesByGenre = (genreId, page = 1) => fetchFromTMDB("/discover/movie", { with_genres: genreId, page, sort_by: "popularity.desc" });

//  TV Functions
export const getTVGenres = () => fetchFromTMDB("/genre/tv/list");
export const getTVShowsByGenre = (genreId, page = 1) => fetchFromTMDB("/discover/tv", { with_genres: genreId, page });
export const getPopularTVShows = () => fetchFromTMDB("/tv/popular");
export const getTVSeasons = (tvId) => fetchFromTMDB(`/tv/${tvId}`);
export const getTvShowTrailer = async (movieId) => {
  const data = await fetchFromTMDB(`/tv/${movieId}/videos`);
  return data?.results || [];
};
//  Search Functions
export const searchTvShows = (query, page = 1) => fetchFromTMDB("/search/tv", { query, page, include_adult: false });
export const searchMovies = (query, page = 1) => fetchFromTMDB("/search/movie", { query, page, include_adult: false });
export const multiSearch = (query, page = 1) => fetchFromTMDB("/search/multi", { query, page, include_adult: false });


// All Trending Content (Movies & TV Shows)
export const getTrendingContent = (timeWindow = "week") => fetchFromTMDB(`/trending/all/${timeWindow}`);


//  Fetch Upcoming & Top Rated Movies (Fixed)
export const getUpcomingMovies = (page = 1) => fetchFromTMDB("/movie/upcoming", { page });
export const getTopRatedMovies = (page = 1) => fetchFromTMDB("movie/top_rated", { page });



export const getMovieRating = async (movieId, country = "US") => {
  const data = await fetchFromTMDB(`/movie/${movieId}/release_dates`);
  const countryData = data?.results?.find(
    (entry) => entry.iso_3166_1 === country
  );
  const certification = countryData?.release_dates?.[0]?.certification;
  return certification || "N/A";
};

export const getTVShowRating = async (tvId) => {
  const response = await fetchFromTMDB(`/tv/${tvId}/content_ratings`);
  if (!response || !response.results) return "N/A";

  const usRating = response.results.find((item) => item.iso_3166_1 === "US");
  return usRating ? usRating.rating : response.results[0]?.rating || "Not Rated";
};



// Fetch tending content
export const getTrendingMovies = (timeWindow = "day") => fetchFromTMDB(`/trending/movie/${timeWindow}`);
export const getTrendingTVShows = (timeWindow = "day") => fetchFromTMDB(`/trending/tv/${timeWindow}`);
export const getTrendingAll = (timeWindow = "day") => fetchFromTMDB(`/trending/all/${timeWindow}`);


// Fetch movie credits (cast & crew)
export const getMovieCredits = (movieId) => fetchFromTMDB(`/movie/${movieId}/credits`);
// Fetch similar movies
export const getSimilarMovies = (movieId) => fetchFromTMDB(`/movie/${movieId}/similar`);
// Fetch movie reviews
export const getMovieReviews = (movieId) => fetchFromTMDB(`/movie/${movieId}/reviews`);


// Fetch combined details (optimized for details page)
export const getMovieFullDetails = async (movieId) => {
  const [details, credits, similar, reviews] = await Promise.all([
    getMovieDetails(movieId),
    getMovieCredits(movieId),
    getSimilarMovies(movieId),
    getMovieReviews(movieId),
  ]);
  return { details, credits, similar, reviews };
};


// TV Show APIs (parallel to movie APIs)
export const getTVDetails = (tvId) => fetchFromTMDB(`/tv/${tvId}`);
export const getTVCredits = (tvId) => fetchFromTMDB(`/tv/${tvId}/credits`);
export const getSimilarTVShows = (tvId) => fetchFromTMDB(`/tv/${tvId}/similar`);

export const getTVFullDetails = async (tvId) => {
  const [details, credits, similar, reviews] = await Promise.all([
    getTVDetails(tvId),
    getTVCredits(tvId),
    getSimilarTVShows(tvId),
    fetchFromTMDB(`/tv/${tvId}/reviews`), // Replace with the correct endpoint if reviews exist
  ]);
  return { details, credits, similar, reviews };
};