const DB_NAME = "EnglishCoachDB";
const DB_VERSION = 1;

const Storage = {
  KEYS: {
    PROGRESS: "engcoach_progress",
    SETTINGS: "engcoach_settings",
    FLASHCARDS: "engcoach_flashcards",
    NOTES: "engcoach_notes",
    IMMERSION: "engcoach_immersion",
    STATS: "engcoach_stats"
  },

  db: null,

  async initDB() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("user")) {
          db.createObjectStore("user", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("progress")) {
          db.createObjectStore("progress", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
        }
        if (!db.objectStoreNames.contains("vocabulary")) {
          db.createObjectStore("vocabulary", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("recordings")) {
          db.createObjectStore("recordings", { keyPath: "id", autoIncrement: true });
        }
      };
    });
  },

  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getProgress() {
    return this.get(this.KEYS.PROGRESS, {
      currentDay: 1,
      completedDays: [],
      sessionChecks: {},
      streak: 0,
      lastStudyDate: null,
      totalStudyMinutes: 0,
      listeningHours: 0,
      wordsLearned: 0,
      shadowingCount: 0,
      quizScores: []
    });
  },

  saveProgress(progress) {
    this.set(this.KEYS.PROGRESS, progress);
  },

  getSettings() {
    return this.get(this.KEYS.SETTINGS, {
      userName: "Learner",
      startDate: Utils.formatDate(),
      reminderEnabled: false
    });
  },

  saveSettings(settings) {
    this.set(this.KEYS.SETTINGS, settings);
  },

  getFlashcardState() {
    return this.get(this.KEYS.FLASHCARDS, {});
  },

  saveFlashcardState(state) {
    this.set(this.KEYS.FLASHCARDS, state);
  },

  getNotes() {
    return this.get(this.KEYS.NOTES, []);
  },

  saveNotes(notes) {
    this.set(this.KEYS.NOTES, notes);
  },

  getStats() {
    return this.get(this.KEYS.STATS, {
      dailyLogs: [],
      writingEntries: [],
      speakingRecordings: 0
    });
  },

  saveStats(stats) {
    this.set(this.KEYS.STATS, stats);
  },

  getImmersionState() {
    return this.get(this.KEYS.IMMERSION, {
      checklist: {},
      lastPrompt: null
    });
  },

  saveImmersionState(state) {
    this.set(this.KEYS.IMMERSION, state);
  },

  async saveRecording(blob, metadata) {
    await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("recordings", "readwrite");
      const store = tx.objectStore("recordings");
      const record = {
        ...metadata,
        blob,
        createdAt: new Date().toISOString()
      };
      const req = store.add(record);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async getRecordings() {
    await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("recordings", "readonly");
      const req = tx.objectStore("recordings").getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  },

  async deleteRecording(id) {
    await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("recordings", "readwrite");
      const req = tx.objectStore("recordings").delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  isSessionComplete(day, sessionId) {
    const progress = this.getProgress();
    const key = `${day}-${sessionId}`;
    return !!progress.sessionChecks[key];
  },

  toggleSessionCheck(day, sessionId) {
    const progress = this.getProgress();
    const key = `${day}-${sessionId}`;
    progress.sessionChecks[key] = !progress.sessionChecks[key];
    this.saveProgress(progress);
    return progress.sessionChecks[key];
  },

  markDayComplete(day) {
    const progress = this.getProgress();
    if (!progress.completedDays.includes(day)) {
      progress.completedDays.push(day);
      progress.completedDays.sort((a, b) => a - b);
    }
    this.updateStreak();
    this.saveProgress(progress);
    return progress;
  },

  updateStreak() {
    const progress = this.getProgress();
    const today = Utils.formatDate();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = Utils.formatDate(yesterday);

    if (progress.lastStudyDate === today) return progress;

    if (progress.lastStudyDate === yesterdayStr) {
      progress.streak += 1;
    } else if (progress.lastStudyDate !== today) {
      progress.streak = progress.lastStudyDate ? 1 : 1;
    }

    progress.lastStudyDate = today;
    this.saveProgress(progress);
    return progress;
  }
};
