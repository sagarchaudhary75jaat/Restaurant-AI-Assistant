import { useState, useEffect, useRef, useCallback } from 'react';
import {
  FaRobot,
  FaPaperPlane,
  FaTrashCan,
  FaXmark,
} from 'react-icons/fa6';
import { sendMessage } from '../../services/restaurantApi';
import { getOrCreateSessionId, resetSessionId } from '../../utils/session';
import ChatMessage from './ChatMessage';
import './Chatbot.css';

const SUGGESTED_QUESTIONS = [
  'What is on your menu?',
  'What are your famous dishes?',
  'Show me vegetarian dishes.',
  'What is the price of Masala Dosa?',
  'Is Masala Dosa available?',
  'What do you serve for breakfast?',
  'What do you serve for lunch?',
  'What do you serve for dinner?',
];

const INITIAL_MESSAGE = {
  id: 'welcome',
  sender: 'assistant',
  text: 'Hello and welcome to **Bob Restaurant**! I am your personal AI Restaurant Assistant. I have live access to our menu database—ask me anything about our dishes, prices, availability, or signature specialties!',
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export default function AIChatbot({ isOpen, onToggle, externalQuery }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => getOrCreateSessionId());
  const [lastUserPrompt, setLastUserPrompt] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = useCallback(async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setLastUserPrompt(text);

    const userMsg = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Append user message and clear input
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Connect to backend API: POST http://localhost:8080/api/restaurant/chat
      const response = await sendMessage(text, sessionId);

      // Parse reply from ChatResponse contract (reply / response)
      const replyText = response?.reply || response?.response;

      if (!replyText) {
        throw new Error('Empty response received from backend.');
      }

      const aiMsg = {
        id: 'ai_' + Date.now(),
        sender: 'assistant',
        text: replyText,
        isError: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      let errorMessage = 'Sorry, something went wrong. Please try again.';

      if (
        err.isNetworkError ||
        err.name === 'TypeError' ||
        err.message?.includes('Failed to fetch') ||
        err.message?.includes('NetworkError') ||
        err.message?.includes('network') ||
        err.message?.includes('unreachable')
      ) {
        errorMessage = 'Unable to connect to Bob Restaurant. Please check whether the backend is running.';
      }

      const errorMsg = {
        id: 'err_' + Date.now(),
        sender: 'assistant',
        text: errorMessage,
        isError: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, sessionId]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Handle queries passed from hero or menu cards
  useEffect(() => {
    if (externalQuery && externalQuery.trim()) {
      const timer = setTimeout(() => {
        handleSend(externalQuery);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [externalQuery, handleSend]);

  const handleRetry = (promptToRetry) => {
    const query = promptToRetry || lastUserPrompt;
    if (!query) return;
    // Remove the trailing error message if any
    setMessages((prev) => prev.filter((m) => !m.isError));
    handleSend(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter: Allow new line
        return;
      }
      // Enter without Shift: Send message
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    const newSession = resetSessionId();
    setSessionId(newSession);
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: 'welcome_' + Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div
        className="chat-launcher-btn"
        onClick={onToggle}
        aria-label="Toggle AI Restaurant Assistant Chat"
        id="floating-ai-chat-btn"
      >
        <span className="chat-launcher-badge"></span>
        <FaRobot />
        <span className="chat-launcher-tooltip">Ask Bob AI Assistant</span>
      </div>

      {/* Modern Chat Window */}
      {isOpen && (
        <div className="chat-window" id="ai-chat-modal" role="dialog" aria-label="Bob Restaurant AI Assistant">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <FaRobot />
                <span className="chat-avatar-status"></span>
              </div>
              <div>
                <h3 className="chat-header-title">Bob Restaurant AI Assistant</h3>
                <span className="chat-header-subtitle">Fine Dining • Menu Expert</span>
              </div>
            </div>

            <div className="chat-header-actions">
              <button
                className="chat-icon-btn"
                onClick={handleClearChat}
                title="Clear Chat & Start Fresh Session"
                aria-label="Clear Chat"
              >
                <FaTrashCan />
              </button>
              <button
                className="chat-icon-btn"
                onClick={onToggle}
                title="Close Chat"
                aria-label="Close Chat"
              >
                <FaXmark style={{ fontSize: '1.2rem' }} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onRetry={handleRetry}
                lastUserMessageText={lastUserPrompt}
              />
            ))}

            {/* Loading Indicator with AI Avatar and "Bob is thinking..." */}
            {isLoading && (
              <div className="message-row assistant">
                <div className="ai-message-avatar">
                  <div className="ai-avatar-inner">
                    <FaRobot />
                  </div>
                </div>
                <div className="message-bubble typing-indicator-bubble">
                  <span className="typing-text">Bob is thinking...</span>
                  <div className="typing-dots" aria-label="Bob is thinking...">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length <= 2 && !isLoading && (
              <div className="suggested-section">
                <div className="suggested-title">Suggested questions:</div>
                <div className="suggested-chips">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      className="suggested-chip"
                      onClick={() => handleSend(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer Input supporting Enter to send and Shift+Enter for new line */}
          <div className="chat-footer">
            <div className="chat-input-wrapper">
              <textarea
                ref={inputRef}
                rows={1}
                placeholder="Ask about dishes, prices, ingredients... (Shift+Enter for new line)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="chat-input"
                disabled={isLoading}
                id="chat-input-box"
              />
              <button
                className="chat-send-btn"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send Message"
                id="chat-send-btn"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
