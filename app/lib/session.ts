const SESSION_KEY = 'healthcare_chat_session_id';

export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return generateSessionId();
  }

  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function generateSessionId(): string {
  const uuid = crypto.randomUUID().replace(/-/g, '').substring(0, 9);
  return `session_${uuid}`;
}

export function clearSession(): string {
  const newSessionId = generateSessionId();
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, newSessionId);
  }
  return newSessionId;
}
