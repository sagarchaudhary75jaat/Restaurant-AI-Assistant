/**
 * Session ID utility for Bob Restaurant AI Assistant
 * Maintains a persistent conversation session ID for LangChain4j MessageWindowChatMemory.
 */

const SESSION_KEY = 'bob_restaurant_session_id';

export function getOrCreateSessionId() {
  try {
    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  } catch {
    // Fallback if localStorage is disabled or restricted
    return 'session_guest_' + Date.now();
  }
}

export function resetSessionId() {
  try {
    const newSessionId = 'session_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    localStorage.setItem(SESSION_KEY, newSessionId);
    return newSessionId;
  } catch {
    return 'session_guest_' + Date.now();
  }
}
