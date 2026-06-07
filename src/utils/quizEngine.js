import { QUESTION_BANK, GENRES, TOTAL_QUESTIONS } from '../data/questions';

export function initScores() {
  return GENRES.reduce((acc, g) => ({ ...acc, [g]: 0 }), {});
}

export function applyAnswer(scores, answer) {
  const next = { ...scores };
  Object.entries(answer.genres).forEach(([genre, weight]) => {
    next[genre] = (next[genre] || 0) + weight;
  });
  return next;
}

export function pickNextQuestion(scores, usedIds) {
  // Find the genre we're most uncertain about (lowest non-zero score)
  const sortedGenres = Object.entries(scores)
    .sort((a, b) => a[1] - b[1])
    .map(([g]) => g);

  const targetGenre = sortedGenres[0];

  // Find questions that help disambiguate the leading genres
  const candidates = QUESTION_BANK.filter(q => !usedIds.has(q.id));

  if (candidates.length === 0) return null;

  // Score each candidate question by how much it would help
  const scored = candidates.map(q => {
    let relevance = 0;
    q.answers.forEach(a => {
      Object.keys(a.genres).forEach(g => {
        if (g === targetGenre) relevance += 2;
        else if (sortedGenres.slice(0, 3).includes(g)) relevance += 1;
      });
    });
    return { q, relevance };
  });

  scored.sort((a, b) => b.relevance - a.relevance);
  // Pick from top 5 with some randomness
  const pool = scored.slice(0, 5);
  return pool[Math.floor(Math.random() * pool.length)].q;
}

export function computeProfile(scores) {
  const sorted = Object.entries(scores)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]);

  const total = sorted.reduce((s, [, v]) => s + v, 0) || 1;

  const [primary, secondary, tertiary] = sorted;

  const primaryGenre = primary?.[0] || 'Literary Fiction';
  const secondaryGenre = secondary?.[0] || null;
  const tertiaryGenre = tertiary?.[0] || null;

  const primaryScore = primary?.[1] || 0;
  const secondaryScore = secondary?.[1] || 0;

  const primaryPct = Math.round((primaryScore / total) * 100);
  const secondaryPct = secondary ? Math.round((secondaryScore / total) * 100) : 0;
  const confidence = Math.min(Math.round(primaryPct * 1.2), 97);

  const genreBreakdown = sorted.slice(0, 5).map(([genre, val]) => ({
    genre,
    score: val,
    pct: Math.round((val / total) * 100),
  }));

  return {
    primaryGenre,
    secondaryGenre,
    tertiaryGenre,
    confidence,
    primaryPct,
    secondaryPct,
    genreBreakdown,
    rawScores: scores,
  };
}

export function getSubgenre(primary, secondary) {
  if (!secondary) return primary;
  const map = {
    'Fantasy+Adventure': 'Epic Fantasy',
    'Fantasy+Romance': 'Romantasy',
    'Fantasy+Horror': 'Dark Fantasy',
    'Fantasy+Mystery': 'Magical Mystery',
    'Fantasy+Action': 'Heroic Fantasy',
    'Fantasy+Comedy': 'Comic Fantasy',
    'Fantasy+Literary Fiction': 'Literary Fantasy',
    'Fantasy+Science Fiction': 'Science Fantasy',
    'Science Fiction+Thriller': 'Techno Thriller',
    'Science Fiction+Horror': 'Cosmic Horror',
    'Science Fiction+Adventure': 'Space Opera',
    'Science Fiction+Romance': 'SF Romance',
    'Science Fiction+Comedy': 'Comic Sci-Fi',
    'Science Fiction+Literary Fiction': 'Speculative Fiction',
    'Science Fiction+Action': 'Military Sci-Fi',
    'Romance+Comedy': 'Romantic Comedy',
    'Romance+Mystery': 'Romantic Suspense',
    'Romance+Horror': 'Gothic Romance',
    'Romance+Adventure': 'Romantic Adventure',
    'Mystery+Thriller': 'Crime Thriller',
    'Mystery+Horror': 'Dark Mystery',
    'Mystery+Comedy': 'Cozy Mystery',
    'Mystery+Literary Fiction': 'Literary Mystery',
    'Thriller+Horror': 'Psychological Horror',
    'Thriller+Action': 'Action Thriller',
    'Adventure+Action': 'Action Adventure',
    'Adventure+Comedy': 'Comic Adventure',
    'Literary Fiction+Horror': 'Gothic Fiction',
    'Literary Fiction+Comedy': 'Satirical Fiction',
    'Literary Fiction+Adventure': 'Historical Adventure',
    'Literary Fiction+Thriller': 'Literary Thriller',
    'Horror+Action': 'Survival Horror',
    'Action+Comedy': 'Comic Action',
  };
  return map[`${primary}+${secondary}`] || map[`${secondary}+${primary}`] || `${primary} ${secondary}`;
}

