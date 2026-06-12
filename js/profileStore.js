/**
 * Nhiều người học trên cùng thiết bị — lưu tiến độ theo profile.
 */
const ProfileStore = {
  STORAGE_KEY: "engcoach_accounts",
  LEGACY_KEYS: [
    "engcoach_progress",
    "engcoach_settings",
    "engcoach_flashcards",
    "engcoach_notes",
    "engcoach_immersion",
    "engcoach_stats"
  ],
  AVATAR_COLORS: ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"],

  defaultProgress() {
    return {
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
    };
  },

  defaultSettings() {
    return {
      userName: "Học viên",
      startDate: typeof Utils !== "undefined" ? Utils.formatDate() : new Date().toISOString().slice(0, 10),
      reminderEnabled: false
    };
  },

  defaultBundle() {
    return {
      progress: this.defaultProgress(),
      settings: this.defaultSettings(),
      flashcards: {},
      notes: [],
      immersion: { checklist: {}, lastPrompt: null },
      stats: { dailyLogs: [], writingEntries: [], speakingRecordings: 0 }
    };
  },

  createProfileId() {
    return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  },

  profileColor(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i += 1) hash = (hash + id.charCodeAt(i)) % this.AVATAR_COLORS.length;
    return this.AVATAR_COLORS[hash];
  },

  loadAccounts() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const accounts = JSON.parse(raw);
        if (!accounts.data) accounts.data = {};
        if (!Array.isArray(accounts.profiles)) accounts.profiles = [];
        return accounts;
      }
    } catch {
      /* fall through */
    }
    const migrated = this.migrateLegacy();
    if (migrated) {
      this.saveAccounts(migrated);
      return migrated;
    }
    return { activeProfileId: "", profiles: [], data: {} };
  },

  migrateLegacy() {
    try {
      const rawProgress = localStorage.getItem("engcoach_progress");
      if (!rawProgress) return null;

      const bundle = this.defaultBundle();
      const progress = JSON.parse(rawProgress);
      const settings = JSON.parse(localStorage.getItem("engcoach_settings") || "null");
      const flashcards = JSON.parse(localStorage.getItem("engcoach_flashcards") || "null");
      const notes = JSON.parse(localStorage.getItem("engcoach_notes") || "null");
      const immersion = JSON.parse(localStorage.getItem("engcoach_immersion") || "null");
      const stats = JSON.parse(localStorage.getItem("engcoach_stats") || "null");

      if (progress && typeof progress === "object") bundle.progress = { ...bundle.progress, ...progress };
      if (settings && typeof settings === "object") bundle.settings = { ...bundle.settings, ...settings };
      if (flashcards && typeof flashcards === "object") bundle.flashcards = flashcards;
      if (Array.isArray(notes)) bundle.notes = notes;
      if (immersion && typeof immersion === "object") bundle.immersion = { ...bundle.immersion, ...immersion };
      if (stats && typeof stats === "object") bundle.stats = { ...bundle.stats, ...stats };

      const id = this.createProfileId();
      const name = bundle.settings.userName || "Học viên";
      this.LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));

      return {
        activeProfileId: id,
        profiles: [{
          id,
          name,
          avatarColor: this.profileColor(id),
          createdAt: new Date().toISOString().slice(0, 10)
        }],
        data: { [id]: bundle }
      };
    } catch {
      return null;
    }
  },

  saveAccounts(accounts) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(accounts));
  },

  accounts: null,

  init() {
    if (!this.accounts) this.accounts = this.loadAccounts();
    return this.accounts;
  },

  ensureReady() {
    this.init();
    if (!this.accounts.profiles.length) {
      this.createProfile("Học viên");
    }
    if (!this.accounts.activeProfileId && this.accounts.profiles.length) {
      this.accounts.activeProfileId = this.accounts.profiles[0].id;
      this.saveAccounts(this.accounts);
    }
    return this.getActiveProfile();
  },

  getActiveProfile() {
    this.init();
    return this.accounts.profiles.find((p) => p.id === this.accounts.activeProfileId) || null;
  },

  getBundle(profileId) {
    this.init();
    const id = profileId || this.accounts.activeProfileId;
    if (!id) return this.defaultBundle();
    if (!this.accounts.data[id]) this.accounts.data[id] = this.defaultBundle();
    return this.accounts.data[id];
  },

  saveBundle(bundle, profileId) {
    this.init();
    const id = profileId || this.accounts.activeProfileId;
    if (!id) return;
    this.accounts.data[id] = bundle;
    this.saveAccounts(this.accounts);
  },

  updateBundle(mutator) {
    const bundle = this.getBundle();
    mutator(bundle);
    this.saveBundle(bundle);
  },

  summarize(profileId) {
    const bundle = this.getBundle(profileId);
    const p = bundle.progress || {};
    return {
      currentDay: p.currentDay || 1,
      completedDays: (p.completedDays || []).length,
      streak: p.streak || 0,
      wordsLearned: p.wordsLearned || 0
    };
  },

  getProfiles() {
    this.init();
    return this.accounts.profiles.map((profile) => ({
      ...profile,
      summary: this.summarize(profile.id)
    }));
  },

  getState() {
    const profile = this.getActiveProfile();
    const bundle = this.getBundle();
    return {
      profileId: profile?.id || "",
      userName: profile?.name || bundle.settings?.userName || "Học viên",
      avatarColor: profile?.avatarColor || this.AVATAR_COLORS[0]
    };
  },

  hasProfiles() {
    this.init();
    return this.accounts.profiles.length > 0;
  },

  createProfile(name) {
    const trimmed = String(name || "").trim();
    if (!trimmed) return null;
    this.init();
    const id = this.createProfileId();
    const bundle = this.defaultBundle();
    bundle.settings.userName = trimmed;
    this.accounts.profiles.push({
      id,
      name: trimmed,
      avatarColor: this.profileColor(id),
      createdAt: new Date().toISOString().slice(0, 10)
    });
    this.accounts.data[id] = bundle;
    this.accounts.activeProfileId = id;
    this.saveAccounts(this.accounts);
    return id;
  },

  switchProfile(profileId) {
    this.init();
    if (!this.accounts.profiles.some((p) => p.id === profileId)) return false;
    this.accounts.activeProfileId = profileId;
    this.saveAccounts(this.accounts);
    return true;
  },

  renameProfile(profileId, name) {
    const trimmed = String(name || "").trim();
    if (!trimmed) return false;
    this.init();
    const profile = this.accounts.profiles.find((p) => p.id === profileId);
    if (!profile) return false;
    profile.name = trimmed;
    const bundle = this.getBundle(profileId);
    bundle.settings.userName = trimmed;
    this.accounts.data[profileId] = bundle;
    this.saveAccounts(this.accounts);
    return true;
  },

  deleteProfile(profileId) {
    this.init();
    if (this.accounts.profiles.length <= 1) return false;
    if (!this.accounts.profiles.some((p) => p.id === profileId)) return false;
    this.accounts.profiles = this.accounts.profiles.filter((p) => p.id !== profileId);
    delete this.accounts.data[profileId];
    if (this.accounts.activeProfileId === profileId) {
      this.accounts.activeProfileId = this.accounts.profiles[0]?.id || "";
    }
    this.saveAccounts(this.accounts);
    return true;
  },

  resetProfileData(profileId) {
    this.init();
    if (!this.accounts.profiles.some((p) => p.id === profileId)) return false;
    const profile = this.accounts.profiles.find((p) => p.id === profileId);
    const bundle = this.defaultBundle();
    bundle.settings.userName = profile.name;
    this.accounts.data[profileId] = bundle;
    this.saveAccounts(this.accounts);
    return true;
  }
};
