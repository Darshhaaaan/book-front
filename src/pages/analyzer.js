import Head from 'next/head';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import { api } from '../utils/api';
import { useDebounce } from '../hooks/useDebounce';
import styles from '../styles/Analyzer.module.css';

const MAX_BOOKS = 4;

export default function Analyzer() {
  const router = useRouter();
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mouseInDropdown, setMouseInDropdown] = useState(false);
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 200);

  // Search via Next.js API route → /api/books/search (no backend needed, no CORS)
  useEffect(() => {
    const q = debouncedQuery.trim();
    if (q.length < 1) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    let cancelled = false;
    api.searchBooks(q)
      .then(data => {
        if (cancelled) return;
        const selectedIds = new Set(selectedBooks.map(b => b.id));
        const filtered = (data.books || []).filter(b => !selectedIds.has(b.id));
        setResults(filtered);
        setShowDropdown(filtered.length > 0);
      })
      .catch(() => {
        if (cancelled) return;
        setResults([]);
        setShowDropdown(false);
      });

    return () => { cancelled = true; };
  }, [debouncedQuery, selectedBooks]);

  const addBook = useCallback((book) => {
    if (selectedBooks.length >= MAX_BOOKS) return;
    setSelectedBooks(prev => [...prev, book]);
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    setMouseInDropdown(false);
    // Re-focus input for next selection
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [selectedBooks.length]);

  const removeBook = useCallback((id) => {
    setSelectedBooks(prev => prev.filter(b => b.id !== id));
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleInputBlur = useCallback(() => {
    // Only hide dropdown if mouse is not inside it
    if (!mouseInDropdown) {
      setTimeout(() => setShowDropdown(false), 100);
    }
  }, [mouseInDropdown]);

  const handleAnalyze = async () => {
    if (selectedBooks.length !== MAX_BOOKS) return;
    setSubmitting(true);
    sessionStorage.setItem('analyzerResult', JSON.stringify({ favoriteBooks: selectedBooks }));
    router.push('/results?from=analyzer');
  };

  const canSearch = selectedBooks.length < MAX_BOOKS;

  return (
    <Layout>
      <Head>
        <title>Book Analyzer — Book Persona</title>
      </Head>

      <div className={styles.analyzerPage}>
        <div className="container">

          {/* HEADER */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.eyebrow}>Book Analyzer</p>
            <h1 className={styles.title}>
              Let your favorites<br /><em>speak for you.</em>
            </h1>
            <p className={styles.subtitle}>
              Select exactly four books you love. We&apos;ll analyze their patterns — genre, tone, pacing, narrative style — and build a precise reader profile from your actual reading history.
            </p>
          </motion.div>

          {/* SEARCH */}
          <motion.div
            className={styles.searchSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className={`${styles.searchWrapper} ${!canSearch ? styles.searchDisabled : ''}`}
              onClick={() => canSearch && inputRef.current?.focus()}
            >
              <span className={styles.searchIcon}>⌕</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder={
                  selectedBooks.length === 0
                    ? 'Search by title or author…'
                    : selectedBooks.length < MAX_BOOKS
                    ? `Add ${MAX_BOOKS - selectedBooks.length} more book${MAX_BOOKS - selectedBooks.length > 1 ? 's' : ''}…`
                    : 'Four books selected'
                }
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => {
                  if (results.length > 0) setShowDropdown(true);
                }}
                onBlur={handleInputBlur}
                disabled={!canSearch}
                autoComplete="off"
                spellCheck={false}
              />
              <span className={styles.searchCount}
                style={{ color: selectedBooks.length === MAX_BOOKS ? 'var(--accent-warm)' : undefined }}>
                {selectedBooks.length}/{MAX_BOOKS}
              </span>
            </div>

            {/* DROPDOWN */}
            <AnimatePresence>
              {showDropdown && results.length > 0 && canSearch && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: -6, scaleY: 0.97 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -6, scaleY: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{ transformOrigin: 'top' }}
                  onMouseEnter={() => setMouseInDropdown(true)}
                  onMouseLeave={() => setMouseInDropdown(false)}
                >
                  {results.map((book, i) => (
                    <motion.button
                      key={book.id}
                      className={styles.dropdownItem}
                      onMouseDown={e => {
                        // onMouseDown fires before onBlur — prevents dropdown from closing
                        e.preventDefault();
                        addBook(book);
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <div className={styles.dropdownCoverWrapper}>
                        {book.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={book.cover}
                            alt={book.title}
                            className={styles.dropdownCover}
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className={styles.dropdownCoverFallback}>
                            {book.title[0]}
                          </div>
                        )}
                      </div>
                      <div className={styles.dropdownInfo}>
                        <span className={styles.dropdownTitle}>{book.title}</span>
                        <span className={styles.dropdownAuthor}>{book.author}</span>
                        <div className={styles.dropdownGenres}>
                          {book.genres.slice(0, 3).map(g => (
                            <span key={g} className={styles.dropdownGenre}>{g}</span>
                          ))}
                        </div>
                      </div>
                      {book.rating && (
                        <span className={styles.dropdownRating}>★ {book.rating}</span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* No results hint */}
            {query.trim().length >= 1 && results.length === 0 && canSearch && (
              <motion.p
                className={styles.noResults}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No matches for &ldquo;{query}&rdquo; — try a different title or author name.
              </motion.p>
            )}
          </motion.div>

          {/* BOOKSHELF */}
          <div className={styles.shelf}>
            <div className={styles.shelfLabel}>
              <span>Your shelf</span>
              <span className={styles.shelfLabelCount}>{selectedBooks.length} of {MAX_BOOKS} selected</span>
            </div>

            <div className={styles.shelfSlots}>
              {Array.from({ length: MAX_BOOKS }).map((_, i) => {
                const book = selectedBooks[i];
                return (
                  <div key={i} className={styles.shelfSlot}>
                    {book ? (
                      <motion.div
                        className={styles.shelfBook}
                        initial={{ opacity: 0, scale: 0.85, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                      >
                        <div className={styles.bookCoverWrapper}>
                          {book.cover ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={book.cover}
                              alt={book.title}
                              className={styles.bookCover}
                              onError={e => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className={styles.bookCoverPlaceholder}>
                              <span>{book.title[0]}</span>
                            </div>
                          )}
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeBook(book.id)}
                            aria-label={`Remove ${book.title}`}
                          >
                            ×
                          </button>
                        </div>
                        <div className={styles.bookMeta}>
                          <p className={styles.bookTitle}>{book.title}</p>
                          <p className={styles.bookAuthor}>{book.author}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className={styles.emptySlot}
                        onClick={() => inputRef.current?.focus()}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className={styles.emptySlotNum}>{i + 1}</span>
                        <span className={styles.emptySlotLabel}>Add a book</span>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className={styles.shelfProgress}>
              <motion.div
                className={styles.shelfProgressFill}
                animate={{ width: `${(selectedBooks.length / MAX_BOOKS) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <p className={styles.shelfHint}>
              {selectedBooks.length === 0 && 'Search above and click a result to add it to your shelf.'}
              {selectedBooks.length > 0 && selectedBooks.length < MAX_BOOKS &&
                `${MAX_BOOKS - selectedBooks.length} more book${MAX_BOOKS - selectedBooks.length > 1 ? 's' : ''} needed to continue.`}
              {selectedBooks.length === MAX_BOOKS && 'Shelf complete — ready to generate your profile.'}
            </p>
          </div>

          {/* ANALYZE BUTTON */}
          <AnimatePresence>
            {selectedBooks.length === MAX_BOOKS && (
              <motion.div
                className={styles.analyzeSection}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35 }}
              >
                <motion.button
                  className={`btn btn--primary btn--large ${styles.analyzeBtn}`}
                  onClick={handleAnalyze}
                  disabled={submitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {submitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ display: 'inline-block' }}
                      >◌</motion.span>
                      {' '}Analyzing…
                    </>
                  ) : 'Analyze My Reading Profile'}
                </motion.button>
                <p className={styles.analyzeHint}>
                  We&apos;ll decode the patterns across your four selections.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HOW IT WORKS */}
          <motion.div
            className={styles.howSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.howTitle}>How the analysis works</h3>
            <div className={styles.howSteps}>
              {[
                { step: '01', title: 'Genre Mapping',       desc: "Each book\u2019s genres are weighted and combined to reveal your dominant reading preferences." },
                { step: '02', title: 'Theme Extraction',    desc: 'Common themes across your selections reveal deeper patterns in what stories mean to you.' },
                { step: '03', title: 'Profile Generation',  desc: 'Your reader archetype, subgenre, and reading habits are derived from the combined analysis.' },
                { step: '04', title: 'Recommendations',     desc: 'Books are ranked by genre match, theme similarity, and how well they fit your specific profile.' },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  className={styles.howStep}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className={styles.howStepNum}>{s.step}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}
