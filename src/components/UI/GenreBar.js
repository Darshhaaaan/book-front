import { motion } from 'framer-motion';
import styles from './GenreBar.module.css';

const GENRE_COLORS = {
  Fantasy: '#6b3d9a',
  Romance: '#8a3d5e',
  Mystery: '#2c4a6e',
  Thriller: '#7a3a2a',
  Horror: '#3a3a3a',
  'Science Fiction': '#1a5c7a',
  Adventure: '#3d6b4e',
  Action: '#8a4a1a',
  Comedy: '#4a6a6a',
  'Literary Fiction': '#4a4a4a',
};

export default function GenreBar({ genre, pct, delay = 0 }) {
  const color = GENRE_COLORS[genre] || 'var(--accent-warm)';

  return (
    <div className={styles.barRow}>
      <div className={styles.barLabel}>
        <span className={styles.genreName}>{genre}</span>
        <span className={styles.genrePct}>{pct}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
