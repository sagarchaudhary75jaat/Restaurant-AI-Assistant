/**
 * Restaurant Chat API Service
 * Connects Bob Restaurant AI Frontend to Spring Boot Backend.
 *
 * Backend details:
 * - Base URL: http://localhost:8080
 * - Endpoint: POST http://localhost:8080/api/restaurant/chat
 * - Request Contract: { "message": string, "sessionId": string }
 * - Response Contract (ChatResponse.java): { "reply": string, "response": string, "status": string }
 */

export const API_URL = "http://localhost:8080/api/restaurant/chat";
export const PROXY_URL = "/api/restaurant/chat";

/**
 * Send a chat message to the Spring Boot AI assistant.
 *
 * @param {string} message - The customer query message
 * @param {string} sessionId - The session ID for conversational memory
 * @returns {Promise<{ reply: string, response: string, status: string }>}
 */
export async function sendMessage(message, sessionId) {
  if (!message || !message.trim()) {
    throw new Error('Message cannot be empty.');
  }

  const payload = {
    message: message.trim(),
    sessionId: sessionId || 'default-session',
  };

  /**
   * Helper function to execute POST fetch with granular HTTP status logging
   */
  const executeRequest = async (url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorBody = null;
      try {
        errorBody = await response.json();
      } catch {
        // Non-JSON response body
      }

      // Handle HTTP 400, 404, 500 and network errors separately in the console for debugging
      if (response.status === 400) {
        console.error(
          `[Bob Restaurant API] HTTP 400 Bad Request at ${url}:`,
          errorBody || response.statusText
        );
      } else if (response.status === 404) {
        console.error(
          `[Bob Restaurant API] HTTP 404 Not Found at ${url}. Verify backend endpoint mapping for /api/restaurant/chat.`
        );
      } else if (response.status === 500) {
        console.error(
          `[Bob Restaurant API] HTTP 500 Internal Server Error at ${url}:`,
          errorBody || response.statusText
        );
      } else {
        console.error(
          `[Bob Restaurant API] HTTP ${response.status} Error at ${url}:`,
          errorBody || response.statusText
        );
      }

      const httpError = new Error(`HTTP Error: ${response.status}`);
      httpError.status = response.status;
      httpError.isHttpError = true;
      httpError.errorBody = errorBody;
      throw httpError;
    }

    const data = await response.json();
    return data;
  };

  try {
    // 1. Direct call to Spring Boot backend API_URL
    return await executeRequest(API_URL);
  } catch (primaryErr) {
    // If backend returned an HTTP error (400, 404, 500), do NOT fallback, throw immediately
    if (primaryErr.isHttpError) {
      throw primaryErr;
    }

    // Network / CORS Error when calling http://localhost:8080 directly
    console.warn(
      `[Bob Restaurant API] Direct request to ${API_URL} failed (${primaryErr.message}). Checking Vite dev proxy at ${PROXY_URL}...`
    );

    try {
      // 2. Fallback to Vite dev server proxy (/api/restaurant/chat) for seamless local browser testing
      const proxyResult = await executeRequest(PROXY_URL);
      console.info('[Bob Restaurant API] Vite proxy connection succeeded.');
      return proxyResult;
    } catch (fallbackErr) {
      if (fallbackErr.isHttpError) {
        throw fallbackErr;
      }

      // Both failed due to network / connectivity issues
      console.error(
        '[Bob Restaurant API] Network Error: Failed to connect to backend on port 8080.',
        fallbackErr
      );
      const networkError = new Error('Backend is unreachable or connection failed.');
      networkError.isNetworkError = true;
      throw networkError;
    }
  }
}

/**
 * Backward compatibility alias
 */
export const sendChatMessage = sendMessage;

/**
 * Optional menu fetching utility for MenuSection UI
 */
export async function fetchLiveMenu() {
  const candidateEndpoints = [
    '/api/restaurant/menu',
    'http://localhost:8080/api/restaurant/menu',
  ];

  for (const endpoint of candidateEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return { isAvailable: true, dishes: data, endpoint };
        }
      }
    } catch {
      // Ignore and fallback
    }
  }

  return { isAvailable: false, dishes: [] };
}
