const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.detail || 'The server could not complete this request.');
  return body;
}

export { API_URL };
