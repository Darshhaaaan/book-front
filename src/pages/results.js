import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import BookCard from '../components/UI/BookCard';
import GenreBar from '../components/UI/GenreBar';
import { api } from '../utils/api';
import { ARCHETYPE_DATA } from '../utils/quizEngine';
import styles from '../styles/Results.module.css';

export default function Results() {
  const router = useRouter();
  const { from } = router.query;
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const stored = sessionStorage.getItem(from === 'quiz' ? 'quizResult' : 'analyzerResult');
    if (!stored) {
      router.push(from === 'quiz' ? '/quiz' : '/analyzer');
      return;
    }
    const parsed = JSON.parse(stored);
    setResult(parsed);

    // Fetch recommendations
    const fetchRecs = async () => {
      try {
        let data;
        if (from === 'quiz') {
          data = await api.getRecommendationsFromQuiz({
            primaryGenre: parsed.primaryGenre,
            secondaryGenre: parsed.secondaryGenre,
            tertiaryGenre: parsed.tertiaryGenre,
            scores: parsed.rawScores,
          });
        } else {
          data = await api.getRecommendationsFromBooks(parsed.favoriteBooks);
          if (data.readerProfile) {
            setResult(prev => ({ ...prev, ...data.readerProfile }));
          }
        }
        setRecommendations(data.recommendations || []);
      } catch (err) {
        setError('Could not load recommendations. Please check the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, [router.isReady, from]);

  if (!result) {
    return (
      <Layout>
        <div className={styles.loadingPage}>
          <motion.div
            className={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >◈</motion.div>
        </div>
      </Layout>
    );
  }

  const archetypeData = ARCHETYPE_DATA[result.archetype] || ARCHETYPE_DATA['The Explorer'];

  return (
    <Layout>
      <Head>
        <title>{result.archetype} — Your Reading Profile · Book Persona</title>
      </Head>

      <div className={styles.resultsPage}>
        {/* HERO ARCHETYPE */}
        <section className={styles.archetypeHero} style={{ '--archetype-color': archetypeData.color }}>
          <div className={styles.archetypeHeroBg} />
          <div className="container">
            <motion.div
              className={styles.archetypeContent}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className={styles.archetypeEyebrow}>Your Reader Archetype</p>
              <div className={styles.archetypeIcon}>{archetypeData.icon}</div>
              <h1 className={styles.archetypeName}>{result.archetype}</h1>
              <p className={styles.archetypeSummary}>{archetypeData.summary}</p>

              <div className={styles.archetypeGenres}>
                <div className={styles.genreTag} style={{ background: `${archetypeData.color}22`, borderColor: `${archetypeData.color}44`, color: archetypeData.color }}>
                  {result.subgenre || result.primaryGenre}
                </div>
                {result.secondaryGenre && (
                  <div className={styles.genreTag}>{result.secondaryGenre}</div>
                )}
                {result.tertiaryGenre && (
                  <div className={styles.genreTag}>{result.tertiaryGenre}</div>
                )}
              </div>

              {/* Confidence */}
              <div className={styles.confidenceSection}>
                <div className={styles.confidenceLabel}>Profile Confidence</div>
                <div className={styles.confidenceBar}>
                  <motion.div
                    className={styles.confidenceFill}
                    style={{ background: `linear-gradient(90deg, ${archetypeData.color}, ${archetypeData.color}99)` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence || 80}%` }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className={styles.confidenceValue}>{result.confidence || 80}%</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* GENRE BREAKDOWN */}
        <section className={styles.breakdownSection}>
          <div className="container">
            <div className={styles.breakdownGrid}>
              <motion.div
                className={styles.breakdownCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className={styles.cardTitle}>Genre Breakdown</h3>
                {result.genreBreakdown?.map((item, i) => (
                  <GenreBar key={item.genre} genre={item.genre} pct={item.pct} delay={i * 0.1} />
                ))}
              </motion.div>

              <motion.div
                className={styles.breakdownCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h3 className={styles.cardTitle}>Reader Profile</h3>
                <div className={styles.traitsList}>
                  {archetypeData.traits?.map((t, i) => (
                    <motion.div
                      key={t}
                      className={styles.traitItem}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className={styles.traitDot} style={{ background: archetypeData.color }} />
                      {t}
                    </motion.div>
                  ))}
                </div>

                <div className={styles.readingHabits}>
                  <h4 className={styles.habitsTitle}>Reading Habits</h4>
                  <p className={styles.habitsText}>{archetypeData.readingHabits}</p>
                </div>

                {result.themes?.length > 0 && (
                  <div className={styles.themes}>
                    <h4 className={styles.habitsTitle}>Core Themes</h4>
                    <div className={styles.themesList}>
                      {result.themes.map(t => (
                        <span key={t} className="tag tag--accent">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            <motion.div
              className={styles.whyCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={styles.cardTitle}>Why This Result</h3>
              <p className={styles.whyText}>{archetypeData.whyChosen}</p>
            </motion.div>
          </div>
        </section>

        {/* RECOMMENDATIONS */}
        <section className={styles.recsSection}>
          <div className="container">
            <motion.div
              className={styles.recsSectionHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className={styles.sectionEyebrow}>Curated For You</p>
              <h2>Recommended Reading</h2>
              <p className={styles.recsSubtitle}>
                Ranked by genre fit, theme alignment, and reader profile match.
              </p>
            </motion.div>

            {loading && (
              <div className={styles.recsLoading}>
                {[1, 2, 3].map(i => (
                  <div key={i} className={styles.skeletonCard}>
                    <div className={`skeleton ${styles.skeletonCover}`} />
                    <div className={styles.skeletonInfo}>
                      <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '70%' }} />
                      <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '50%' }} />
                      <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '90%' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className={styles.errorBox}>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && recommendations.length > 0 && (
              <div className={styles.recsList}>
                {recommendations.map((book, i) => (
                  <BookCard
                    key={book.id || i}
                    book={book}
                    rank={i + 1}
                    delay={i * 0.1}
                    expanded={expanded === i}
                    onToggle={() => setExpanded(expanded === i ? null : i)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RETRY CTA */}
        <section className={styles.retrySection}>
          <div className="container">
            <div className={styles.retryBox}>
              <h3>Explore a different path</h3>
              <p>Try the other discovery method to see if your results align.</p>
              <div className={styles.retryBtns}>
                <Link href="/quiz" className="btn btn--secondary">Retake the Quiz</Link>
                <Link href="/analyzer" className="btn btn--secondary">Book Analyzer</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
