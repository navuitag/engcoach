const AudioManager = {
  mediaRecorder: null,
  audioChunks: [],
  stream: null,
  shadowingTimer: null,
  shadowingSeconds: 0,

  async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };
      this.mediaRecorder.start();
      return true;
    } catch (err) {
      console.error("Recording failed:", err);
      return false;
    }
  },

  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === "inactive") {
        resolve(null);
        return;
      }
      this.mediaRecorder.onstop = async () => {
        const blob = new Blob(this.audioChunks, { type: "audio/webm" });
        if (this.stream) {
          this.stream.getTracks().forEach((t) => t.stop());
        }
        resolve(blob);
      };
      this.mediaRecorder.stop();
    });
  },

  async saveRecording(blob, label) {
    const id = await Storage.saveRecording(blob, {
      label: label || `Recording ${Utils.formatDate()}`,
      day: ProgressManager.getCurrentDay()
    });
    ProgressManager.incrementStat("shadowingCount");
    const stats = Storage.getStats();
    stats.speakingRecordings = (stats.speakingRecordings || 0) + 1;
    Storage.saveStats(stats);
    return id;
  },

  playBlob(blob) {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => URL.revokeObjectURL(url);
    return audio;
  },

  startShadowingTimer(durationSec, onTick, onComplete) {
    this.stopShadowingTimer();
    this.shadowingSeconds = durationSec;
    onTick?.(this.shadowingSeconds);
    this.shadowingTimer = setInterval(() => {
      this.shadowingSeconds -= 1;
      onTick?.(this.shadowingSeconds);
      if (this.shadowingSeconds <= 0) {
        this.stopShadowingTimer();
        onComplete?.();
      }
    }, 1000);
  },

  stopShadowingTimer() {
    if (this.shadowingTimer) {
      clearInterval(this.shadowingTimer);
      this.shadowingTimer = null;
    }
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
};
