import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';

const FLOATING_BOOKS = [
  { title: 'Dune', color: '#c9a227', delay: 0 },
  { title: 'Rebecca', color: '#6b3d6b', delay: 1.2 },
  { title: 'Mistborn', color: '#3d6b4e', delay: 2.4 },
  { title: 'The Road', color: '#7a3a2a', delay: 0.6 },
  { title: 'Foundation', color: '#2c4a6e', delay: 1.8 },
  { title: 'Gone Girl', color: '#8a4a1a', delay: 3.0 },
];

const GENRES = [
  { name: 'Fantasy', desc: 'Magic, wonder, and impossible worlds', color: '#6b3d9a', icon: '✦' },
  { name: 'Mystery', desc: 'Hidden truths and the art of deduction', color: '#2c4a6e', icon: '◈' },
  { name: 'Science Fiction', desc: 'Tomorrow\'s questions, today\'s imagination', color: '#1a5c7a', icon: '◎' },
  { name: 'Romance', desc: 'The architecture of human connection', color: '#8a3d5e', icon: '◇' },
  { name: 'Thriller', desc: 'Suspense that lives in your nerves', color: '#7a3a2a', icon: '◉' },
  { name: 'Literary Fiction', desc: 'Language as both vessel and destination', color: '#4a6a6a', icon: '○' },
];

const STATS = [
  { value: '50+', label: 'Personality Questions' },
  { value: '10', label: 'Genre Dimensions' },
  { value: '55+', label: 'Curated Books' },
  { value: '12', label: 'Reader Archetypes' },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Book Persona — Discover Your Reading Identity</title>
      </Head>

      {/* HERO */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div className={styles.heroContent} style={{ opacity: heroOpacity, y: heroY }}>
          <motion.div
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className={styles.eyebrowDot} />
            <span>Personalized Book Discovery</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Find books that<br />
            <em className={styles.heroTitleItalic}>understand you.</em>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Two paths to your next favorite read. Answer a personality quiz that sees beyond obvious genre preferences, or let your favorite books reveal who you are as a reader.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link href="/quiz" className={`btn btn--primary btn--large ${styles.ctaPrimary}`}>
              Take the Personality Quiz
            </Link>
            <Link href="/analyzer" className={`btn btn--secondary btn--large`}>
              Analyze My Books
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating books decoration */}
        <div className={styles.floatingBooks}>
          {FLOATING_BOOKS.map((book, i) => (
            <motion.div
              key={book.title}
              className={styles.floatingBook}
              style={{
                background: `linear-gradient(135deg, ${book.color}cc, ${book.color}88)`,
                animationDelay: `${book.delay}s`,
              }}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.15 }}
            >
              <span className={styles.floatingBookSpine} />
              <span className={styles.floatingBookTitle}>{book.title}</span>
            </motion.div>
          ))}
        </div>

        <div className={styles.heroGradient} />
        <div className={styles.heroDots} />
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.sectionEyebrow}>Two Methods</p>
            <h2>Choose your path to discovery</h2>
          </motion.div>

          <div className={styles.pathGrid}>
            {[
              {
                step: '01',
                title: 'Personality Quiz',
                desc: 'Answer 15 adaptive questions drawn from a bank of 50+. Each response updates your genre profile in real time, steering subsequent questions toward maximum insight.',
                features: ['15 adaptive questions', '12 reader archetypes', 'Confidence scoring', 'Genre breakdown'],
                href: '/quiz',
                cta: 'Start the Quiz',
                color: 'var(--accent-warm)',
              },
              {
                step: '02',
                title: 'Book Analyzer',
                desc: 'Select four books you love. The system decodes your tastes — genres, tone, pacing, narrative style — and builds a precise reader profile from your actual reading history.',
                features: ['Live book search', 'Pattern analysis', 'Theme extraction', 'Profile generation'],
                href: '/analyzer',
                cta: 'Analyze My Books',
                color: 'var(--accent-forest)',
              },
            ].map((path, i) => (
              <motion.div
                key={path.step}
                className={styles.pathCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className={styles.pathStep} style={{ color: path.color }}>{path.step}</div>
                <h3 className={styles.pathTitle}>{path.title}</h3>
                <p className={styles.pathDesc}>{path.desc}</p>
                <ul className={styles.pathFeatures}>
                  {path.features.map(f => (
                    <li key={f}>
                      <span className={styles.featureCheck} style={{ color: path.color }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={path.href} className={`btn btn--primary ${styles.pathBtn}`}
                  style={{ background: `linear-gradient(135deg, ${path.color}, ${path.color}bb)` }}>
                  {path.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GENRE SHOWCASE */}
      <section className={styles.genreSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className={styles.sectionEyebrow}>Ten Worlds</p>
            <h2>Every genre, precisely mapped</h2>
            <p className={styles.sectionSubtitle}>
              Our scoring system tracks ten major genres and generates subgenre combinations — from Romantasy to Cosmic Horror to Literary Mystery.
            </p>
          </motion.div>

          <div className={styles.genreGrid}>
            {GENRES.map((genre, i) => (
              <motion.div
                key={genre.name}
                className={styles.genreCard}
                style={{ '--genre-color': genre.color }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <span className={styles.genreIcon}>{genre.icon}</span>
                <h4 className={styles.genreName}>{genre.name}</h4>
                <p className={styles.genreDesc}>{genre.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.ctaTitle}>Ready to find your next obsession?</h2>
            <p className={styles.ctaSubtitle}>
              Most readers discover a genre they&apos;d overlooked — or a subgenre they didn&apos;t know existed.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/quiz" className="btn btn--primary btn--large">
                Start the Quiz — 15 Questions
              </Link>
              <Link href="/analyzer" className="btn btn--secondary btn--large">
                Analyze Favorite Books
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