export function getArchetype(primary, secondary) {
  const map = {
    'Fantasy': 'The Dreamer',
    'Fantasy+Adventure': 'The Adventurer',
    'Fantasy+Romance': 'The Romantic',
    'Fantasy+Horror': 'The Seeker',
    'Fantasy+Mystery': 'The Seeker',
    'Fantasy+Action': 'The Champion',
    'Science Fiction': 'The Visionary',
    'Science Fiction+Thriller': 'The Strategist',
    'Science Fiction+Horror': 'The Explorer',
    'Science Fiction+Adventure': 'The Visionary',
    'Science Fiction+Comedy': 'The Observer',
    'Science Fiction+Literary Fiction': 'The Philosopher',
    'Mystery': 'The Detective',
    'Mystery+Thriller': 'The Detective',
    'Mystery+Horror': 'The Detective',
    'Thriller': 'The Survivor',
    'Thriller+Horror': 'The Survivor',
    'Thriller+Action': 'The Survivor',
    'Horror': 'The Survivor',
    'Horror+Fantasy': 'The Seeker',
    'Romance': 'The Romantic',
    'Romance+Comedy': 'The Romantic',
    'Romance+Mystery': 'The Romantic',
    'Adventure': 'The Explorer',
    'Adventure+Action': 'The Explorer',
    'Action': 'The Champion',
    'Comedy': 'The Observer',
    'Literary Fiction': 'The Observer',
    'Literary Fiction+Romance': 'The Romantic',
    'Literary Fiction+Thriller': 'The Strategist',
    'Literary Fiction+Mystery': 'The Detective',
  };
  const key = secondary ? `${primary}+${secondary}` : primary;
  return map[key] || map[primary] || 'The Explorer';
}

