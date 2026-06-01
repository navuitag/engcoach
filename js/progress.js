const ProgressManager = {
  getLesson(day) {
    return english60Data.lessons.find((l) => l.day === day);
  },

  getCurrentDay() {
    return Storage.getProgress().currentDay || 1;
  },

  setCurrentDay(day) {
    const progress = Storage.getProgress();
    progress.currentDay = Utils.clamp(day, 1, english60Data.totalDays);
    Storage.saveProgress(progress);
    return progress.currentDay;
  },

  getCompletionPercent() {
    const progress = Storage.getProgress();
    return Utils.percent(progress.completedDays.length, english60Data.totalDays);
  },

  getDayProgress(day) {
    const lesson = this.getLesson(day);
    if (!lesson || !lesson.sessions?.length) return 0;
    const progress = Storage.getProgress();
    const completed = lesson.sessions.filter((s) =>
      progress.sessionChecks[`${day}-${s.id}`]
    ).length;
    return Utils.percent(completed, lesson.sessions.length);
  },

  isDayComplete(day) {
    return Storage.getProgress().completedDays.includes(day);
  },

  getPhaseProgress(phaseId) {
    const phaseDays = english60Data.lessons.filter((l) => l.phase === phaseId);
    const progress = Storage.getProgress();
    const completed = phaseDays.filter((l) => progress.completedDays.includes(l.day)).length;
    return { completed, total: phaseDays.length, percent: Utils.percent(completed, phaseDays.length) };
  },

  getTodayTasks() {
    const day = this.getCurrentDay();
    const lesson = this.getLesson(day);
    if (!lesson) return [];
    return lesson.sessions.map((s) => ({
      id: s.id,
      title: s.title,
      skill: s.skill,
      done: Storage.isSessionComplete(day, s.id)
    }));
  },

  getStatsSummary() {
    const progress = Storage.getProgress();
    const stats = Storage.getStats();
    return {
      streak: progress.streak,
      completedDays: progress.completedDays.length,
      totalDays: english60Data.totalDays,
      percent: this.getCompletionPercent(),
      listeningHours: progress.listeningHours || 0,
      wordsLearned: progress.wordsLearned || Object.keys(Storage.getFlashcardState()).length,
      shadowingCount: progress.shadowingCount || 0,
      notesCount: Storage.getNotes().length,
      writingCount: stats.writingEntries?.length || 0,
      currentDay: progress.currentDay,
      lastStudyDate: progress.lastStudyDate
    };
  },

  addQuickNote(text, day) {
    const notes = Storage.getNotes();
    notes.unshift({
      id: Date.now(),
      text,
      day: day || this.getCurrentDay(),
      date: Utils.formatDate(),
      createdAt: new Date().toISOString()
    });
    Storage.saveNotes(notes.slice(0, 100));
    Storage.updateStreak();
  },

  addWritingEntry(text) {
    const stats = Storage.getStats();
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    stats.writingEntries = stats.writingEntries || [];
    stats.writingEntries.unshift({
      id: Date.now(),
      text,
      wordCount: words,
      sentenceCount: sentences,
      date: Utils.formatDate()
    });
    Storage.saveStats(stats);
    Storage.updateStreak();
    return { words, sentences };
  },

  logStudySession(minutes = 90) {
    const progress = Storage.getProgress();
    progress.totalStudyMinutes = (progress.totalStudyMinutes || 0) + minutes;
    Storage.saveProgress(progress);
    Storage.updateStreak();
  },

  incrementStat(field, amount = 1) {
    const progress = Storage.getProgress();
    progress[field] = (progress[field] || 0) + amount;
    Storage.saveProgress(progress);
  },

  getChartData() {
    const progress = Storage.getProgress();
    const weeks = [];
    for (let w = 0; w < 9; w++) {
      const start = w * 7 + 1;
      const end = Math.min(start + 6, 60);
      const daysInWeek = english60Data.lessons.filter(
        (l) => l.day >= start && l.day <= end
      );
      const completed = daysInWeek.filter((l) =>
        progress.completedDays.includes(l.day)
      ).length;
      weeks.push({
        label: `Tuần ${w + 1}`,
        completed,
        total: daysInWeek.length
      });
    }
    return weeks;
  }
};
