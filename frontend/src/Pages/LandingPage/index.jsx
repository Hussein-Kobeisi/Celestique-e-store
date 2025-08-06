import React from 'react';
import './index.css';
import hand from '../../assets/hand.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">🔷 CELESTIQUE</div>
        <nav className="nav">
          <a href="#how-it-works">How It Works</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-icons">
          <div className="icon-circle">
            <span>👤</span>
          </div>
          <div className="icon-circle">
            <span>🛍️</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">CELESTIQUE</h1>
          <div className="hero-subtitle">A CELESTIAL TOUCH FOR TIMELESS MOMENTS</div>
          
          <div className="collection-info">
            <h2>Collection<br />2025</h2>
            <p>Discover exquisite jewelry inspired by the beauty of the heavens. Each piece is crafted to bring elegance and grace to your most cherished occasions.</p>
            <button className="discover-btn">DISCOVER →</button>
          </div>
        </div>
        
        <div className="hero-image">
          {/* Replace 'hand-image.jpg' with your actual image path */}
          <img src={hand} alt="Hand wearing elegant rings" className="hand-image" />
        </div>

        <div className="hero-nav">
          <div className="nav-item">
            <span>RINGS</span>
            <span className="arrow">→</span>
          </div>
          <div className="nav-item">
            <span>EARRINGS</span>
            <span className="arrow">→</span>
          </div>
          <div className="nav-item">
            <span>NECKLACES</span>
            <span className="arrow">→</span>
          </div>
          <div className="nav-item">
            <span>BRACELETS</span>
            <span className="arrow">→</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;