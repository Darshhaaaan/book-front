import { motion, AnimatePresence } from 'framer-motion';
import styles from './BookCard.module.css';

export default function BookCard({ book, rank, delay = 0, expanded, onToggle }) {
  const confidence = book.confidence || 80;
  const bookLink = book.openLibraryUrl || book.goodreadsUrl || '#';

  return (
    <motion.div
      className={`${styles.card} ${expanded ? styles.expanded : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.cardMain}>
        {/* Rank */}
        <div className={styles.rank}>
          <span className={styles.rankNum}>{String(rank).padStart(2, '0')}</span>
        </div>

        {/* Cover */}
        <div className={styles.coverWrapper}>
          {book.cover ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.cover}
                alt={book.title}
                className={styles.cover}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className={styles.coverFallback} style={{ display: 'none' }}>
                <span>{book.title?.[0] || '?'}</span>
              </div>
            </>
          ) : (
            <div className={styles.coverFallback}>
              <span>{book.title?.[0] || '?'}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>{book.author}</p>

            <div className={styles.tags}>
              {book.genres?.slice(0, 3).map(g => (
                <span key={g} className="tag">{g}</span>
              ))}
              {book.year && <span className="tag">{book.year}</span>}
            </div>
          </div>

          {book.description && (
            <p className={styles.description}>
              {book.description.substring(0, 160)}{book.description.length > 160 ? '…' : ''}
            </p>
          )}

          <div className={styles.explanation}>
            <span className={styles.explanationIcon}>◆</span>
            <span>{book.explanation}</span>
          </div>
        </div>

        {/* Confidence + Actions */}
        <div className={styles.meta}>
          <div className={styles.confidenceSection}>
            <div className={styles.confidenceCircle}>
              <svg viewBox="0 0 36 36" className={styles.confidenceSvg}>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="var(--border-light)" strokeWidth="2.5"
                />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="var(--accent-warm)" strokeWidth="2.5"
                  strokeDasharray={`${confidence}, 100`} strokeLinecap="round"
                  initial={{ strokeDasharray: '0, 100' }}
                  whileInView={{ strokeDasharray: `${confidence}, 100` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
                />
              </svg>
              <span className={styles.confidenceNum}>{confidence}%</span>
            </div>
            <span className={styles.confidenceLabel}>Match</span>
          </div>

          {book.rating && (
            <div className={styles.rating}>
              <span className={styles.ratingStar}>★</span>
              <span className={styles.ratingNum}>{book.rating}</span>
            </div>
          )}

          <div className={styles.actions}>
            <button className={styles.expandBtn} onClick={onToggle} aria-expanded={expanded}>
              {expanded ? 'Less ↑' : 'More ↓'}
            </button>
            <a href={bookLink} target="_blank" rel="noopener noreferrer" className={styles.goodreadsLink}>
              View ↗
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className={styles.expandedContent}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className={styles.expandedInner}>
              {book.description ? (
                <p className={styles.fullDesc}>{book.description}</p>
              ) : (
                <p className={styles.fullDesc} style={{ fontStyle: 'italic', opacity: 0.6 }}>
                  No description available.
                </p>
              )}
              <a href={bookLink} target="_blank" rel="noopener noreferrer"
                className="btn btn--secondary" style={{ alignSelf: 'flex-start', fontSize: '0.85rem' }}>
                View on Open Library ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
