import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    const location = useLocation();
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="navbar-logo" role="img" aria-label="movie">🎬</span>
                    <Link to="/" className="brand-link">
                        <span className="brand-text">Movie</span>
                        <span className="brand-accent">Hub</span>
                    </Link>
                </div>
                
                <div className="navbar-links">
                    <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        <span className="nav-icon">🏠</span>
                        <span className="nav-text">Home</span>
                    </Link>
                    <Link 
                        to="/favorites" 
                        className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                    >
                        <span className="nav-icon">❤️</span>
                        <span className="nav-text">Favorites</span>
                    </Link>
                </div>
                
                <div className="navbar-actions">
                    <button className="theme-toggle" aria-label="Toggle theme">
                        <span className="theme-icon">🌙</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar