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

  getActiveProfileId() {
    return ProfileStore.getState().profileId;
  },

  getProgress() {
    return { ...ProfileStore.defaultProgress(), ...ProfileStore.getBundle().progress };
  },

  saveProgress(progress) {
    ProfileStore.updateBundle((bundle) => {
      bundle.progress = progress;
    });
  },

  getSettings() {
    const bundle = ProfileStore.getBundle();
    const profile = ProfileStore.getActiveProfile();
    return {
      ...ProfileStore.defaultSettings(),
      ...bundle.settings,
      userName: profile?.name || bundle.settings?.userName || "Học viên"
    };
  },

  saveSettings(settings) {
    ProfileStore.updateBundle((bundle) => {
      bundle.settings = settings;
    });
    const profile = ProfileStore.getActiveProfile();
    if (profile && settings.userName) {
      profile.name = settings.userName;
      ProfileStore.saveAccounts(ProfileStore.accounts);
    }
  },

  getFlashcardState() {
    return ProfileStore.getBundle().flashcards || {};
  },

  saveFlashcardState(state) {
    ProfileStore.updateBundle((bundle) => {
      bundle.flashcards = state;
    });
  },

  getNotes() {
    return ProfileStore.getBundle().notes || [];
  },

  saveNotes(notes) {
    ProfileStore.updateBundle((bundle) => {
      bundle.notes = notes;
    });
  },

  getStats() {
    return {
      dailyLogs: [],
      writingEntries: [],
      speakingRecordings: 0,
      ...ProfileStore.getBundle().stats
    };
  },

  saveStats(stats) {
    ProfileStore.updateBundle((bundle) => {
      bundle.stats = stats;
    });
  },

  getImmersionState() {
    return {
      checklist: {},
      lastPrompt: null,
      ...ProfileStore.getBundle().immersion
    };
  },

  saveImmersionState(state) {
    ProfileStore.updateBundle((bundle) => {
      bundle.immersion = state;
    });
  },

  async saveRecording(blob, metadata) {
    await this.initDB();
    const profileId = this.getActiveProfileId();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("recordings", "readwrite");
      const store = tx.objectStore("recordings");
      const record = {
        ...metadata,
        profileId,
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
    const profileId = this.getActiveProfileId();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("recordings", "readonly");
      const req = tx.objectStore("recordings").getAll();
      req.onsuccess = () => {
        const all = req.result || [];
        resolve(all.filter((r) => !r.profileId || r.profileId === profileId));
      };
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
