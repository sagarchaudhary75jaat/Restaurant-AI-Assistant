import { useState } from 'react';
import {
  FaRobot,
  FaRegCopy,
  FaCheck,
  FaRotateRight,
  FaCircleExclamation,
} from 'react-icons/fa6';
import ResponseRenderer from './ResponseRenderer';

export default function ChatMessage({ message, onRetry, lastUserMessageText }) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.sender === 'assistant';
  const isError = !!message.isError;

  const handleCopy = () => {
    if (!message.text) return;
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isAssistant) {
    return (
      <div className="message-row assistant" id={`msg-${message.id}`}>
        {/* Beautiful AI Avatar */}
        <div className="ai-message-avatar">
          <div className="ai-avatar-inner">
            <FaRobot />
          </div>
        </div>

        {/* Message Bubble */}
        <div className={`message-bubble assistant-bubble ${isError ? 'error-bubble' : ''}`}>
          {/* Header row with Assistant Label & Copy Action */}
          <div className="assistant-bubble-header">
            <span className="assistant-name-tag">Bob Restaurant Assistant</span>

            {!isError && (
              <button
                className="chat-copy-btn"
                onClick={handleCopy}
                title="Copy response"
                aria-label="Copy response text"
              >
                {copied ? (
                  <>
                    <FaCheck className="copy-icon-success" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaRegCopy />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Render Body */}
          {isError ? (
            <div className="chat-error-container">
              <div className="chat-error-content">
                <FaCircleExclamation className="chat-error-icon" />
                <span className="chat-error-text">{message.text}</span>
              </div>

              {onRetry && (
                <button
                  className="chat-retry-btn"
                  onClick={() => onRetry(lastUserMessageText)}
                  title="Retry sending message"
                >
                  <FaRotateRight />
                  <span>Retry</span>
                </button>
              )}
            </div>
          ) : (
            <ResponseRenderer content={message.text} />
          )}

          {/* Timestamp Footer */}
          <div className="message-footer">
            <span className="message-time">{message.time}</span>
          </div>
        </div>
      </div>
    );
  }

  // User Message
  return (
    <div className="message-row user" id={`msg-${message.id}`}>
      <div className="message-bubble user-bubble">
        <div className="user-message-text">{message.text}</div>
        <div className="message-footer">
          <span className="message-time">{message.time}</span>
        </div>
      </div>
    </div>
  );
}
