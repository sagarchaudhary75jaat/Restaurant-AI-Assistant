import { FaUtensils, FaWandMagicSparkles, FaChevronRight } from 'react-icons/fa6';
import './Footer.css';

export default function Footer({ onOpenChat, onAskAi }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => scrollToSection('home')}>
              <div className="footer-logo-icon">
                <FaUtensils />
              </div>
              <div className="footer-logo-text">
                <span className="footer-logo-title">Bob Restaurant</span>
                <span className="footer-logo-subtitle">AI-Powered Dining</span>
              </div>
            </div>

            <p className="footer-desc">
              Experience the harmony of traditional culinary craftsmanship and real-time AI assistance.
              Ask questions about our menu, prices, and chef specials anytime.
            </p>

            <div className="footer-tech-badge">
              <span className="dot"></span>
              <span>Powered by Spring Boot, LangChain4j & Groq AI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-link-item" onClick={() => scrollToSection('home')}>
                  <FaChevronRight style={{ fontSize: '0.7rem' }} />
                  Home
                </span>
              </li>
              <li>
                <span className="footer-link-item" onClick={() => scrollToSection('menu')}>
                  <FaChevronRight style={{ fontSize: '0.7rem' }} />
                  Culinary Menu
                </span>
              </li>
              <li>
                <span className="footer-link-item" onClick={() => scrollToSection('about')}>
                  <FaChevronRight style={{ fontSize: '0.7rem' }} />
                  About Us
                </span>
              </li>
              <li>
                <span className="footer-link-item" onClick={() => scrollToSection('contact')}>
                  <FaChevronRight style={{ fontSize: '0.7rem' }} />
                  Contact & Inquiries
                </span>
              </li>
            </ul>
          </div>

          {/* AI Prompts Suggestions */}
          <div>
            <h4 className="footer-heading">Ask Bob AI Assistant</h4>
            <div className="footer-prompts">
              <button
                className="footer-prompt-btn"
                onClick={() => onAskAi('What are your famous dishes?')}
              >
                <span>"What are your famous dishes?"</span>
                <FaWandMagicSparkles />
              </button>
              <button
                className="footer-prompt-btn"
                onClick={() => onAskAi('Show me vegetarian dishes.')}
              >
                <span>"Show me vegetarian dishes."</span>
                <FaWandMagicSparkles />
              </button>
              <button
                className="footer-prompt-btn"
                onClick={() => onAskAi('What do you serve for lunch?')}
              >
                <span>"What do you serve for lunch?"</span>
                <FaWandMagicSparkles />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bob Restaurant. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span onClick={() => scrollToSection('home')}>Back to Top ↑</span>
            <span onClick={onOpenChat}>Open AI Assistant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
