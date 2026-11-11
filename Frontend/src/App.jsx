import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MenuSection from './components/Menu/MenuSection';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AIChatbot from './components/Chatbot/AIChatbot';
import './App.css';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalQuery, setExternalQuery] = useState('');

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleAskAi = (query) => {
    setIsChatOpen(true);
    setExternalQuery(query);
    // Reset query buffer so user can re-trigger identical queries if desired
    setTimeout(() => {
      setExternalQuery('');
    }, 400);
  };

  return (
    <div className="app-wrapper">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenChat={handleOpenChat} />

      {/* Main Page Sections */}
      <main className="main-content">
        {/* Hero Section */}
        <Hero onOpenChat={handleOpenChat} />

        {/* Menu Section with Meal Filters, Search & AI integration */}
        <MenuSection onAskAi={handleAskAi} />

        {/* About Section */}
        <About onOpenChat={handleOpenChat} />

        {/* Contact Section */}
        <Contact onOpenChat={handleOpenChat} />
      </main>

      {/* Footer Section */}
      <Footer onOpenChat={handleOpenChat} onAskAi={handleAskAi} />

      {/* Floating AI Restaurant Assistant Modal & Launcher */}
      <AIChatbot
        isOpen={isChatOpen}
        onToggle={handleToggleChat}
        externalQuery={externalQuery}
      />
    </div>
  );
}
