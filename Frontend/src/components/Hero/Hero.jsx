import { FaUtensils, FaRobot, FaWandMagicSparkles, FaCircleCheck, FaFire } from 'react-icons/fa6';
import heroImage from '../../assets/images/hero-feast.jpg';
import './Hero.css';

export default function Hero({ onOpenChat }) {
  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      const navOffset = 80;
      const elementPosition = menuEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Content Column */}
          <div className="hero-content">
            <div className="hero-badge">
              <FaWandMagicSparkles className="sparkle-icon" />
              <span>Next-Gen Dining Experience</span>
            </div>

            <h1 className="hero-title">
              Welcome to <br />
              <span className="highlight-text">Bob Restaurant</span>
            </h1>

            <p className="hero-subtitle">
              Discover delicious food and explore our menu with your personal AI restaurant assistant.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn-primary"
                onClick={scrollToMenu}
                id="hero-explore-menu-btn"
              >
                <FaUtensils />
                <span>Explore Menu</span>
              </button>

              <button
                className="btn-secondary"
                onClick={onOpenChat}
                id="hero-ask-ai-btn"
              >
                <FaRobot style={{ color: 'var(--accent-orange)' }} />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            <div className="hero-features">
              <div className="hero-feature-item">
                <FaCircleCheck />
                <span>Authentic Recipes</span>
              </div>
              <div className="hero-feature-item">
                <FaCircleCheck />
                <span>Real-Time AI Assistant</span>
              </div>
              <div className="hero-feature-item">
                <FaCircleCheck />
                <span>Fresh Daily Ingredients</span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="hero-image-wrapper">
            <div className="hero-image-card">
              <img
                src={heroImage}
                alt="Bob Restaurant Signature Feast"
                className="hero-image"
              />

              {/* Floating AI Prompt Hint */}
              <div className="floating-ai-hint" onClick={onOpenChat}>
                <FaWandMagicSparkles className="ai-sparkle" />
                <span>Ask AI: "What are your famous dishes?"</span>
              </div>

              {/* Floating Dish Badge */}
              <div className="floating-dish-badge">
                <div className="dish-badge-icon">
                  <FaFire />
                </div>
                <div>
                  <div className="dish-badge-title">Chef's Curated Menu</div>
                  <div className="dish-badge-sub">Breakfast • Lunch • Dinner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
