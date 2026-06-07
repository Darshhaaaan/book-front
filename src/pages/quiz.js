import Head from 'next/head';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import { QUESTION_BANK, TOTAL_QUESTIONS } from '../data/questions';
import {
  initScores, applyAnswer, pickNextQuestion,
  computeProfile, getSubgenre, getArchetype
} from '../utils/quizEngine';
import styles from '../styles/Quiz.module.css';

const GENRE_BG_COLORS = {
  Fantasy: 'rgba(107,61,154,0.06)',
  Romance: 'rgba(138,61,94,0.06)',
  Mystery: 'rgba(44,74,110,0.06)',
  Thriller: 'rgba(122,58,42,0.06)',
  Horror: 'rgba(40,40,40,0.08)',
  'Science Fiction': 'rgba(26,92,122,0.06)',
  Adventure: 'rgba(61,107,78,0.06)',
  Action: 'rgba(138,74,26,0.06)',
  Comedy: 'rgba(74,106,106,0.06)',
  'Literary Fiction': 'rgba(74,74,74,0.06)',
};

export default function Quiz() {
  const router = useRouter();
  const [phase, setPhase] = useState('intro'); // intro | quiz | loading
  const [scores, setScores] = useState(initScores());
  const [usedIds, setUsedIds] = useState(new Set());
  const [currentQ, setCurrentQ] = useState(null);
  const [answered, setAnswered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bgColor, setBgColor] = useState('transparent');

  const startQuiz = () => {
    const first = QUESTION_BANK[Math.floor(Math.random() * 5)]; // Start from diverse first questions
    setCurrentQ(first);
    setUsedIds(new Set([first.id]));
    setPhase('quiz');
  };

  const handleSelect = (answer, index) => {
    if (selected !== null) return;
    setSelected(index);

    // Update bg color based on top genre
    const newScores = applyAnswer(scores, answer);
    const topGenre = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (topGenre && GENRE_BG_COLORS[topGenre]) {
      setBgColor(GENRE_BG_COLORS[topGenre]);
    }

    setTimeout(() => {
      const newAnswered = [...answered, { question: currentQ, answer, index }];
      setAnswered(newAnswered);
      setScores(newScores);

      if (newAnswered.length >= TOTAL_QUESTIONS) {
        // Quiz complete
        const profile = computeProfile(newScores);
        const subgenre = getSubgenre(profile.primaryGenre, profile.secondaryGenre);
        const archetype = getArchetype(profile.primaryGenre, profile.secondaryGenre);
        const resultData = { ...profile, subgenre, archetype };

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('quizResult', JSON.stringify(resultData));
        }
        setPhase('loading');
        setTimeout(() => router.push('/results?from=quiz'), 1500);
      } else {
        const newUsed = new Set([...usedIds, currentQ.id]);
        const next = pickNextQuestion(newScores, newUsed);
        if (next) {
          setUsedIds(newUsed);
          setCurrentQ(next);
          setSelected(null);
        }
      }
    }, 600);
  };

  const progress = answered.length / TOTAL_QUESTIONS;

  return (
    <Layout>
      <Head>
        <title>Personality Quiz — Book Persona</title>
      </Head>

      <div
        className={styles.quizPage}
        style={{ '--quiz-bg': bgColor }}
      >
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              className={styles.introSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.introContent}>
                <motion.div
                  className={styles.introEyebrow}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Personality Quiz
                </motion.div>
                <motion.h1
                  className={styles.introTitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  Fifteen questions.<br />
                  <em>Your reading identity.</em>
                </motion.h1>
                <motion.p
                  className={styles.introDesc}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Each question adapts based on your previous answers. We infer your preferences from how you think and feel — not from asking what genres you like.
                </motion.p>
                <motion.div
                  className={styles.introMeta}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span>15 Questions</span>
                  <span className={styles.dot}>·</span>
                  <span>~5 minutes</span>
                  <span className={styles.dot}>·</span>
                  <span>No right answers</span>
                </motion.div>
                <motion.button
                  className={`btn btn--primary btn--large ${styles.startBtn}`}
                  onClick={startQuiz}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Begin
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'quiz' && currentQ && (
            <motion.div
              key="quiz"
              className={styles.quizSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress */}
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <div className={styles.quizInner}>
                <div className={styles.questionMeta}>
                  <span className={styles.questionCount}>
                    {answered.length + 1} <span className={styles.questionTotal}>/ {TOTAL_QUESTIONS}</span>
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ.id}
                    className={styles.questionBlock}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <h2 className={styles.questionText}>{currentQ.text}</h2>

                    <div className={styles.answers}>
                      {currentQ.answers.map((answer, i) => (
                        <motion.button
                          key={i}
                          className={`${styles.answerBtn} ${selected === i ? styles.selected : ''} ${selected !== null && selected !== i ? styles.dimmed : ''}`}
                          onClick={() => handleSelect(answer, i)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}
                          whileHover={selected === null ? { scale: 1.02, x: 4 } : {}}
                          whileTap={selected === null ? { scale: 0.98 } : {}}
                          disabled={selected !== null}
                        >
                          <span className={styles.answerLetter}>{String.fromCharCode(65 + i)}</span>
                          <span className={styles.answerText}>{answer.text}</span>
                          {selected === i && (
                            <motion.span
                              className={styles.answerCheck}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                              ◆
                            </motion.span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {phase === 'loading' && (
            <motion.div
              key="loading"
              className={styles.loadingSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={styles.loadingContent}>
                <motion.div
                  className={styles.loadingSpinner}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ◈
                </motion.div>
                <motion.p
                  className={styles.loadingText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Building your reader profile…
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
