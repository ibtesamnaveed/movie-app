import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <div className="favorites-header">
          <div className="favorites-title-section">
            <h1 className="favorites-title">
              <span className="title-icon">❤️</span>
              Your Favorite Movies
            </h1>
            <p className="favorites-subtitle">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} in your collection
            </p>
          </div>
          
          <div className="favorites-stats">
            <div className="stat-card">
              <span className="stat-number">{favorites.length}</span>
              <span className="stat-label">Total Movies</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {favorites.reduce((acc, movie) => acc + (movie.vote_average || 0), 0) / favorites.length || 0}
              </span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        <div className="favorites-content">
          <div className="movies-grid">
            {favorites.map((movie, index) => (
              <div 
                key={movie.id} 
                className="favorite-movie-wrapper"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <div className="empty-state-container">
        <div className="empty-state-icon">
          <div className="heart-animation">💔</div>
        </div>
        
        <div className="empty-state-content">
          <h2 className="empty-title">No Favorite Movies Yet</h2>
          <p className="empty-description">
            Start exploring amazing movies and add them to your favorites. 
            They'll appear here for easy access!
          </p>
          
          <div className="empty-actions">
            <Link to="/" className="explore-button">
              <span className="button-icon">🎬</span>
              Explore Movies
            </Link>
          </div>
        </div>
        
        <div className="empty-state-features">
          <div className="feature-item">
            <span className="feature-icon">⭐</span>
            <span className="feature-text">Rate your favorite movies</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <span className="feature-text">Search and discover new films</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💾</span>
            <span className="feature-text">Save your personal collection</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;