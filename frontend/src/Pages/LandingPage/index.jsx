import './index.css';
import { useNavigate } from 'react-router-dom';

const CelestialCollection = () => {
  const navigate = useNavigate();
  return (
    <div className="celestial-container">
      <div className="content-wrapper">
        <div className="left-section">
          <h1 className="main-title">Collection 2025</h1>
          <p className="description">
            Discover exquisite jewelry inspired by the beauty of the heavens. Each piece is crafted to bring elegance and grace to your most cherished occasions.
          </p>
          <button onClick={() => navigate('/auth')} className="discover-btn">
            DISCOVER →
          </button>
        </div>
        
        <div className="right-section">
          <h2 className="celestial-tagline">
            A CELESTIAL TOUCH FOR<br />
            TIMELESS MOMENTS
          </h2>
          
          <nav className="category-nav">
            <div className="nav-item">
              <span onClick={() => navigate('/auth')}>Rings</span>
              <span className="arrow">→</span>
            </div>
            <div className="nav-item">
              <span onClick={() => navigate('/auth')}>EARRINGS</span>
              <span className="arrow">→</span>
            </div>
            <div className="nav-item">
              <span onClick={() => navigate('/auth')}>NECKLACES</span>
              <span className="arrow">→</span>
            </div>
            <div className="nav-item">
              <span onClick={() => navigate('/auth')}>BRACELETS</span>
              <span className="arrow">→</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CelestialCollection;