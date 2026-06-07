// 50+ psychologically meaningful questions with genre weights
// Questions infer genre preferences without asking directly

export const QUESTION_BANK = [
  {
    id: 'q1',
    text: 'When you face an important decision, what do you rely on most?',
    answers: [
      { text: 'Research and careful analysis of all options', genres: { 'Mystery': 1, 'Science Fiction': 0.5, 'Thriller': 0.25 } },
      { text: 'My gut feeling and intuition', genres: { 'Fantasy': 1, 'Horror': 0.5, 'Adventure': 0.25 } },
      { text: 'Advice from people I trust', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'A bold leap of faith', genres: { 'Adventure': 1, 'Action': 0.5, 'Fantasy': 0.25 } },
    ],
  },
  {
    id: 'q2',
    text: 'What kind of evening feels most restorative to you?',
    answers: [
      { text: 'Solving a puzzle or strategy game alone', genres: { 'Mystery': 1, 'Thriller': 0.5, 'Science Fiction': 0.25 } },
      { text: 'A long walk exploring somewhere unfamiliar', genres: { 'Adventure': 1, 'Fantasy': 0.5 } },
      { text: 'A deep conversation with someone close', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'An atmospheric movie that unsettles you', genres: { 'Horror': 1, 'Thriller': 0.5 } },
    ],
  },
  {
    id: 'q3',
    text: 'If you could live inside one type of world, which would it be?',
    answers: [
      { text: 'A sprawling world with magic and ancient prophecies', genres: { 'Fantasy': 1, 'Adventure': 0.5 } },
      { text: 'A future civilization among the stars', genres: { 'Science Fiction': 1, 'Adventure': 0.5 } },
      { text: 'A close-knit community with deep interpersonal drama', genres: { 'Literary Fiction': 1, 'Romance': 0.5 } },
      { text: 'A city full of secrets where danger lurks', genres: { 'Mystery': 1, 'Thriller': 0.5, 'Horror': 0.25 } },
    ],
  },
  {
    id: 'q4',
    text: 'How do you feel about unexpected plot twists?',
    answers: [
      { text: 'I live for them — the more shocking, the better', genres: { 'Thriller': 1, 'Mystery': 0.5 } },
      { text: 'I love them if they feel earned and well-set-up', genres: { 'Mystery': 1, 'Literary Fiction': 0.5 } },
      { text: 'I prefer stories that deliver on their emotional promise', genres: { 'Romance': 1, 'Literary Fiction': 0.25 } },
      { text: 'I find them disorienting but can appreciate them', genres: { 'Science Fiction': 0.5, 'Horror': 0.5 } },
    ],
  },
  {
    id: 'q5',
    text: 'What draws you to a new person you\'ve just met?',
    answers: [
      { text: 'Their ideas about the world and how it works', genres: { 'Science Fiction': 1, 'Literary Fiction': 0.5, 'Mystery': 0.25 } },
      { text: 'Their energy and sense of adventure', genres: { 'Adventure': 1, 'Action': 0.5, 'Romance': 0.25 } },
      { text: 'Their warmth and emotional depth', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'The feeling that there\'s something they\'re hiding', genres: { 'Mystery': 1, 'Thriller': 0.5, 'Horror': 0.25 } },
    ],
  },
  {
    id: 'q6',
    text: 'When things go wrong, what\'s your instinct?',
    answers: [
      { text: 'Stay calm and analyze what happened', genres: { 'Mystery': 1, 'Science Fiction': 0.5 } },
      { text: 'Take immediate, decisive action', genres: { 'Action': 1, 'Thriller': 0.5, 'Adventure': 0.25 } },
      { text: 'Reach out for support and connection', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'Sit with the discomfort and process it', genres: { 'Literary Fiction': 1, 'Horror': 0.25 } },
    ],
  },
  {
    id: 'q7',
    text: 'What do you value most in a story\'s protagonist?',
    answers: [
      { text: 'Intelligence and the ability to outsmart everyone', genres: { 'Mystery': 1, 'Thriller': 0.5, 'Science Fiction': 0.25 } },
      { text: 'Courage that inspires even when everything is against them', genres: { 'Fantasy': 1, 'Adventure': 0.5, 'Action': 0.25 } },
      { text: 'Emotional honesty and vulnerability', genres: { 'Literary Fiction': 1, 'Romance': 0.5 } },
      { text: 'Survival instinct and resilience under pressure', genres: { 'Horror': 1, 'Thriller': 0.5, 'Action': 0.25 } },
    ],
  },
  {
    id: 'q8',
    text: 'What\'s your relationship with fear?',
    answers: [
      { text: 'I seek it out — fear sharpens the senses', genres: { 'Horror': 1, 'Thriller': 0.5 } },
      { text: 'I prefer tension that resolves into triumph', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'I prefer excitement over actual fear', genres: { 'Adventure': 1, 'Action': 0.5 } },
      { text: 'I\'d rather feel wonder than dread', genres: { 'Fantasy': 1, 'Science Fiction': 0.5, 'Comedy': 0.25 } },
    ],
  },
  {
    id: 'q9',
    text: 'What landscape would you most like to explore?',
    answers: [
      { text: 'Ancient ruins deep in an enchanted forest', genres: { 'Fantasy': 1, 'Adventure': 0.5 } },
      { text: 'A strange alien world with impossible geography', genres: { 'Science Fiction': 1, 'Adventure': 0.5 } },
      { text: 'A fog-covered coastal village with hidden secrets', genres: { 'Mystery': 1, 'Horror': 0.5 } },
      { text: 'A sun-drenched foreign city during a festival', genres: { 'Romance': 1, 'Comedy': 0.5, 'Adventure': 0.25 } },
    ],
  },
  {
    id: 'q10',
    text: 'Which kind of conflict interests you most?',
    answers: [
      { text: 'Person versus a vast, indifferent universe', genres: { 'Science Fiction': 1, 'Literary Fiction': 0.5 } },
      { text: 'Person versus a cunning, worthy opponent', genres: { 'Thriller': 1, 'Mystery': 0.5, 'Action': 0.25 } },
      { text: 'Person versus their own nature and past', genres: { 'Literary Fiction': 1, 'Horror': 0.5 } },
      { text: 'Person versus an ancient evil or dark power', genres: { 'Fantasy': 1, 'Horror': 0.5, 'Action': 0.25 } },
    ],
  },
  {
    id: 'q11',
    text: 'How do you prefer romantic relationships in stories?',
    answers: [
      { text: 'Central and transformative — the heart of the story', genres: { 'Romance': 1, 'Literary Fiction': 0.25 } },
      { text: 'A compelling thread woven through a bigger plot', genres: { 'Fantasy': 0.5, 'Adventure': 0.5, 'Action': 0.25 } },
      { text: 'Slow-burn with real emotional stakes', genres: { 'Romance': 1, 'Mystery': 0.25 } },
      { text: 'I\'d rather not — it distracts from the plot', genres: { 'Thriller': 0.5, 'Science Fiction': 0.5, 'Mystery': 0.5 } },
    ],
  },
  {
    id: 'q12',
    text: 'Which quality do you look for in a writing style?',
    answers: [
      { text: 'Lush prose that creates atmosphere and beauty', genres: { 'Fantasy': 1, 'Literary Fiction': 0.5, 'Horror': 0.25 } },
      { text: 'Clean, propulsive writing that never slows down', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'Deep psychological insight into characters\' minds', genres: { 'Literary Fiction': 1, 'Mystery': 0.5 } },
      { text: 'Wit and intelligence that makes you laugh out loud', genres: { 'Comedy': 1, 'Literary Fiction': 0.25 } },
    ],
  },
  {
    id: 'q13',
    text: 'What do you imagine when you think of a perfect adventure?',
    answers: [
      { text: 'Discovering an ancient civilization no one else has found', genres: { 'Adventure': 1, 'Fantasy': 0.5, 'Mystery': 0.25 } },
      { text: 'Racing against time to prevent a catastrophe', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'Getting lost somewhere beautiful with someone you love', genres: { 'Romance': 1, 'Adventure': 0.25 } },
      { text: 'Building something new in an unknown world', genres: { 'Science Fiction': 1, 'Fantasy': 0.5 } },
    ],
  },
  {
    id: 'q14',
    text: 'What gives you the most satisfaction in life?',
    answers: [
      { text: 'Figuring out something no one else could', genres: { 'Mystery': 1, 'Science Fiction': 0.5 } },
      { text: 'Deep, enduring connections with others', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'Physical or creative accomplishment', genres: { 'Action': 1, 'Adventure': 0.5 } },
      { text: 'Understanding something profound about how things work', genres: { 'Science Fiction': 1, 'Literary Fiction': 0.5, 'Mystery': 0.25 } },
    ],
  },
  {
    id: 'q15',
    text: 'Which description of a story\'s tone appeals to you most?',
    answers: [
      { text: 'Dark and unsettling with a constant sense of unease', genres: { 'Horror': 1, 'Thriller': 0.5 } },
      { text: 'Grand and epic with moments of transcendent wonder', genres: { 'Fantasy': 1, 'Adventure': 0.5 } },
      { text: 'Intimate and tender with earned emotional release', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'Sharp and witty with dark undercurrents', genres: { 'Comedy': 1, 'Literary Fiction': 0.5, 'Mystery': 0.25 } },
    ],
  },
  {
    id: 'q16',
    text: 'What kind of endings stay with you the longest?',
    answers: [
      { text: 'Ambiguous endings that leave you thinking for days', genres: { 'Literary Fiction': 1, 'Horror': 0.5, 'Mystery': 0.25 } },
      { text: 'Deeply satisfying resolutions where characters earn their peace', genres: { 'Fantasy': 1, 'Romance': 0.5 } },
      { text: 'Devastating but inevitable tragedies', genres: { 'Literary Fiction': 1, 'Horror': 0.25 } },
      { text: 'Triumphant, heart-pounding final moments', genres: { 'Action': 1, 'Thriller': 0.5, 'Adventure': 0.25 } },
    ],
  },
  {
    id: 'q17',
    text: 'What\'s your stance on moral complexity in characters?',
    answers: [
      { text: 'I want characters I can clearly root for', genres: { 'Fantasy': 1, 'Adventure': 0.5, 'Romance': 0.25 } },
      { text: 'The grayer the better — I distrust simple good vs evil', genres: { 'Literary Fiction': 1, 'Thriller': 0.5, 'Horror': 0.25 } },
      { text: 'I love antiheroes who are wrong but compelling', genres: { 'Thriller': 1, 'Mystery': 0.5 } },
      { text: 'I want characters to grow into better versions of themselves', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
    ],
  },
  {
    id: 'q18',
    text: 'When you travel, what do you seek out first?',
    answers: [
      { text: 'Historical sites and hidden neighborhoods', genres: { 'Adventure': 1, 'Mystery': 0.5, 'Literary Fiction': 0.25 } },
      { text: 'Local cuisine and warm, spontaneous connections', genres: { 'Romance': 1, 'Comedy': 0.5 } },
      { text: 'Wild nature and landscapes that make you feel small', genres: { 'Fantasy': 0.5, 'Adventure': 1, 'Horror': 0.25 } },
      { text: 'Technology, innovation, and glimpses of the future', genres: { 'Science Fiction': 1, 'Thriller': 0.25 } },
    ],
  },
  {
    id: 'q19',
    text: 'What kind of mystery engages you most?',
    answers: [
      { text: 'A locked-room murder where the solution is impossibly elegant', genres: { 'Mystery': 1, 'Thriller': 0.25 } },
      { text: 'An ancient secret that rewrites history', genres: { 'Adventure': 1, 'Fantasy': 0.5, 'Mystery': 0.5 } },
      { text: 'The mystery of another person\'s true inner life', genres: { 'Literary Fiction': 1, 'Romance': 0.5 } },
      { text: 'A conspiracy that goes all the way to the top', genres: { 'Thriller': 1, 'Science Fiction': 0.25 } },
    ],
  },
  {
    id: 'q20',
    text: 'How do you feel about stories where the protagonist loses?',
    answers: [
      { text: 'Loss can be more meaningful than victory — I embrace it', genres: { 'Literary Fiction': 1, 'Horror': 0.5 } },
      { text: 'Loss is fine if it leads to profound transformation', genres: { 'Literary Fiction': 0.5, 'Fantasy': 0.5, 'Romance': 0.25 } },
      { text: 'I prefer tension that ends in triumph', genres: { 'Action': 1, 'Adventure': 0.5, 'Thriller': 0.25 } },
      { text: 'I need some hope — complete despair isn\'t for me', genres: { 'Romance': 1, 'Comedy': 0.5 } },
    ],
  },
  {
    id: 'q21',
    text: 'What aspect of a fictional world interests you most?',
    answers: [
      { text: 'The history and mythology behind everything', genres: { 'Fantasy': 1, 'Adventure': 0.5 } },
      { text: 'The science and internal logic of how things work', genres: { 'Science Fiction': 1, 'Mystery': 0.25 } },
      { text: 'The social structures and power dynamics at play', genres: { 'Literary Fiction': 1, 'Science Fiction': 0.5 } },
      { text: 'The atmosphere — what it would actually feel like to be there', genres: { 'Horror': 1, 'Fantasy': 0.5, 'Literary Fiction': 0.25 } },
    ],
  },
  {
    id: 'q22',
    text: 'If you could have one extraordinary ability, what would it be?',
    answers: [
      { text: 'To see through deception and understand hidden truths', genres: { 'Mystery': 1, 'Thriller': 0.5 } },
      { text: 'To wield powerful magic that bends reality', genres: { 'Fantasy': 1, 'Adventure': 0.25 } },
      { text: 'To understand the language of the universe itself', genres: { 'Science Fiction': 1, 'Literary Fiction': 0.25 } },
      { text: 'To survive any physical challenge without limits', genres: { 'Action': 1, 'Adventure': 0.5, 'Horror': 0.25 } },
    ],
  },
  {
    id: 'q23',
    text: 'What do you think is the most underrated element in storytelling?',
    answers: [
      { text: 'A sense of place so vivid it becomes a character', genres: { 'Literary Fiction': 1, 'Horror': 0.5, 'Fantasy': 0.25 } },
      { text: 'Pacing — knowing exactly when to slow down and when to run', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'The unspoken things between characters', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'A villain who genuinely believes they are right', genres: { 'Mystery': 0.5, 'Thriller': 0.5, 'Fantasy': 0.5 } },
    ],
  },
  {
    id: 'q24',
    text: 'What\'s your attitude toward hope in dark stories?',
    answers: [
      { text: 'The darkest stories are the most meaningful', genres: { 'Horror': 1, 'Literary Fiction': 0.5 } },
      { text: 'There should always be a light worth fighting for', genres: { 'Fantasy': 1, 'Action': 0.25, 'Adventure': 0.25 } },
      { text: 'Hope through human connection is the most powerful force', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'Earned hope after real suffering is irresistible', genres: { 'Thriller': 0.5, 'Adventure': 0.5, 'Literary Fiction': 0.5 } },
    ],
  },
  {
    id: 'q25',
    text: 'What stirs something deep in you?',
    answers: [
      { text: 'The feeling that the universe is infinite and unknowable', genres: { 'Science Fiction': 1, 'Horror': 0.5, 'Fantasy': 0.25 } },
      { text: 'Two people recognizing each other as home', genres: { 'Romance': 1, 'Literary Fiction': 0.25 } },
      { text: 'The precise moment when scattered clues suddenly make sense', genres: { 'Mystery': 1, 'Thriller': 0.5 } },
      { text: 'Standing at the edge of something vast and wild', genres: { 'Adventure': 1, 'Fantasy': 0.5, 'Horror': 0.25 } },
    ],
  },
  {
    id: 'q26',
    text: 'How do you feel about humor in serious stories?',
    answers: [
      { text: 'Humor is essential — it makes the heavy parts hit harder', genres: { 'Comedy': 1, 'Literary Fiction': 0.25 } },
      { text: 'I like dry wit that rewards close reading', genres: { 'Literary Fiction': 1, 'Mystery': 0.25 } },
      { text: 'I prefer tone consistency — go dark or go light', genres: { 'Horror': 0.5, 'Thriller': 0.5 } },
      { text: 'A well-placed joke can save a scene', genres: { 'Comedy': 1, 'Adventure': 0.25, 'Romance': 0.25 } },
    ],
  },
  {
    id: 'q27',
    text: 'What kind of supporting characters enrich a story for you?',
    answers: [
      { text: 'Eccentric, deeply idiosyncratic individuals', genres: { 'Comedy': 1, 'Literary Fiction': 0.5 } },
      { text: 'Loyal companions who grow alongside the protagonist', genres: { 'Fantasy': 1, 'Adventure': 0.5 } },
      { text: 'Morally complex figures who challenge the hero', genres: { 'Thriller': 1, 'Literary Fiction': 0.5 } },
      { text: 'A community that comes alive and feels like home', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
    ],
  },
  {
    id: 'q28',
    text: 'How long do you like your stories to be?',
    answers: [
      { text: 'Long enough to fully build a world I can get lost in', genres: { 'Fantasy': 1, 'Science Fiction': 0.5 } },
      { text: 'Whatever length serves the story — no padding, no rushing', genres: { 'Literary Fiction': 1, 'Mystery': 0.5 } },
      { text: 'Fast and lean — I want every page to matter', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'Long enough to deeply invest me in the characters', genres: { 'Romance': 1, 'Literary Fiction': 0.5, 'Fantasy': 0.25 } },
    ],
  },
  {
    id: 'q29',
    text: 'What kind of information do you absorb best?',
    answers: [
      { text: 'Through stories and metaphor', genres: { 'Literary Fiction': 1, 'Fantasy': 0.5 } },
      { text: 'Through evidence, data, and logical deduction', genres: { 'Mystery': 1, 'Science Fiction': 0.5 } },
      { text: 'Through emotional experience and empathy', genres: { 'Romance': 1, 'Literary Fiction': 0.25 } },
      { text: 'Through action and direct experience', genres: { 'Action': 1, 'Adventure': 0.5 } },
    ],
  },
  {
    id: 'q30',
    text: 'What do you think is the bravest thing a person can do?',
    answers: [
      { text: 'Stand alone against overwhelming power', genres: { 'Action': 1, 'Fantasy': 0.5, 'Thriller': 0.25 } },
      { text: 'Be completely honest about who they are', genres: { 'Literary Fiction': 1, 'Romance': 0.5 } },
      { text: 'Walk into the dark not knowing what waits there', genres: { 'Horror': 1, 'Adventure': 0.5, 'Mystery': 0.25 } },
      { text: 'Love someone fully despite the risk of loss', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
    ],
  },
  {
    id: 'q31',
    text: 'What draws you to learn more about history?',
    answers: [
      { text: 'The dramatic personalities who shaped events', genres: { 'Literary Fiction': 1, 'Action': 0.25 } },
      { text: 'The patterns that keep repeating across centuries', genres: { 'Science Fiction': 0.5, 'Literary Fiction': 0.5, 'Mystery': 0.5 } },
      { text: 'The ordinary lives lived inside extraordinary circumstances', genres: { 'Literary Fiction': 1, 'Romance': 0.5 } },
      { text: 'The unexplained mysteries and strange coincidences', genres: { 'Mystery': 1, 'Fantasy': 0.5, 'Horror': 0.25 } },
    ],
  },
  {
    id: 'q32',
    text: 'What does "escapism" mean to you?',
    answers: [
      { text: 'Temporary refuge from reality in a safe, beautiful world', genres: { 'Fantasy': 1, 'Romance': 0.5 } },
      { text: 'Confronting difficult truths through the lens of fiction', genres: { 'Literary Fiction': 1, 'Science Fiction': 0.5 } },
      { text: 'Pure adrenaline and the thrill of consequence without real risk', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'Laughter and lightness when the world feels too heavy', genres: { 'Comedy': 1, 'Romance': 0.25 } },
    ],
  },
  {
    id: 'q33',
    text: 'Which quality do you find most fascinating in a villain?',
    answers: [
      { text: 'A perfectly logical worldview that most people can\'t counter', genres: { 'Thriller': 1, 'Science Fiction': 0.5 } },
      { text: 'Ancient, incomprehensible malevolence', genres: { 'Horror': 1, 'Fantasy': 0.5 } },
      { text: 'A mirror image of the hero\'s own darkest impulses', genres: { 'Literary Fiction': 1, 'Mystery': 0.5 } },
      { text: 'Sheer, charismatic unpredictability', genres: { 'Thriller': 1, 'Action': 0.5 } },
    ],
  },
  {
    id: 'q34',
    text: 'Where do you feel most like yourself?',
    answers: [
      { text: 'In the middle of a problem I\'m close to solving', genres: { 'Mystery': 1, 'Science Fiction': 0.25 } },
      { text: 'Somewhere entirely new that challenges my assumptions', genres: { 'Adventure': 1, 'Literary Fiction': 0.25 } },
      { text: 'Surrounded by people I love, with nowhere to be', genres: { 'Romance': 1, 'Comedy': 0.5, 'Literary Fiction': 0.25 } },
      { text: 'At the edge of something that frightens and compels me', genres: { 'Horror': 1, 'Thriller': 0.5, 'Fantasy': 0.25 } },
    ],
  },
  {
    id: 'q35',
    text: 'If a story\'s world were to end, what would you want it to mean?',
    answers: [
      { text: 'A profound meditation on what made civilization worthwhile', genres: { 'Literary Fiction': 1, 'Science Fiction': 0.5 } },
      { text: 'The heroic sacrifice of a few to save the many', genres: { 'Fantasy': 1, 'Action': 0.5, 'Science Fiction': 0.25 } },
      { text: 'A warning about hubris that humanity refused to hear', genres: { 'Science Fiction': 1, 'Horror': 0.5 } },
      { text: 'Even the end can\'t diminish what two people meant to each other', genres: { 'Romance': 1, 'Literary Fiction': 0.25 } },
    ],
  },
  {
    id: 'q36',
    text: 'What kind of pacing suits you best?',
    answers: [
      { text: 'Slow build that pays off in an overwhelming finale', genres: { 'Horror': 1, 'Literary Fiction': 0.5, 'Fantasy': 0.25 } },
      { text: 'Relentless forward motion that never lets you breathe', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'Episodic adventures linked by character growth', genres: { 'Adventure': 1, 'Fantasy': 0.5 } },
      { text: 'Intimate and contemplative with sudden emotional eruptions', genres: { 'Literary Fiction': 1, 'Romance': 0.5 } },
    ],
  },
  {
    id: 'q37',
    text: 'What do you believe is the hardest human emotion to capture in fiction?',
    answers: [
      { text: 'True grief — the specific, private texture of loss', genres: { 'Literary Fiction': 1, 'Horror': 0.25 } },
      { text: 'The precise moment you fall in love with someone', genres: { 'Romance': 1, 'Literary Fiction': 0.25 } },
      { text: 'The cold calm of a trained mind under lethal pressure', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'Awe — the vertiginous sense of vastness', genres: { 'Science Fiction': 1, 'Fantasy': 0.5, 'Horror': 0.25 } },
    ],
  },
  {
    id: 'q38',
    text: 'What question do you find most compelling?',
    answers: [
      { text: 'What are we capable of becoming, as a species?', genres: { 'Science Fiction': 1, 'Literary Fiction': 0.5 } },
      { text: 'What are we willing to do for the people we love?', genres: { 'Romance': 1, 'Thriller': 0.5, 'Literary Fiction': 0.25 } },
      { text: 'What lies at the heart of darkness in every human?', genres: { 'Horror': 1, 'Literary Fiction': 0.5, 'Mystery': 0.25 } },
      { text: 'What makes a life meaningful when it ends?', genres: { 'Literary Fiction': 1, 'Fantasy': 0.25, 'Adventure': 0.25 } },
    ],
  },
  {
    id: 'q39',
    text: 'If you were dropped into a story, what role would you instinctively take?',
    answers: [
      { text: 'The strategist who figures out the real problem', genres: { 'Mystery': 1, 'Thriller': 0.5 } },
      { text: 'The one who runs toward danger', genres: { 'Action': 1, 'Adventure': 0.5 } },
      { text: 'The one who holds everyone together when things fall apart', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'The outsider who sees what everyone else has missed', genres: { 'Science Fiction': 0.5, 'Literary Fiction': 0.5, 'Mystery': 0.5 } },
    ],
  },
  {
    id: 'q40',
    text: 'What do you find most interesting about space?',
    answers: [
      { text: 'The existential horror of infinite emptiness', genres: { 'Science Fiction': 1, 'Horror': 0.5 } },
      { text: 'The possibility of other minds, other forms of consciousness', genres: { 'Science Fiction': 1, 'Fantasy': 0.25 } },
      { text: 'The sheer scale makes our problems feel smaller', genres: { 'Literary Fiction': 0.5, 'Science Fiction': 0.5 } },
      { text: 'I prefer the mysteries closer to home, honestly', genres: { 'Mystery': 1, 'Horror': 0.25, 'Literary Fiction': 0.25 } },
    ],
  },
  {
    id: 'q41',
    text: 'What kind of dialogue do you find most electric?',
    answers: [
      { text: 'Two people talking around what they truly mean', genres: { 'Romance': 1, 'Literary Fiction': 0.5, 'Mystery': 0.25 } },
      { text: 'A tense standoff where words carry physical weight', genres: { 'Thriller': 1, 'Action': 0.5 } },
      { text: 'A philosophical debate that reveals character', genres: { 'Science Fiction': 1, 'Literary Fiction': 0.5 } },
      { text: 'Comedy that makes you laugh before it makes you cry', genres: { 'Comedy': 1, 'Literary Fiction': 0.25 } },
    ],
  },
  {
    id: 'q42',
    text: 'What determines whether a book stays with you for years?',
    answers: [
      { text: 'It changed how I see the world or other people', genres: { 'Literary Fiction': 1, 'Science Fiction': 0.5 } },
      { text: 'I genuinely couldn\'t figure out how it would end', genres: { 'Mystery': 1, 'Thriller': 0.5 } },
      { text: 'A character felt more real to me than some actual people', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'I wanted to live inside that world forever', genres: { 'Fantasy': 1, 'Science Fiction': 0.25 } },
    ],
  },
  {
    id: 'q43',
    text: 'What do you find most unsettling in fiction?',
    answers: [
      { text: 'The discovery that a trusted person isn\'t who they seemed', genres: { 'Thriller': 1, 'Mystery': 0.5 } },
      { text: 'The moment when the rules of reality quietly stop applying', genres: { 'Horror': 1, 'Fantasy': 0.25 } },
      { text: 'A character making the wrong choice for completely understandable reasons', genres: { 'Literary Fiction': 1, 'Mystery': 0.25 } },
      { text: 'The feeling that the universe is fundamentally indifferent', genres: { 'Science Fiction': 1, 'Horror': 0.5 } },
    ],
  },
  {
    id: 'q44',
    text: 'When you meet someone new at a party, you:',
    answers: [
      { text: 'Find the most interesting person and ask them everything', genres: { 'Mystery': 0.5, 'Science Fiction': 0.5, 'Literary Fiction': 0.5 } },
      { text: 'Tell a story that gets the whole group laughing', genres: { 'Comedy': 1, 'Adventure': 0.25 } },
      { text: 'Find a quiet corner for a real, deep conversation', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'Invent a game or dare someone into something fun', genres: { 'Adventure': 1, 'Action': 0.5, 'Comedy': 0.25 } },
    ],
  },
  {
    id: 'q45',
    text: 'What motivates your protagonists most powerfully?',
    answers: [
      { text: 'The search for truth no matter the cost', genres: { 'Mystery': 1, 'Literary Fiction': 0.25 } },
      { text: 'Love — the desperate, all-or-nothing kind', genres: { 'Romance': 1, 'Fantasy': 0.25 } },
      { text: 'Survival — keeping themselves and the people they love alive', genres: { 'Horror': 1, 'Thriller': 0.5, 'Action': 0.25 } },
      { text: 'Glory — legacy, greatness, a mark on history', genres: { 'Action': 1, 'Fantasy': 0.5, 'Adventure': 0.25 } },
    ],
  },
  {
    id: 'q46',
    text: 'How do you feel about magic or supernatural elements in fiction?',
    answers: [
      { text: 'The more rigorously defined the magic system, the better', genres: { 'Fantasy': 1, 'Science Fiction': 0.25 } },
      { text: 'Magic should remain mysterious and slightly terrifying', genres: { 'Horror': 1, 'Fantasy': 0.5 } },
      { text: 'I love when the supernatural is used as metaphor for real things', genres: { 'Literary Fiction': 1, 'Fantasy': 0.5 } },
      { text: 'Give me the real world with all its complexity', genres: { 'Literary Fiction': 1, 'Mystery': 0.5, 'Thriller': 0.25 } },
    ],
  },
  {
    id: 'q47',
    text: 'What do you believe books can do that other media cannot?',
    answers: [
      { text: 'Inhabit a consciousness with total intimacy', genres: { 'Literary Fiction': 1, 'Mystery': 0.25 } },
      { text: 'Build a world from scratch in your own imagination', genres: { 'Fantasy': 1, 'Science Fiction': 0.5 } },
      { text: 'Create suspense in silence with pure language', genres: { 'Thriller': 1, 'Horror': 0.5 } },
      { text: 'Make you understand and love someone nothing like you', genres: { 'Literary Fiction': 1, 'Romance': 0.5 } },
    ],
  },
  {
    id: 'q48',
    text: 'What do you want to feel when you close a book?',
    answers: [
      { text: 'Shattered, and then slowly rebuilt', genres: { 'Literary Fiction': 1, 'Horror': 0.25 } },
      { text: 'Breathless and ready to start the next one immediately', genres: { 'Thriller': 1, 'Action': 0.5, 'Fantasy': 0.25 } },
      { text: 'Full of warmth and the reminder that love matters', genres: { 'Romance': 1, 'Comedy': 0.5 } },
      { text: 'Like the universe just got bigger', genres: { 'Science Fiction': 1, 'Fantasy': 0.5 } },
    ],
  },
  {
    id: 'q49',
    text: 'Which setting calls to you most?',
    answers: [
      { text: 'A Victorian manor in perpetual autumn fog', genres: { 'Horror': 1, 'Mystery': 0.5, 'Literary Fiction': 0.25 } },
      { text: 'A generation ship between stars, centuries from port', genres: { 'Science Fiction': 1, 'Adventure': 0.25 } },
      { text: 'A fantasy city built into an ancient mountain range', genres: { 'Fantasy': 1, 'Adventure': 0.25 } },
      { text: 'A contemporary city that hums with unspoken tension', genres: { 'Literary Fiction': 1, 'Romance': 0.5, 'Thriller': 0.25 } },
    ],
  },
  {
    id: 'q50',
    text: 'What do you most want fiction to help you understand?',
    answers: [
      { text: 'The machinery of evil — how good people do terrible things', genres: { 'Literary Fiction': 1, 'Thriller': 0.5, 'Horror': 0.25 } },
      { text: 'The mechanics of the physical universe and our place in it', genres: { 'Science Fiction': 1, 'Literary Fiction': 0.25 } },
      { text: 'The strange miracle of being known by another person', genres: { 'Romance': 1, 'Literary Fiction': 0.5 } },
      { text: 'What I would actually do when everything is on the line', genres: { 'Thriller': 0.5, 'Action': 0.5, 'Adventure': 0.5 } },
    ],
  },
];

export const GENRES = [
  'Fantasy', 'Romance', 'Mystery', 'Thriller', 'Horror',
  'Science Fiction', 'Adventure', 'Action', 'Comedy', 'Literary Fiction'
];

export const TOTAL_QUESTIONS = 15;
