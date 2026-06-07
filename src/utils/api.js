/**
 * All API calls go to the Express backend via NEXT_PUBLIC_API_URL.
 * Set this in .env.local for local dev, and in Vercel env vars for production.
 *
 * Local:      NEXT_PUBLIC_API_URL=http://localhost:5000
 * Production: NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetcher(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Search books (Open Library — millions of real books)
  searchBooks: (q, limit = 12) =>
    fetcher(`/api/books/search?q=${encodeURIComponent(q)}&limit=${limit}`),

  // Browse books by genre
  getBooksByGenre: (genre, limit = 20, offset = 0) =>
    fetcher(`/api/books/genre?genre=${encodeURIComponent(genre)}&limit=${limit}&offset=${offset}`),

  // Get full book detail
  getBookDetail: (id) =>
    fetcher(`/api/books/detail?id=${encodeURIComponent(id)}`),

  // Recommendations from quiz result
  getRecommendationsFromQuiz: (profile) =>
    fetcher('/api/recommendations/quiz', {
      method: 'POST',
      body: JSON.stringify(profile),
    }),

  // Recommendations from favorite books
  getRecommendationsFromBooks: (favoriteBooks) =>
    fetcher('/api/recommendations/books', {
      method: 'POST',
      body: JSON.stringify({ favoriteBooks }),
    }),
};
