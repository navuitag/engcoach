/** EngCoach — sơ đồ tư duy lộ trình 60 ngày */
const MindmapPage = {
  phaseLabel(phase) {
    return ({ 1: "Giai đoạn 1 · Nền tảng", 2: "Giai đoạn 2 · Giao tiếp", 3: "Giai đoạn 3 · Nâng cao", 4: "Giai đoạn 4 · Luyện thi" })[phase] || `Giai đoạn ${phase}`;
  },

  buildTree() {
    const phases = new Map();
    (typeof DAY_TOPICS !== "undefined" ? DAY_TOPICS : []).forEach((item) => {
      if (!phases.has(item.phase)) {
        phases.set(item.phase, { phase: item.phase, label: this.phaseLabel(item.phase), days: [] });
      }
      phases.get(item.phase).days.push(item);
    });
    return [...phases.values()];
  },

  render() {
    const progress = Storage.getProgress?.() || {};
    const completedDays = progress.completedDays || [];
    const tree = this.buildTree();

    const branches = tree.map((phase) => {
      const done = phase.days.filter((d) => completedDays.includes(d.day)).length;
      return `
        <article class="mm-branch is-open">
          <button type="button" class="mm-branch-head" aria-expanded="true">
            <span class="mm-branch-icon">◉</span>
            <span class="mm-branch-meta">
              <strong>${Utils.escapeHTML(phase.label)}</strong>
              <small>${phase.days.length} ngày học</small>
            </span>
            <span class="mm-branch-stats">${done}/${phase.days.length}</span>
            <span class="mm-chevron">›</span>
          </button>
          <div class="mm-branch-body">
            <ul class="mm-leaves">
              ${phase.days.map((day) => {
                const status = completedDays.includes(day.day) ? "done" : "open";
                return `
                  <li class="mm-leaf mm-leaf--${status}">
                    <a href="#/plan/${day.day}" class="mm-leaf-link">
                      <span class="mm-leaf-dot"></span>
                      <span class="mm-leaf-text">Ngày ${day.day}: ${Utils.escapeHTML(day.title)}</span>
                      ${status === "done" ? '<span class="mm-badge done">✓</span>' : ""}
                    </a>
                  </li>`;
              }).join("")}
            </ul>
          </div>
        </article>`;
    }).join("");

    return `
      <section class="mm-page-head">
        <span class="tag">Mind Map</span>
        <h2>Sơ đồ tư duy English 60 Days</h2>
        <p>Tổng hợp 4 giai đoạn — bấm ngày để vào bài học.</p>
      </section>
      <div class="mm-hub card-panel">
        <div class="mm-center">
          <span class="mm-center-emoji">🗺️</span>
          <strong>EngCoach · 60 ngày</strong>
          <span>${completedDays.length}/60 ngày hoàn thành</span>
        </div>
      </div>
      <div class="mm-canvas">
        <div class="mm-spine"></div>
        <div class="mm-branches">${branches}</div>
      </div>`;
  },

  bind(app) {
    app.mainEl.querySelectorAll(".mm-branch-head").forEach((btn) => {
      btn.addEventListener("click", () => {
        const branch = btn.closest(".mm-branch");
        const open = branch.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open);
      });
    });
  }
};
