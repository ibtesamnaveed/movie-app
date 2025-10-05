import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useState } from "react"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)
    const [imageLoaded, setImageLoaded] = useState(false)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        })
    }

    const getRatingColor = (rating) => {
        if (rating >= 8) return '#4ade80'
        if (rating >= 6) return '#fbbf24'
        if (rating >= 4) return '#f97316'
        return '#ef4444'
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                {!imageLoaded && <div className="image-skeleton"></div>}
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    onLoad={() => setImageLoaded(true)}
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                />
                
                <div className="movie-overlay">
                    <div className="overlay-top">
                        <div className="movie-rating" style={{backgroundColor: getRatingColor(movie.vote_average)}}>
                            {movie.vote_average?.toFixed(1) || 'N/A'}
                        </div>
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            <span className="heart-icon">♥</span>
                            <span className="heart-pulse"></span>
                        </button>
                    </div>
                    
                    <div className="overlay-bottom">
                        <div className="movie-genres">
                            {movie.genre_ids?.slice(0, 2).map(genreId => (
                                <span key={genreId} className="genre-tag">
                                    {getGenreName(genreId)}
                                </span>
                            ))}
                        </div>
                        <button className="view-details-btn">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                    <span className="release-date">{formatDate(movie.release_date)}</span>
                    <span className="movie-language">{movie.original_language?.toUpperCase()}</span>
                </div>
                <p className="movie-overview">{movie.overview?.substring(0, 100)}...</p>
            </div>
        </div>
    )
}

// Helper function to get genre names (you might want to move this to a separate file)
function getGenreName(genreId) {
    const genres = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
        80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
        14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
        9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
        53: 'Thriller', 10752: 'War', 37: 'Western'
    }
    return genres[genreId] || 'Unknown'
}

export default MovieCard