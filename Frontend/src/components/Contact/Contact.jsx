import { useState } from 'react';
import { FaRobot, FaWandMagicSparkles, FaPaperPlane, FaCircleCheck } from 'react-icons/fa6';
import './Contact.css';

export default function Contact({ onOpenChat }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Get in Touch</span>
          <h2 className="section-title">Contact & Inquiries</h2>
          <p className="section-subtitle">
            Have questions about our culinary experience or need instant dish recommendations?
            Reach out via our inquiry form or ask our live AI assistant right now.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Connection & AI Assistant Callout */}
          <div className="contact-info-card">
            <div className="contact-info-header">
              <h3 className="contact-info-title">Connect with Bob Restaurant</h3>
              <p className="contact-info-desc">
                We are passionate about hospitality and dedicated to providing you with an unforgettable
                dining journey. Whether you are curious about authentic spices, dietary options, or group
                arrangements, our team and AI assistant are here to assist.
              </p>
            </div>

            {/* AI Assistant Callout Card */}
            <div className="contact-ai-callout">
              <h4>
                <FaRobot style={{ color: 'var(--accent-orange)' }} />
                <span>Instant Answers with AI</span>
              </h4>
              <p>
                Skip the wait! Our AI Assistant is connected directly to our menu database to answer questions
                about dish availability, ingredients, prices, and breakfast, lunch, or dinner specials in real time.
              </p>
              <button
                type="button"
                className="contact-ai-callout-btn"
                onClick={onOpenChat}
                id="contact-open-ai-chat"
              >
                <FaWandMagicSparkles />
                <span>Chat with AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-card">
            <h3 className="contact-form-title">Send Us a Message</h3>
            <p className="contact-form-subtitle">
              Fill in your details below and we will get back to you promptly.
            </p>

            {isSubmitted ? (
              <div className="form-success-alert">
                <FaCircleCheck style={{ fontSize: '1.2rem', flexShrink: 0 }} />
                <div>
                  <strong>Thank you!</strong> Your message has been received. Our team will review your inquiry shortly.
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    className="form-input"
                    placeholder="e.g. Private Dining Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', marginTop: '6px' }}
                  id="contact-submit-btn"
                >
                  <FaPaperPlane />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