export const ARCHETYPE_DATA = {
  'The Explorer': {
    icon: '◎',
    color: '#3d6b4e',
    summary: 'You seek the unknown with open eyes and an open heart. Journey, discovery, and the thrill of uncharted territory define your reading identity.',
    traits: ['Curious', 'Open-minded', 'Adventurous', 'Resilient'],
    readingHabits: 'You read in immersive sessions, losing hours in richly described worlds. You prefer complete series over standalones and often have multiple books open at once.',
    whyChosen: 'Your answers consistently revealed a preference for discovery, unfamiliar places, and the satisfaction of going somewhere new — in fiction and in life.',
  },
  'The Dreamer': {
    icon: '✦',
    color: '#6b3d9a',
    summary: 'Magic, wonder, and the impossible feel like home to you. You read to inhabit worlds that expand the boundaries of what reality can be.',
    traits: ['Imaginative', 'Idealistic', 'Creative', 'Empathetic'],
    readingHabits: 'You savor every detail of worldbuilding and often reread favorites. You form deep attachments to fictional characters and mourn them like real losses.',
    whyChosen: 'Your answers showed a strong pull toward wonder, magical thinking, and stories that take the impossible seriously.',
  },
  'The Detective': {
    icon: '◈',
    color: '#2c4a6e',
    summary: 'Your mind is a puzzle-solving engine. You read to follow threads of logic, spot inconsistencies, and experience the satisfaction of order restored.',
    traits: ['Analytical', 'Perceptive', 'Patient', 'Methodical'],
    readingHabits: 'You read actively, taking mental notes and testing theories. You often guess the ending — and love being wrong. You reread openings after finishing.',
    whyChosen: 'Your responses revealed a consistent appreciation for hidden truth, pattern recognition, and the precise pleasure of deduction.',
  },
  'The Strategist': {
    icon: '⬡',
    color: '#2c3e50',
    summary: 'You are drawn to complexity, systems, and stories that reward careful thinking. You see patterns others miss and appreciate plots with layered consequences.',
    traits: ['Logical', 'Strategic', 'Thoughtful', 'Precise'],
    readingHabits: 'You appreciate detailed plots and prefer authors who do their research. You think about themes long after finishing and recommend books with arguments.',
    whyChosen: 'Your answers prioritized intellectual challenge, systemic thinking, and the satisfaction of watching a complex plan unfold.',
  },
  'The Romantic': {
    icon: '◇',
    color: '#8a3d5e',
    summary: 'Emotional truth is the measure of all great stories for you. You believe relationships — their friction, tenderness, and transformation — are literature\'s highest subject.',
    traits: ['Empathetic', 'Passionate', 'Emotional', 'Expressive'],
    readingHabits: 'You read emotionally, feeling characters\' joy and pain viscerally. You return to scenes that moved you and annotate your favorite passages.',
    whyChosen: 'Your answers consistently pointed toward emotional depth, human connection, and the transformative power of love and loss.',
  },
  'The Survivor': {
    icon: '◉',
    color: '#7a3a2a',
    summary: 'You are drawn to stories of pressure, endurance, and what emerges from the darkest places. Fear doesn\'t repel you — it teaches you something about what matters.',
    traits: ['Resilient', 'Intense', 'Fearless', 'Grounded'],
    readingHabits: 'You read late at night, often in one sitting. You appreciate authors who don\'t flinch from difficult material, and you trust dark endings.',
    whyChosen: 'Your responses showed a consistent appetite for high stakes, darkness as meaning, and the psychology of people under extreme pressure.',
  },
  'The Visionary': {
    icon: '◐',
    color: '#1a5c7a',
    summary: 'You read to see where humanity is going — and whether it\'s a place worth going. Ideas, futures, and the philosophical questions of existence drive your choices.',
    traits: ['Forward-thinking', 'Intellectual', 'Curious', 'Optimistic'],
    readingHabits: 'You read widely across non-fiction and fiction. A great book makes you want to learn everything about its topic and share it immediately.',
    whyChosen: 'Your answers showed a fascination with technology, the future of humanity, and stories that use the speculative to illuminate present truth.',
  },
  'The Adventurer': {
    icon: '◆',
    color: '#5a7a2a',
    summary: 'Story as motion. Every page should carry you somewhere new. You live for the thrill of momentum, the weight of consequence, and a well-earned triumph.',
    traits: ['Bold', 'Energetic', 'Spontaneous', 'Spirited'],
    readingHabits: 'You read fast and wide, always chasing that next great discovery. You have strong opinions and share recommendations freely and enthusiastically.',
    whyChosen: 'Your answers showed a consistent hunger for forward motion, physical stakes, and stories where the journey itself is the point.',
  },
  'The Champion': {
    icon: '◀',
    color: '#8a4a1a',
    summary: 'You believe in action, courage, and the power of individuals to change their world. Stories where characters rise to impossible challenges speak directly to you.',
    traits: ['Determined', 'Courageous', 'Principled', 'Driven'],
    readingHabits: 'You prefer active protagonists and forward-moving plots. You want your heroes to earn their victories and your villains to be genuinely dangerous.',
    whyChosen: 'Your responses consistently valued decisive action, physical courage, and the drama of a fight worth having.',
  },
  'The Observer': {
    icon: '○',
    color: '#4a6a6a',
    summary: 'You read to understand the human condition in all its beautiful, absurd, and contradictory dimensions. Wit and wisdom go hand in hand for you.',
    traits: ['Perceptive', 'Witty', 'Reflective', 'Nuanced'],
    readingHabits: 'You appreciate prose as much as plot. A perfectly constructed sentence stops you cold. You read slowly and re-read often, catching new layers.',
    whyChosen: 'Your answers showed appreciation for irony, social observation, and the comedic lens as a vehicle for genuine insight.',
  },
  'The Seeker': {
    icon: '◑',
    color: '#5a3d6b',
    summary: 'You\'re drawn to liminal spaces — between worlds, between certainties, between fear and fascination. The uncanny speaks a language you understand instinctively.',
    traits: ['Intuitive', 'Mysterious', 'Sensitive', 'Introspective'],
    readingHabits: 'You seek atmosphere as much as story. Mood, tone, and prose style matter as much as plot. You read at night, in quiet, with full attention.',
    whyChosen: 'Your responses revealed a taste for ambiguity, the atmospheric, and stories that exist in the space between the known and the terrifying unknown.',
  },
  'The Philosopher': {
    icon: '◯',
    color: '#2c4a4a',
    summary: 'For you, the best books are invitations to think differently about existence itself. You measure a story\'s worth by the questions it leaves unanswered.',
    traits: ['Intellectual', 'Contemplative', 'Deep', 'Questioning'],
    readingHabits: 'You take notes, mark pages, and return to books years later finding new meaning. Your reading list is curated, intentional, and non-negotiable.',
    whyChosen: 'Your answers showed a deep attraction to ideas, philosophical weight, and stories that take seriously the hardest questions about what it means to be human.',
  },
};
