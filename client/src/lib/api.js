const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('docai_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (response.status === 401) {
    localStorage.removeItem('docai_token');
    localStorage.removeItem('docai_user');
    localStorage.removeItem('docai_auth');
  }
  if (!response.ok) throw new Error(body.detail || 'The server could not complete this request.');
  return body;
}

export { API_URL };
