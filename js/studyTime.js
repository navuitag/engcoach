/**
 * Tính và ghi nhận thời gian học — EngCoach (nhiều người học).
 */
const StudyTime = {
  todayDateKey(date = new Date()) {
    return date.toISOString().slice(0, 10);
  },

  formatStudyMinutes(totalMinutes = 0) {
    const minutes = Math.max(0, Math.round(totalMinutes));
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours}g ${rest}p` : `${hours} giờ`;
  },

  normalizeProgress(progress) {
    const p = { ...progress };
    if (p.studyMinutesToday == null) p.studyMinutesToday = 0;
    if (p.studyMinutesTotal == null) p.studyMinutesTotal = p.totalStudyMinutes || 0;
    if (!p.studyLastDate) p.studyLastDate = null;
    if (!Array.isArray(p.studyDailyLog)) p.studyDailyLog = [];
    return p;
  },

  applyMinutes(progress, minutes) {
    if (!minutes || minutes <= 0) return progress;
    const next = this.normalizeProgress(progress);
    const today = this.todayDateKey();

    if (next.studyLastDate !== today) {
      next.studyMinutesToday = 0;
      next.studyLastDate = today;
    }

    next.studyMinutesToday += minutes;
    next.studyMinutesTotal += minutes;
    next.totalStudyMinutes = (next.totalStudyMinutes || 0) + minutes;

    const log = next.studyDailyLog;
    const last = log[log.length - 1];
    if (last?.date === today) last.minutes += minutes;
    else log.push({ date: today, minutes });
    next.studyDailyLog = log.slice(-60);

    return next;
  },

  getSummary(progress) {
    const p = this.normalizeProgress(progress || {});
    const today = this.todayDateKey();
    const todayMinutes = p.studyLastDate === today ? p.studyMinutesToday : 0;
    const totalMinutes = p.studyMinutesTotal || p.totalStudyMinutes || 0;
    return {
      todayMinutes,
      totalMinutes,
      todayLabel: this.formatStudyMinutes(todayMinutes),
      totalLabel: this.formatStudyMinutes(totalMinutes)
    };
  },

  recordMinutes(minutes) {
    if (!minutes || minutes <= 0) return;
    ProfileStore.updateBundle((bundle) => {
      bundle.progress = this.applyMinutes(bundle.progress, minutes);
    });
  },

  bind() {
    const intervalMs = 60000;
    let sessionStart = null;

    const isActive = () => document.visibilityState === "visible" && !document.hidden;

    const flushSession = () => {
      if (!sessionStart) return;
      const minutes = Math.floor((Date.now() - sessionStart) / intervalMs);
      sessionStart = null;
      if (minutes > 0) this.recordMinutes(minutes);
    };

    const startSession = () => {
      if (!isActive()) return;
      if (!sessionStart) sessionStart = Date.now();
    };

    const tick = () => {
      if (!isActive() || !sessionStart) return;
      const elapsedMs = Date.now() - sessionStart;
      const minutes = Math.floor(elapsedMs / intervalMs);
      if (minutes > 0) {
        this.recordMinutes(minutes);
        sessionStart = Date.now() - (elapsedMs % intervalMs);
      }
    };

    document.addEventListener("visibilitychange", () => {
      if (isActive()) startSession();
      else flushSession();
    });
    window.addEventListener("beforeunload", () => flushSession());
    window.addEventListener("pagehide", () => flushSession());
    window.addEventListener("hashchange", () => startSession());
    setInterval(tick, 15000);
    startSession();
  }
};
