export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
  },
};

// Add this debug check at the top of your file
console.log("TMDB API Key from env:", process.env.EXPO_PUBLIC_MOVIE_API_KEY); 

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error("TMDB API Key is missing - check your .env file");
    }

    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_CONFIG.API_KEY}`
      : `${TMDB_CONFIG.BASE_URL}/movie/popular?api_key=${TMDB_CONFIG.API_KEY}`;

    console.log("Making request to:", endpoint); // Debug

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("TMDB API Error:", errorData);
      throw new Error(errorData.status_message || "Failed to fetch movies");
    }

    return await response.json().then(data => data.results);
  } catch (error) {
    console.error("Error in fetchMovies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const url = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;
    const response = await fetch(url, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || "Failed to fetch movie details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchMovieDetails:", error);
    throw error;
  }
};