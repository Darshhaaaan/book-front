import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>Book Persona</span>
          <p className={styles.tagline}>Discover your reading identity.</p>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4>Explore</h4>
            <Link href="/">Home</Link>
            <Link href="/quiz">Personality Quiz</Link>
            <Link href="/analyzer">Book Analyzer</Link>
          </div>
          <div className={styles.col}>
            <h4>Genres</h4>
            <span>Fantasy</span>
            <span>Mystery</span>
            <span>Science Fiction</span>
            <span>Literary Fiction</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Book Persona. Built for readers.</p>
      </div>
    </footer>
  );
}
