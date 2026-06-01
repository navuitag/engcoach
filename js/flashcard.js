const SRS_INTERVALS = [1, 3, 7, 14, 30];

const FlashcardManager = {
  initCards() {
    const state = Storage.getFlashcardState();
    let changed = false;
    VOCABULARY_DATA.cards.forEach((card) => {
      if (!state[card.id]) {
        state[card.id] = {
          id: card.id,
          level: 0,
          nextReview: Utils.formatDate(),
          correct: 0,
          incorrect: 0
        };
        changed = true;
      }
    });
    if (changed) Storage.saveFlashcardState(state);
    return state;
  },

  getCard(cardId) {
    return VOCABULARY_DATA.cards.find((c) => c.id === cardId);
  },

  getDueCards() {
    const state = this.initCards();
    const today = Utils.formatDate();
    return VOCABULARY_DATA.cards.filter((card) => {
      const s = state[card.id];
      return s && s.nextReview <= today;
    });
  },

  getReviewQueue() {
    return this.getDueCards().map((card) => ({
      ...card,
      state: Storage.getFlashcardState()[card.id]
    }));
  },

  rateCard(cardId, quality) {
    const state = Storage.getFlashcardState();
    const cardState = state[cardId];
    if (!cardState) return;

    if (quality >= 3) {
      cardState.correct += 1;
      cardState.level = Math.min(cardState.level + 1, SRS_INTERVALS.length - 1);
    } else {
      cardState.incorrect += 1;
      cardState.level = 0;
    }

    const days = SRS_INTERVALS[cardState.level] || 1;
    const next = new Date();
    next.setDate(next.getDate() + days);
    cardState.nextReview = Utils.formatDate(next);

    Storage.saveFlashcardState(state);

    if (quality >= 3) {
      ProgressManager.incrementStat("wordsLearned");
    }
  },

  searchCards(query) {
    const q = query.toLowerCase().trim();
    if (!q) return VOCABULARY_DATA.cards;
    return VOCABULARY_DATA.cards.filter(
      (c) =>
        c.word.toLowerCase().includes(q) ||
        c.meaning.toLowerCase().includes(q) ||
        c.topic.toLowerCase().includes(q)
    );
  },

  getCardsByTopic(topic) {
    return VOCABULARY_DATA.cards.filter((c) => c.topic === topic);
  },

  getCardsByPhase(phase) {
    return VOCABULARY_DATA.cards.filter((c) => c.phase === phase);
  },

  addCardsFromLesson(lesson) {
    if (!lesson?.sessions) return;
    const state = Storage.getFlashcardState();
    let added = 0;

    lesson.sessions.forEach((session) => {
      if (!session.vocab) return;
      session.vocab.forEach((word, i) => {
        const id = `lesson-${lesson.day}-${i}`;
        if (!state[id]) {
          state[id] = {
            id,
            level: 0,
            nextReview: Utils.formatDate(),
            correct: 0,
            incorrect: 0,
            word,
            fromLesson: lesson.day
          };
          added++;
        }
      });
    });

    if (added) Storage.saveFlashcardState(state);
    return added;
  },

  generateQuiz(count = 5) {
    const cards = [...VOCABULARY_DATA.cards].sort(() => Math.random() - 0.5).slice(0, count);
    return cards.map((card) => {
      const wrong = VOCABULARY_DATA.cards
        .filter((c) => c.id !== card.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((c) => c.meaning);
      const options = [...wrong, card.meaning].sort(() => Math.random() - 0.5);
      return { card, options, correct: card.meaning };
    });
  }
};
