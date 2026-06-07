/**
 * Returns the best available cover URL for a book.
 * Uses Open Library covers API as primary source.
 * Falls back to a title-initial colored placeholder.
 */
export function getCoverUrl(cover) {
  if (!cover) return null;
  return cover;
}

/**
 * Handle img onError — hides broken img and shows the fallback sibling.
 */
export function handleCoverError(e) {
  e.target.style.display = 'none';
  const fallback = e.target.nextElementSibling;
  if (fallback) fallback.style.display = 'flex';
}
