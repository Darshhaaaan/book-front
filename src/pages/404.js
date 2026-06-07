import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import styles from '../styles/404.module.css';

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <title>Page Not Found — Book Persona</title>
      </Head>
      <div className={styles.page}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.icon}>◈</div>
          <h1>Chapter Not Found</h1>
          <p>This page seems to have wandered into a different story.</p>
          <div className={styles.btns}>
            <Link href="/" className="btn btn--primary">Return Home</Link>
            <Link href="/quiz" className="btn btn--secondary">Take the Quiz</Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
