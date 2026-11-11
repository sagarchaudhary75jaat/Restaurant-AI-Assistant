import { useState, useEffect } from 'react';
import { FaUtensils, FaRobot, FaBars, FaXmark } from 'react-icons/fa6';
import './Navbar.css';

export default function Navbar({ onOpenChat }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => scrollToSection('home')}>
          <div className="brand-icon-wrapper">
            <FaUtensils />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">Bob Restaurant</span>
            <span className="brand-tagline">Fine Flavors & AI Dining</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <span className="nav-link" onClick={() => scrollToSection('home')}>
                Home
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('menu')}>
                Menu
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('about')}>
                About Us
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => scrollToSection('contact')}>
                Contact
              </span>
            </li>
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="nav-actions">
          <button
            className="nav-ai-btn"
            onClick={onOpenChat}
            aria-label="Open AI Restaurant Assistant"
            id="nav-open-ai-chat"
          >
            <span className="ai-dot"></span>
            <FaRobot />
            <span>AI Assistant</span>
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <span className="nav-link" onClick={() => scrollToSection('home')}>
          Home
        </span>
        <span className="nav-link" onClick={() => scrollToSection('menu')}>
          Menu
        </span>
        <span className="nav-link" onClick={() => scrollToSection('about')}>
          About Us
        </span>
        <span className="nav-link" onClick={() => scrollToSection('contact')}>
          Contact
        </span>
        <button
          className="nav-ai-btn"
          onClick={() => {
            setMobileMenuOpen(false);
            onOpenChat();
          }}
        >
          <span className="ai-dot"></span>
          <FaRobot />
          <span>Ask AI Assistant</span>
        </button>
      </div>
    </header>
  );
}
