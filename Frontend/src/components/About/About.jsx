import { FaRobot, FaBowlRice } from 'react-icons/fa6';
import ambianceImage from '../../assets/images/restaurant-ambiance.jpg';
import './About.css';

export default function About({ onOpenChat }) {
  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="about-grid">
          {/* Visual Showcase */}
          <div className="about-image-card">
            <img
              src={ambianceImage}
              alt="Bob Restaurant Warm Atmosphere"
              className="about-image"
            />
            <div className="about-badge-overlay" onClick={onOpenChat} style={{ cursor: 'pointer' }}>
              <FaRobot className="about-badge-icon" />
              <div className="about-badge-text">
                Ask our AI assistant for dietary guidance & recommendations anytime
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="about-content">
            <span className="section-badge">About Us</span>
            <h2 className="about-title">
              A Culinary Destination for Discerning Food Lovers
            </h2>

            <p className="about-paragraph">
              Welcome to <strong>Bob Restaurant</strong>, a place created for guests who appreciate
              exceptional food, authentic flavors, and warm hospitality. Our kitchen is dedicated
              to serving wholesome, meticulously prepared dishes across breakfast, lunch, and dinner.
            </p>

            <p className="about-paragraph">
              Whether you are craving crisp, golden South Indian dosas to start your day, a hearty
              and rich thali for lunch, or aromatic biryanis and warm tandoori breads for dinner,
              our team takes immense pride in delivering pure culinary satisfaction.
            </p>

            <div className="about-highlights">
              <div className="about-card">
                <div className="about-card-icon">
                  <FaBowlRice />
                </div>
                <h3 className="about-card-title">Authentic Flavors</h3>
                <p className="about-card-desc">
                  Recipes prepared with time-honored techniques, aromatic spices, and premium ingredients.
                </p>
              </div>

              <div className="about-card">
                <div className="about-card-icon">
                  <FaRobot />
                </div>
                <h3 className="about-card-title">AI Dining Assistant</h3>
                <p className="about-card-desc">
                  Explore prices, availability, and meal specials naturally with our dedicated AI dining partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
