const Utils = {
  escapeHTML(str) {
    if (str == null) return "";
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  },

  formatDate(date = new Date()) {
    return date.toISOString().split("T")[0];
  },

  getYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  },

  getYouTubeEmbed(url) {
    const id = this.getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  },

  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  percent(part, total) {
    if (!total) return 0;
    return Math.round((part / total) * 100);
  },

  pluralize(count, singular, plural) {
    return count === 1 ? singular : (plural || singular + "s");
  },

  timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Hôm nay";
    if (diff === 1) return "Hôm qua";
    return `${diff} ngày trước`;
  }
};
