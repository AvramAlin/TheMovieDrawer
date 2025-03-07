// api/tmdb.js
import axios from "axios";

import { BASE_URL, API_KEY } from "../keys";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(
      "Error fetching popular movies:",
      error.response?.data || error.message
    );
    return [];
  }
};

export async function getTopRatedMovies(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (err) {
    console.error(
      "Error fetching top rated movies",
      err.response?.data || err.message
    );
    return [];
  }
}

export async function getNowPlayingMovies(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (err) {
    console.error(
      "Error fetching now playing movies",
      err.response?.data || err.message
    );
    return [];
  }
}

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    const movies = response.data.results;
    const today = new Date();
    const filteredMovies = movies.filter(
      (movie) => new Date(movie.release_date) > today
    );
    // const sortedMovies = filteredMovies.sort(
    //   (a, b) => b.popularity - a.popularity
    // );
    return filteredMovies;
  } catch (error) {
    console.error(
      "Error fetching upcoming movies:",
      error.response?.data || error.message
    );
    return [];
  }
};

export async function getMovieDetails(id) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching movie details",
      error.response?.data || error.message
    );
  }
}

export async function getMovieCredits(id) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching movie details",
      error.response?.data || error.message
    );
  }
}

export async function getSimilarMovies(id, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(
      "Error fetching movie details",
      error.response?.data || error.message
    );
  }
}

export async function getSearchedMovies(searchQuery, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: searchQuery,
        page,
      },
    });
    // console.log(response.data.results);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch search results:", error);
  }
}
