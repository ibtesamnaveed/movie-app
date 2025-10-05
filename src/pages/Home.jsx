import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setTrendingMovies(popularMovies.slice(0, 5)); // First 5 for hero section
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (searchLoading) return

    setSearchLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setSearchLoading(false)
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setMovies(trendingMovies);
    setError(null);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Amazing Movies
            <span className="hero-subtitle">Find your next favorite film</span>
          </h1>
          
          <form onSubmit={handleSearch} className="hero-search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search for movies, actors, directors..."
                className="hero-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hero-search-button" disabled={searchLoading}>
                {searchLoading ? (
                  <div className="search-spinner"></div>
                ) : (
                  <span>🔍</span>
                )}
              </button>
              {searchQuery && (
                <button type="button" className="clear-search-button" onClick={clearSearch}>
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Trending Movies Carousel */}
          {!searchQuery && trendingMovies.length > 0 && (
            <div className="trending-section">
              <h3>🔥 Trending Now</h3>
              <div className="trending-carousel">
                {trendingMovies.map((movie, index) => (
                  <div key={movie.id} className="trending-movie" style={{animationDelay: `${index * 0.1}s`}}>
                    <img 
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                      alt={movie.title}
                      loading="lazy"
                    />
                    <div className="trending-overlay">
                      <h4>{movie.title}</h4>
                      <p>{movie.release_date?.split("-")[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content-section">
        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing movies...</p>
          </div>
        ) : (
          <>
            <div className="section-header">
              <h2>{searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}</h2>
              <p>{movies.length} movies found</p>
            </div>
            
            <div className="movies-grid">
              {movies.map((movie, index) => (
                <div key={movie.id} style={{animationDelay: `${index * 0.05}s`}}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;