/** EngCoach — sơ đồ tư duy lộ trình 60 ngày + từng chủ đề */
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

  renderOverview() {
    const progress = Storage.getProgress?.() || {};
    const completedDays = progress.completedDays || [];
    const tree = this.buildTree();

    const phaseCards = tree.map((phase) => `
      <a class="mm-topic-card card-panel" href="#/mindmap/phase/${phase.phase}">
        <strong>${Utils.escapeHTML(phase.label)}</strong>
        <span>${phase.days.length} ngày</span>
        <span class="mm-topic-card-cta">Xem sơ đồ →</span>
      </a>`).join("");

    const branches = tree.map((phase) => {
      const done = phase.days.filter((d) => completedDays.includes(d.day)).length;
      return `
        <article class="mm-branch is-open">
          <a class="mm-branch-head mm-phase-link" href="#/mindmap/phase/${phase.phase}">
            <span class="mm-branch-icon">◉</span>
            <span class="mm-branch-meta">
              <strong>${Utils.escapeHTML(phase.label)}</strong>
              <small>${phase.days.length} ngày học</small>
            </span>
            <span class="mm-branch-stats">${done}/${phase.days.length}</span>
            <span class="mm-chevron">›</span>
          </a>
          <div class="mm-branch-body">
            <ul class="mm-leaves">
              ${phase.days.map((day) => {
                const status = completedDays.includes(day.day) ? "done" : "open";
                return `
                  <li class="mm-leaf mm-leaf--${status}">
                    <a href="#/plan/${day.day}" class="mm-leaf-link">
                      <span class="mm-leaf-dot"></span>
                      <span class="mm-leaf-text">Ngày ${day.day}: ${Utils.escapeHTML(day.title)}</span>
                    </a>
                    <a class="mm-mini-map-link" href="#/mindmap/topic/${encodeURIComponent(day.topic)}" title="Sơ đồ chủ đề">🧠</a>
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
        <p>Tổng hợp 4 giai đoạn — mỗi chủ đề có sơ đồ kiến thức riêng.</p>
      </section>
      <div class="mm-hub card-panel">
        <div class="mm-center">
          <span class="mm-center-emoji">🗺️</span>
          <strong>EngCoach · 60 ngày</strong>
          <span>${completedDays.length}/60 ngày hoàn thành</span>
        </div>
      </div>
      <section class="mm-topic-cards">
        <h3 class="mm-section-title">Theo giai đoạn</h3>
        <div class="mm-topic-card-grid">${phaseCards}</div>
      </section>
      <div class="mm-canvas"><div class="mm-spine"></div><div class="mm-branches">${branches}</div></div>`;
  },

  renderPhase(phaseNum) {
    const phase = this.buildTree().find((p) => p.phase === Number(phaseNum));
    if (!phase) return `<p class="empty-state">Không tìm thấy giai đoạn.</p>`;

    const spokes = phase.days.map((day) => {
      const detail = typeof TOPIC_DETAILS !== "undefined" ? TOPIC_DETAILS[day.topic] : null;
      const concepts = [];
      if (detail?.objectives) detail.objectives.forEach((o) => concepts.push({ label: o, kind: "keypoint" }));
      if (day.focus) concepts.push({ label: day.focus, kind: "desc" });
      ["vocabulary", "grammar", "listening", "speaking", "readingWriting"].forEach((key) => {
        if (detail?.[key]?.title) concepts.push({ label: detail[key].title, kind: key });
      });

      return `
        <article class="mm-skill-spoke card-panel">
          <header class="mm-spoke-head">
            <a href="#/plan/${day.day}"><strong>Ngày ${day.day}: ${Utils.escapeHTML(day.title)}</strong></a>
            <a class="mm-mini-map-link" href="#/mindmap/topic/${encodeURIComponent(day.topic)}">🧠</a>
          </header>
          <ul class="mm-concept-list">
            ${concepts.slice(0, 6).map((c) => `
              <li class="mm-concept-chip mm-concept--${c.kind}"><span class="mm-concept-dot"></span>${Utils.escapeHTML(c.label)}</li>
            `).join("")}
          </ul>
        </article>`;
    }).join("");

    return `
      <section class="mm-detail-page">
        <a class="back-link" href="#/mindmap">← Sơ đồ tổng quan</a>
        <div class="mm-topic-center card-panel">
          <span class="mm-center-emoji">📚</span>
          <div>
            <h1>${Utils.escapeHTML(phase.label)}</h1>
            <span class="tag">${phase.days.length} ngày · ${phase.days.length} chủ đề</span>
          </div>
        </div>
        <div class="mm-spoke-grid">${spokes}</div>
      </section>`;
  },

  renderTopic(topicKey) {
    const topic = decodeURIComponent(topicKey);
    const detail = typeof TOPIC_DETAILS !== "undefined" ? TOPIC_DETAILS[topic] : null;
    const day = (typeof DAY_TOPICS !== "undefined" ? DAY_TOPICS : []).find((d) => d.topic === topic);
    if (!detail && !day) return `<p class="empty-state">Không tìm thấy chủ đề.</p>`;

    const groups = [];
    if (detail?.objectives?.length) groups.push({ label: "Mục tiêu", items: detail.objectives.map((o) => ({ label: o, kind: "keypoint" })) });
    ["pronunciation", "vocabulary", "grammar", "listening", "speaking", "readingWriting"].forEach((key) => {
      const block = detail?.[key];
      if (!block) return;
      const items = [];
      if (block.title) items.push({ label: block.title, kind: key });
      if (block.description) items.push({ label: block.description, kind: "desc" });
      if (block.task) items.push({ label: block.task, kind: "task" });
      if (block.examples) block.examples.forEach((e) => items.push({ label: e, kind: "example" }));
      if (block.prompts) block.prompts.forEach((p) => items.push({ label: p, kind: "example" }));
      if (items.length) groups.push({ label: block.title || key, items });
    });

    return `
      <section class="mm-detail-page">
        <a class="back-link" href="#/mindmap">← Sơ đồ tổng quan</a>
        <div class="mm-topic-center card-panel">
          <span class="mm-center-emoji">🎯</span>
          <div>
            <h1>${Utils.escapeHTML(day?.title || topic)}</h1>
            <p>${Utils.escapeHTML(day?.focus || detail?.level || "")}</p>
            ${day ? `<a class="btn primary" href="#/plan/${day.day}">Vào ngày ${day.day}</a>` : ""}
          </div>
        </div>
        <div class="mm-skill-groups">
          ${groups.map((g) => `
            <article class="mm-skill-group card-panel">
              <h3>${Utils.escapeHTML(g.label)}</h3>
              <ul class="mm-concept-list">
                ${g.items.map((item) => `
                  <li class="mm-concept-chip mm-concept--${item.kind || "note"}">
                    <span class="mm-concept-dot"></span>${Utils.escapeHTML(item.label)}
                  </li>`).join("")}
              </ul>
            </article>`).join("")}
        </div>
      </section>`;
  },

  render(params) {
    const kind = params?.[0];
    const param = params?.[1];
    if (kind === "phase" && param) return this.renderPhase(param);
    if (kind === "topic" && param) return this.renderTopic(param);
    return this.renderOverview();
  },

  bind(app) {
    app.mainEl.querySelectorAll(".mm-branch-head.mm-phase-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (e.target.closest(".mm-mini-map-link")) return;
      });
    });
  }
};
