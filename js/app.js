const App = {
  mainEl: null,
  headerEl: null,
  flashcardFlipped: false,
  currentQuiz: null,
  quizIndex: 0,
  quizScore: 0,

  init() {
    this.mainEl = document.getElementById("main-content");
    this.headerEl = document.getElementById("app-header");
    ProfileStore.ensureReady();
    StudyTime.bind();
    Storage.initDB();
    FlashcardManager.initCards();

    Router.register("dashboard", () => this.renderDashboard());
    Router.register("today", () => this.renderToday());
    Router.register("plan", (p) => this.renderToday(p));
    Router.register("library", () => this.renderLibrary());
    Router.register("progress", () => this.renderProgress());
    Router.register("immersion", () => this.renderImmersion());
    Router.register("vocabulary", () => this.renderVocabulary());
    Router.register("grammar", () => this.renderGrammar());
    Router.register("listening", () => this.renderSkillPage("Listening"));
    Router.register("reading", () => this.renderSkillPage("Reading"));
    Router.register("speaking", () => this.renderSpeaking());
    Router.register("writing", () => this.renderWriting());
    Router.register("review", () => this.renderReview());
    Router.register("mindmap", (p) => this.renderMindmap(p));
    Router.register("profile", () => this.renderProfile());

    document.querySelectorAll("[data-nav]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go(el.getAttribute("data-nav"));
      });
    });

    window.addEventListener("scroll", () => {
      this.headerEl?.classList.toggle("header-scrolled", window.scrollY > 8);
    }, { passive: true });

    Router.init();
    this.refreshLearnerSwitcher();
    this.registerServiceWorker();
  },

  refreshLearnerSwitcher() {
    const el = document.getElementById("header-switcher");
    if (!el) return;
    el.innerHTML = LearnerUI.renderSwitcher();
    LearnerUI.bindSwitcher({
      onSwitch: (profileId) => {
        ProfileStore.switchProfile(profileId);
        this.refreshCurrentRoute();
      },
      onAdd: () => Router.go("profile")
    });
  },

  refreshCurrentRoute() {
    const { path, params } = Router.getRoute();
    const handler = Router.routes[path] || Router.routes.dashboard;
    if (handler) handler(params);
    this.refreshLearnerSwitcher();
  },

  setHeader(title, subtitle) {
    const headerText = this.headerEl.querySelector(".header-text") || this.headerEl;
    headerText.innerHTML = `
      <h1>${Utils.escapeHTML(title)}</h1>
      ${subtitle ? `<p>${Utils.escapeHTML(subtitle)}</p>` : ""}
    `;
  },

  page(html) {
    return `<div class="page">${html}</div>`;
  },

  renderMindmap(params = []) {
    this.setHeader("Sơ đồ tư duy", "Tổng hợp lộ trình 60 ngày");
    this.render(MindmapPage.render(params));
    MindmapPage.bind(this);
  },

  render(html) {
    this.mainEl.innerHTML = this.page(html);
    this.bindEvents();
  },

  bindEvents() {
    this.mainEl.querySelectorAll("[data-action]").forEach((el) => {
      const action = el.getAttribute("data-action");
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleAction(action, el);
      });
    });

    this.mainEl.querySelectorAll("[data-check]").forEach((el) => {
      el.addEventListener("change", () => {
        const [day, sessionId] = el.getAttribute("data-check").split("|");
        Storage.toggleSessionCheck(Number(day), sessionId);
        el.closest(".session-item")?.classList.toggle("done", el.checked);
      });
    });

    this.mainEl.querySelectorAll(".day-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const day = Number(btn.dataset.day);
        ProgressManager.setCurrentDay(day);
        Router.go("today");
      });
    });
  },

  handleAction(action, el) {
    const handlers = {
      "start-today": () => Router.go("today"),
      "complete-day": () => {
        const day = ProgressManager.getCurrentDay();
        ProgressManager.markDayComplete(day);
        if (day < 60) ProgressManager.setCurrentDay(day + 1);
        FlashcardManager.addCardsFromLesson(ProgressManager.getLesson(day));
        ProgressManager.logStudySession(90);
        alert(`Chúc mừng! Bạn đã hoàn thành Ngày ${day}!`);
        Router.go("dashboard");
      },
      "flip-card": () => this.flipFlashcard(),
      "rate-hard": () => this.rateFlashcard(1),
      "rate-good": () => this.rateFlashcard(4),
      "rate-easy": () => this.rateFlashcard(5),
      "start-quiz": () => this.startQuiz(),
      "add-note": () => this.addNote(),
      "save-journal": () => this.saveJournal(),
      "start-recording": () => this.toggleRecording(el),
      "start-shadowing": () => this.startShadowingTimer(),
      "stop-shadowing": () => AudioManager.stopShadowingTimer(),
      "random-prompt": () => this.showRandomPrompt(),
      "import-vocab": () => {
        const day = ProgressManager.getCurrentDay();
        const n = FlashcardManager.addCardsFromLesson(ProgressManager.getLesson(day));
        alert(`Đã thêm ${n} từ từ bài học ngày ${day}`);
        Router.go("vocabulary");
      }
    };
    if (handlers[action]) handlers[action]();
  },

  skillBadge(skill) {
    const cls = skill.toLowerCase().replace(/\s*\+\s*/g, "-").replace(/\s+/g, "-");
    return `<span class="badge skill-${cls}">${Utils.escapeHTML(skill)}</span>`;
  },

  renderSession(session, day) {
    const checked = Storage.isSessionComplete(day, session.id) ? "checked" : "";
    const doneClass = checked ? "done" : "";
    let resources = "";
    if (session.resources?.length) {
      resources = session.resources
        .map((r) => {
          const embed = r.type === "youtube" ? Utils.getYouTubeEmbed(r.url) : null;
          if (embed && r.embed !== false) {
            return `<div class="embed-container"><iframe src="${embed}" title="${Utils.escapeHTML(r.title)}" allowfullscreen loading="lazy"></iframe></div>`;
          }
          return `<a class="resource-link" href="${Utils.escapeHTML(r.url)}" target="_blank" rel="noopener">${Utils.escapeHTML(r.title)} →</a>`;
        })
        .join("");
    }
    let vocab = "";
    if (session.vocab?.length) {
      vocab = `<div class="vocab-tags">${session.vocab.map((v) => `<span class="vocab-tag">${Utils.escapeHTML(v)}</span>`).join("")}</div>`;
    }
    let grammar = "";
    if (session.grammar?.length) {
      grammar = `<p class="text-muted"><strong>Grammar:</strong> ${session.grammar.map((g) => Utils.escapeHTML(g)).join(", ")}</p>`;
    }
    let examples = "";
    if (session.examples?.length) {
      examples = `<div class="example-list"><strong>Ví dụ</strong><ul>${session.examples.map((e) => `<li>${Utils.escapeHTML(e)}</li>`).join("")}</ul></div>`;
    }
    let prompts = "";
    if (session.prompts?.length) {
      prompts = `<div class="prompt-box"><strong>Gợi ý nói</strong><ul>${session.prompts.map((p) => `<li>${Utils.escapeHTML(p)}</li>`).join("")}</ul></div>`;
    }
    let reviewTopics = "";
    if (session.reviewTopics?.length) {
      reviewTopics = `<p class="text-muted"><strong>Ôn:</strong> ${session.reviewTopics.slice(0, 6).map((t) => Utils.escapeHTML(t)).join(" · ")}${session.reviewTopics.length > 6 ? "..." : ""}</p>`;
    }

    return `
      <div class="session-item ${doneClass}">
        <label class="session-check">
          <input type="checkbox" data-check="${day}|${session.id}" ${checked} aria-label="Hoàn thành ${Utils.escapeHTML(session.title)}">
          <div class="session-body">
            <div class="session-meta">
              ${this.skillBadge(session.skill)}
              <span class="session-time">${Utils.escapeHTML(session.time)}</span>
            </div>
            <h4 class="session-title">${Utils.escapeHTML(session.title)}</h4>
            ${session.description ? `<p class="session-desc">${Utils.escapeHTML(session.description)}</p>` : ""}
            ${resources}
            ${vocab}
            ${grammar}
            ${examples}
            ${prompts}
            ${reviewTopics}
            ${session.task ? `<p class="session-task"><strong>Nhiệm vụ:</strong> ${Utils.escapeHTML(session.task)}</p>` : ""}
          </div>
        </label>
      </div>
    `;
  },

  renderDashboard() {
    const stats = ProgressManager.getStatsSummary();
    const study = StudyTime.getSummary(Storage.getProgress());
    const userName = ProfileStore.getState().userName;
    const lesson = ProgressManager.getLesson(stats.currentDay);
    const dayProgress = ProgressManager.getDayProgress(stats.currentDay);
    const tasks = ProgressManager.getTodayTasks();

    const phasesHtml = english60Data.phases
      .map((ph) => {
        const pp = ProgressManager.getPhaseProgress(ph.id);
        return `
          <div class="phase-card">
            <strong>${Utils.escapeHTML(ph.name)}</strong>
            <p>Ngày ${ph.days}</p>
            <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pp.percent}%"></div></div>
            <span class="phase-stat">${pp.completed} / ${pp.total} ngày hoàn thành</span>
          </div>
        `;
      })
      .join("");

    const tasksHtml = tasks
      .slice(0, 4)
      .map(
        (t) =>
          `<li><span class="task-check ${t.done ? "done" : "pending"}" aria-hidden="true">${t.done ? "✓" : ""}</span><span>${Utils.escapeHTML(t.title)}</span></li>`
      )
      .join("");

    const lessonTitle = lesson ? lesson.title.replace(/^Ngày \d+: /, "") : "";

    this.setHeader(`Xin chào, ${userName}!`, "English 60 Days Coach · 60 ngày");
    this.render(`
      <div class="card card-hero">
        <div class="card-title">Tiến độ chương trình</div>
        <p class="hero-day">Ngày ${stats.currentDay} <span style="font-size:0.5em;opacity:0.7">/ 60</span></p>
        <p class="hero-meta">${lesson ? Utils.escapeHTML(lesson.focus) : "Bắt đầu hành trình học của bạn"}</p>
        <div class="hero-progress-label">
          <span>Hoàn thành tổng thể</span>
          <span>${stats.percent}%</span>
        </div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${stats.percent}%"></div></div>
        <button class="btn btn-primary btn-block btn-cta" data-action="start-today">Bắt đầu buổi học hôm nay</button>
      </div>

      <div class="stat-grid">
        <div class="stat-box stat-accent"><div class="value">${study.todayLabel}</div><div class="label">Học hôm nay</div></div>
        <div class="stat-box"><div class="value">${stats.streak}</div><div class="label">Streak</div></div>
        <div class="stat-box"><div class="value">${stats.completedDays}</div><div class="label">Ngày xong</div></div>
        <div class="stat-box"><div class="value">${study.totalLabel}</div><div class="label">Tổng giờ học</div></div>
      </div>

      <div class="card">
        <div class="card-title">Nhiệm vụ · ${Utils.escapeHTML(lessonTitle)}</div>
        <ul class="task-list">${tasksHtml || "<li><span>Không có nhiệm vụ</span></li>"}</ul>
      </div>

      <div class="card">
        <div class="card-title">Kỹ năng</div>
        <div class="skill-pills">
          <div class="skill-pill"><button type="button" class="btn btn-secondary btn-sm" onclick="Router.go('vocabulary')">Từ vựng</button></div>
          <div class="skill-pill"><button type="button" class="btn btn-secondary btn-sm" onclick="Router.go('grammar')">Ngữ pháp</button></div>
          <div class="skill-pill"><button type="button" class="btn btn-secondary btn-sm" onclick="Router.go('listening')">Nghe</button></div>
          <div class="skill-pill"><button type="button" class="btn btn-secondary btn-sm" onclick="Router.go('speaking')">Nói</button></div>
          <div class="skill-pill"><button type="button" class="btn btn-secondary btn-sm" onclick="Router.go('writing')">Viết</button></div>
          <div class="skill-pill"><button type="button" class="btn btn-secondary btn-sm" onclick="Router.go('review')">Ôn tập</button></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Theo giai đoạn</div>
        ${phasesHtml}
      </div>
    `);
  },

  renderToday() {
    const day = ProgressManager.getCurrentDay();
    const lesson = ProgressManager.getLesson(day);
    if (!lesson) {
      this.setHeader("Không tìm thấy bài học", "");
      this.render(`<div class="empty-state">Không có dữ liệu cho ngày ${day}</div>`);
      return;
    }

    const dayProgress = ProgressManager.getDayProgress(day);
    const sessionsHtml = (lesson.sessions || []).map((s) => this.renderSession(s, day)).join("");
    const immersionHtml = (lesson.immersion || [])
      .map((item) => `<li>${Utils.escapeHTML(item)}</li>`)
      .join("");

    const dayPicker = Array.from({ length: 60 }, (_, i) => {
      const d = i + 1;
      const cls = [d === day ? "active" : "", ProgressManager.isDayComplete(d) ? "complete" : ""]
        .filter(Boolean)
        .join(" ");
      return `<button class="day-btn ${cls}" data-day="${d}">${d}</button>`;
    }).join("");

    const levelBadge = lesson.level ? `<span class="badge badge-level">${Utils.escapeHTML(lesson.level)}</span>` : "";
    const objectivesHtml = (lesson.objectives || [])
      .map((o) => `<li>${Utils.escapeHTML(o)}</li>`)
      .join("");
    const reviewRange =
      lesson.reviewFromDays && lesson.reviewToDays
        ? `<div class="review-banner">Ôn tập ngày ${lesson.reviewFromDays} – ${lesson.reviewToDays}</div>`
        : "";

    this.setHeader(lesson.title, `Giai đoạn ${lesson.phase} · ${lesson.focus} · 90 phút`);
    this.render(`
      <div class="card">
        <div class="meta-row">
          <span class="text-muted">Tiến độ ngày <strong>${dayProgress}%</strong></span>
          ${levelBadge}
          <span class="badge">${lesson.dailyVocabCount || 12} từ mới</span>
        </div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${dayProgress}%"></div></div>
        ${reviewRange}
        ${objectivesHtml ? `<div class="card-title" style="margin-top:1rem">Mục tiêu hôm nay</div><ul class="objectives-list">${objectivesHtml}</ul>` : ""}
        ${lesson.dailyTip ? `<div class="tip-box"><strong>Mẹo học:</strong> ${Utils.escapeHTML(lesson.dailyTip)}</div>` : ""}
      </div>

      <div class="card">
        <div class="card-title">Lịch 90 phút</div>
        <div class="session-list">${sessionsHtml || "<p class='empty-state'>Chưa có phiên học</p>"}</div>
        <div class="action-stack">
          <button class="btn btn-primary btn-block" data-action="complete-day">Hoàn thành ngày ${day}</button>
          <button class="btn btn-secondary btn-block" data-action="import-vocab">Thêm từ vào flashcard</button>
        </div>
      </div>

      ${immersionHtml ? `<div class="card"><div class="card-title">Immersion hôm nay</div><ul class="immersion-list">${immersionHtml}</ul></div>` : ""}

      <div class="card">
        <div class="card-title">Chọn ngày học</div>
        <div class="day-picker">${dayPicker}</div>
      </div>
    `);
  },

  renderLibrary() {
    const searchVal = this._librarySearch || "";
    const filtered = searchVal
      ? RESOURCES.filter(
          (r) =>
            r.title.toLowerCase().includes(searchVal.toLowerCase()) ||
            r.skill.toLowerCase().includes(searchVal.toLowerCase()) ||
            r.topic.toLowerCase().includes(searchVal.toLowerCase())
        )
      : RESOURCES;

    const skills = [...new Set(RESOURCES.map((r) => r.skill))];
    const bySkill = skills
      .map((skill) => {
        const items = filtered.filter((r) => r.skill === skill);
        if (!items.length) return "";
        return `
          <div class="card">
            <div class="card-title">${Utils.escapeHTML(skill)}</div>
            <div class="resource-grid">
              ${items
                .map(
                  (r) => `
                <div class="resource-card">
                  <h4>${Utils.escapeHTML(r.title)}</h4>
                  <span class="badge">${Utils.escapeHTML(r.topic)}</span>
                  <span class="badge">${Utils.escapeHTML(r.level || "A1")}</span>
                  <div style="margin-top:0.5rem">
                    <a class="resource-link" href="${Utils.escapeHTML(r.url)}" target="_blank" rel="noopener">Mở tài liệu →</a>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    this.setHeader("Thư viện tài liệu", "Tài nguyên curated cho 60 ngày học");
    this.render(`
      <input type="search" class="search-input" id="lib-search" placeholder="Tìm theo chủ đề: Family, Food, Travel..." value="${Utils.escapeHTML(searchVal)}">
      ${bySkill || '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Không tìm thấy tài liệu</p></div>'}
    `);

    const searchEl = document.getElementById("lib-search");
    if (searchEl) {
      searchEl.addEventListener(
        "input",
        Utils.debounce((e) => {
          this._librarySearch = e.target.value;
          this.renderLibrary();
        }, 250)
      );
    }
  },

  renderProfile() {
    const profiles = ProfileStore.getProfiles();
    this.setHeader("Người học", "Quản lý hồ sơ trên thiết bị này");
    this.render(`
      <div class="card">
        <div class="card-title">Nhiều người học</div>
        <p class="profile-page-intro">Mỗi người có tiến độ, flashcard và ghi chú riêng. Chuyển hồ sơ ở góc trên hoặc bên dưới.</p>
        <div class="learner-list">${LearnerUI.renderLearnerList(profiles)}</div>
        ${LearnerUI.renderAddLearnerForm()}
      </div>
    `);
    this.bindProfilePage();
  },

  bindProfilePage() {
    this.mainEl.querySelectorAll("[data-switch-profile]").forEach((button) => {
      button.addEventListener("click", () => {
        ProfileStore.switchProfile(button.dataset.switchProfile);
        this.refreshCurrentRoute();
      });
    });

    this.mainEl.querySelectorAll("[data-rename-profile]").forEach((button) => {
      button.addEventListener("click", () => {
        const profile = ProfileStore.getProfiles().find((item) => item.id === button.dataset.renameProfile);
        if (!profile) return;
        const nextName = window.prompt("Tên mới:", profile.name);
        if (!nextName?.trim()) return;
        ProfileStore.renameProfile(profile.id, nextName.trim());
        this.refreshCurrentRoute();
      });
    });

    this.mainEl.querySelectorAll("[data-reset-profile]").forEach((button) => {
      button.addEventListener("click", () => {
        const profile = ProfileStore.getProfiles().find((item) => item.id === button.dataset.resetProfile);
        if (!profile) return;
        if (!window.confirm(`Xóa toàn bộ tiến độ của "${profile.name}"?`)) return;
        ProfileStore.resetProfileData(profile.id);
        this.refreshCurrentRoute();
      });
    });

    this.mainEl.querySelectorAll("[data-delete-profile]").forEach((button) => {
      button.addEventListener("click", () => {
        const profile = ProfileStore.getProfiles().find((item) => item.id === button.dataset.deleteProfile);
        if (!profile) return;
        if (!window.confirm(`Xóa hồ sơ "${profile.name}" và toàn bộ tiến độ?`)) return;
        ProfileStore.deleteProfile(profile.id);
        this.refreshCurrentRoute();
      });
    });

    const form = document.getElementById("addLearnerForm");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = new FormData(form).get("name");
      if (!name || !String(name).trim()) return;
      ProfileStore.createProfile(String(name).trim());
      this.refreshCurrentRoute();
    });
  },

  renderProgress() {
    const stats = ProgressManager.getStatsSummary();
    const study = StudyTime.getSummary(Storage.getProgress());
    const notes = Storage.getNotes().slice(0, 10);
    const chartData = ProgressManager.getChartData();

    const notesHtml = notes.length
      ? notes
          .map(
            (n) => `
          <div class="note-item">
            <strong>Ngày ${n.day}</strong> · ${Utils.escapeHTML(n.date)}
            <p class="text-muted">${Utils.escapeHTML(n.text)}</p>
          </div>
        `
          )
          .join("")
      : '<p class="empty-state">Chưa có ghi chú</p>';

    this.setHeader("Theo dõi tiến độ", "Thống kê và nhật ký học tập");
    this.render(`
      <div class="stat-grid">
        <div class="stat-box"><div class="value">${study.todayLabel}</div><div class="label">Học hôm nay</div></div>
        <div class="stat-box"><div class="value">${stats.percent}%</div><div class="label">Hoàn thành</div></div>
        <div class="stat-box"><div class="value">${study.totalLabel}</div><div class="label">Tổng giờ học</div></div>
        <div class="stat-box"><div class="value">${stats.shadowingCount}</div><div class="label">Shadowing</div></div>
        <div class="stat-box"><div class="value">${stats.writingCount}</div><div class="label">Bài viết</div></div>
      </div>

      <div class="card">
        <div class="card-title">Tiến độ theo tuần</div>
        <div class="chart-container"><canvas id="progress-chart"></canvas></div>
      </div>

      <div class="card">
        <div class="card-title">Ghi chú nhanh</div>
        <textarea id="quick-note" placeholder="Ghi chú buổi học hôm nay..."></textarea>
        <button class="btn btn-primary btn-block" data-action="add-note" style="margin-top:0.75rem">Lưu ghi chú</button>
        <div style="margin-top:1.25rem">${notesHtml}</div>
      </div>
    `);

    this.renderChart(chartData);
  },

  renderChart(data) {
    const canvas = document.getElementById("progress-chart");
    if (!canvas || typeof Chart === "undefined") return;
    if (this._chart) this._chart.destroy();
    this._chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            label: "Hoàn thành",
            data: data.map((d) => d.completed),
            backgroundColor: "#4f46e5",
            borderRadius: 6
          },
          {
            label: "Tổng ngày",
            data: data.map((d) => d.total),
            backgroundColor: "#e2e8f0",
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        scales: { y: { beginAtZero: true, max: 7 } }
      }
    });
  },

  renderImmersion() {
    const state = Storage.getImmersionState();
    const checklistHtml = IMMERSION_CHECKLIST.map((item) => {
      const checked = state.checklist[item.id] ? "checked" : "";
      return `
        <label class="checklist-item">
          <input type="checkbox" data-immersion="${item.id}" ${checked}>
          <span>${Utils.escapeHTML(item.text)} <span class="badge">${item.category}</span></span>
        </label>
      `;
    }).join("");

    this.setHeader("Immersion", "Hòa nhập tiếng Anh hàng ngày");
    this.render(`
      <div class="card">
        <div class="card-title">Self-talk Prompt</div>
        <p id="prompt-text" class="prompt-card">Nhấn nút để nhận câu gợi ý ngẫu nhiên</p>
        <button class="btn btn-primary btn-block" data-action="random-prompt">Random Prompt</button>
      </div>

      <div class="card">
        <div class="card-title">Daily Checklist</div>
        ${checklistHtml}
      </div>

      <div class="card timer-card">
        <div class="card-title">Shadowing Timer</div>
        <div class="timer-display" id="timer-display">5:00</div>
        <div style="display:flex;gap:0.625rem;margin-top:0.5rem">
          <button class="btn btn-primary" data-action="start-shadowing" style="flex:1">Bắt đầu 5 phút</button>
          <button class="btn btn-outline" data-action="stop-shadowing" style="flex:1">Dừng</button>
        </div>
      </div>
    `);

    this.mainEl.querySelectorAll("[data-immersion]").forEach((el) => {
      el.addEventListener("change", () => {
        const state = Storage.getImmersionState();
        state.checklist[el.getAttribute("data-immersion")] = el.checked;
        Storage.saveImmersionState(state);
      });
    });
  },

  renderVocabulary() {
    const due = FlashcardManager.getReviewQueue();
    const card = due[0] || VOCABULARY_DATA.cards[0];
    const state = card ? Storage.getFlashcardState()[card.id] : null;

    this.setHeader("Từ vựng & SRS", `${due.length} thẻ cần ôn hôm nay`);
    this.render(`
      <div class="card">
        <div class="card-title">Flashcard · ${due.length} thẻ cần ôn</div>
        <div class="flashcard-container">
          <div class="flashcard" id="flashcard" data-action="flip-card">
            <div class="word" id="fc-word">${Utils.escapeHTML(card?.word || "")}</div>
            <div class="meaning" id="fc-meaning" style="display:none">${Utils.escapeHTML(card?.meaning || "")}</div>
            <div class="example" id="fc-example" style="display:none">${Utils.escapeHTML(card?.example || "")}</div>
            <p class="flashcard-hint">Nhấn để lật thẻ</p>
          </div>
        </div>
        ${state ? `<p class="text-muted" style="text-align:center;margin:0.75rem 0 0">SRS Level ${state.level} · Đúng ${state.correct} · Sai ${state.incorrect}</p>` : ""}
        <div class="flashcard-actions">
          <button class="rating-btn hard" data-action="rate-hard">Khó</button>
          <button class="rating-btn good" data-action="rate-good">Đúng</button>
          <button class="rating-btn easy" data-action="rate-easy">Dễ</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Quiz nhanh</div>
        <div id="quiz-area"><button class="btn btn-primary btn-block" data-action="start-quiz">Bắt đầu Quiz (5 câu)</button></div>
      </div>

      <div class="card">
        <div class="card-title">Danh sách từ (${VOCABULARY_DATA.cards.length})</div>
        <input type="search" class="search-input" id="vocab-search" placeholder="Tìm từ, nghĩa, chủ đề...">
        <div id="vocab-list"></div>
      </div>
    `);

    this._currentCard = card;
    this.flashcardFlipped = false;
    this.renderVocabList(VOCABULARY_DATA.cards);

    const searchEl = document.getElementById("vocab-search");
    if (searchEl) {
      searchEl.addEventListener(
        "input",
        Utils.debounce((e) => {
          this.renderVocabList(FlashcardManager.searchCards(e.target.value));
        }, 200)
      );
    }
  },

  renderVocabList(cards) {
    const el = document.getElementById("vocab-list");
    if (!el) return;
    el.innerHTML = cards
      .slice(0, 20)
      .map(
        (c) =>
          `<div class="note-item"><strong>${Utils.escapeHTML(c.word)}</strong> <span class="text-muted">— ${Utils.escapeHTML(c.meaning)}</span> <span class="badge">${Utils.escapeHTML(c.topic)}</span></div>`
      )
      .join("");
  },

  flipFlashcard() {
    this.flashcardFlipped = !this.flashcardFlipped;
    document.getElementById("fc-meaning").style.display = this.flashcardFlipped ? "block" : "none";
    document.getElementById("fc-example").style.display = this.flashcardFlipped ? "block" : "none";
  },

  rateFlashcard(quality) {
    if (this._currentCard) {
      FlashcardManager.rateCard(this._currentCard.id, quality);
    }
    Router.go("vocabulary");
  },

  startQuiz() {
    this.currentQuiz = FlashcardManager.generateQuiz(5);
    this.quizIndex = 0;
    this.quizScore = 0;
    this.showQuizQuestion();
  },

  showQuizQuestion() {
    const area = document.getElementById("quiz-area");
    if (!area || !this.currentQuiz) return;
    if (this.quizIndex >= this.currentQuiz.length) {
      area.innerHTML = `<p style="text-align:center">Kết quả: <strong>${this.quizScore}/${this.currentQuiz.length}</strong></p>
        <button class="btn btn-primary btn-block" data-action="start-quiz">Làm lại</button>`;
      this.bindEvents();
      return;
    }
    const q = this.currentQuiz[this.quizIndex];
    area.innerHTML = `
      <p><strong>${Utils.escapeHTML(q.card.word)}</strong> nghĩa là gì?</p>
      ${q.options.map((o) => `<button class="quiz-option" data-quiz-answer="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</button>`).join("")}
      <p style="font-size:0.8rem;color:var(--text-muted)">Câu ${this.quizIndex + 1}/${this.currentQuiz.length}</p>
    `;
    area.querySelectorAll("[data-quiz-answer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const correct = btn.getAttribute("data-quiz-answer") === q.correct;
        btn.classList.add(correct ? "correct" : "wrong");
        if (correct) this.quizScore++;
        setTimeout(() => {
          this.quizIndex++;
          this.showQuizQuestion();
        }, 600);
      });
    });
  },

  renderGrammar() {
    const day = ProgressManager.getCurrentDay();
    const lesson = ProgressManager.getLesson(day);
    const grammarSessions = (lesson?.sessions || []).filter(
      (s) => s.skill?.includes("Grammar") || s.skill?.includes("Vocabulary")
    );

    const sessionsHtml = grammarSessions.length
      ? grammarSessions
          .map((s) => {
            const grammar = s.grammar?.map((g) => `<li>${Utils.escapeHTML(g)}</li>`).join("") || "";
            return `
            <div class="session-item">
              <h4>${Utils.escapeHTML(s.title)}</h4>
              ${grammar ? `<ul>${grammar}</ul>` : ""}
              ${s.vocab ? `<div class="vocab-tags">${s.vocab.map((v) => `<span class="vocab-tag">${Utils.escapeHTML(v)}</span>`).join("")}</div>` : ""}
            </div>
          `;
          })
          .join("")
      : "";

    this.setHeader("Ngữ pháp", `Bài học ngày ${day}`);
    this.render(`
      <div class="card">
        <div class="card-title">📝 Bài học hôm nay</div>
        ${sessionsHtml || '<p class="empty-state">Chọn ngày có bài ngữ pháp trong Today</p>'}
      </div>
      <div class="card">
        <div class="card-title">🔗 Tài liệu tham khảo</div>
        <a class="resource-link" href="https://learnenglish.britishcouncil.org/grammar" target="_blank">British Council Grammar</a>
        <a class="resource-link" href="https://dictionary.cambridge.org/grammar/" target="_blank">Cambridge Grammar</a>
      </div>
      <button class="btn btn-secondary btn-block" onclick="Router.go('today')">← Về bài học hôm nay</button>
    `);
  },

  renderSkillPage(skill) {
    const day = ProgressManager.getCurrentDay();
    const lesson = ProgressManager.getLesson(day);
    const sessions = (lesson?.sessions || []).filter((s) => s.skill?.includes(skill));
    const resources = RESOURCES.filter((r) => r.skill === skill);

    const sessionsHtml = sessions.map((s) => this.renderSession(s, day)).join("");
    const extraResources = resources
      .map(
        (r) =>
          `<a class="resource-link" href="${Utils.escapeHTML(r.url)}" target="_blank">${Utils.escapeHTML(r.title)}</a>`
      )
      .join("");

    this.setHeader(skill, `Luyện ${skill.toLowerCase()} — Ngày ${day}`);
    this.render(`
      <div class="card">
        <div class="card-title">📋 Phiên học hôm nay</div>
        ${sessionsHtml || `<p class="empty-state">Không có bài ${skill} cho ngày này</p>`}
      </div>
      <div class="card">
        <div class="card-title">🔗 Tài liệu bổ sung</div>
        ${extraResources}
      </div>
      <button class="btn btn-secondary btn-block" onclick="Router.go('today')">← Về bài học hôm nay</button>
    `);
  },

  renderSpeaking() {
    const day = ProgressManager.getCurrentDay();
    const lesson = ProgressManager.getLesson(day);
    const speakingSession = (lesson?.sessions || []).find((s) => s.skill?.includes("Speaking"));

    this.setHeader("Speaking", "Shadowing & Ghi âm");
    this.render(`
      <div class="card">
        <div class="card-title">🗣️ Nhiệm vụ hôm nay</div>
        <p>${speakingSession ? Utils.escapeHTML(speakingSession.task || speakingSession.title) : "Ghi âm giới thiệu bản thân 30 giây"}</p>
      </div>
      <div class="card">
        <div class="card-title">🎙️ Ghi âm</div>
        <p id="rec-status" style="text-align:center;color:var(--text-muted)">Sẵn sàng ghi âm</p>
        <button class="btn btn-primary btn-block" id="rec-btn" data-action="start-recording">● Bắt đầu ghi âm</button>
      </div>
      <div class="card">
        <div class="card-title">⏱️ Shadowing Timer</div>
        <div class="timer-display" id="speak-timer">3:00</div>
        <button class="btn btn-primary btn-block" data-action="start-shadowing">Bắt đầu shadowing 3 phút</button>
      </div>
      <button class="btn btn-secondary btn-block" onclick="Router.go('immersion')">💬 Self-talk prompts</button>
    `);
  },

  renderWriting() {
    const stats = Storage.getStats();
    const entries = (stats.writingEntries || []).slice(0, 5);

    this.setHeader("Writing Journal", "Viết và theo dõi số từ");
    this.render(`
      <div class="card">
        <div class="card-title">✍️ Viết hôm nay</div>
        <textarea class="journal-input" id="journal-text" placeholder="Viết 5-10 câu về chủ đề hôm nay..."></textarea>
        <button class="btn btn-primary btn-block" data-action="save-journal" style="margin-top:0.5rem">Lưu bài viết</button>
        <p id="word-count" style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem"></p>
      </div>
      <div class="card">
        <div class="card-title">📚 Bài viết gần đây</div>
        ${
          entries.length
            ? entries
                .map(
                  (e) => `
            <div class="note-item">
              <span style="font-size:0.8rem">${Utils.escapeHTML(e.date)} · ${e.wordCount} từ · ${e.sentenceCount} câu</span>
              <p style="font-size:0.9rem;margin:0.25rem 0">${Utils.escapeHTML(e.text.slice(0, 150))}${e.text.length > 150 ? "..." : ""}</p>
            </div>
          `
                )
                .join("")
            : '<p class="empty-state">Chưa có bài viết</p>'
        }
      </div>
    `);

    const journal = document.getElementById("journal-text");
    const wc = document.getElementById("word-count");
    if (journal && wc) {
      journal.addEventListener(
        "input",
        Utils.debounce(() => {
          const words = journal.value.trim().split(/\s+/).filter(Boolean).length;
          const sentences = journal.value.split(/[.!?]+/).filter((s) => s.trim()).length;
          wc.textContent = `${words} từ · ${sentences} câu`;
        }, 150)
      );
    }
  },

  renderReview() {
    const due = FlashcardManager.getDueCards();
    const progress = Storage.getProgress();
    const recentDays = progress.completedDays.slice(-7);

    this.setHeader("Ôn tập", "Review từ vựng và bài học");
    this.render(`
      <div class="stat-grid">
        <div class="stat-box"><div class="value">${due.length}</div><div class="label">Thẻ cần ôn</div></div>
        <div class="stat-box"><div class="value">${recentDays.length}</div><div class="label">Ngày gần đây</div></div>
      </div>
      <div class="card">
        <button class="btn btn-primary btn-block" onclick="Router.go('vocabulary')">🃏 Ôn Flashcard</button>
        <button class="btn btn-secondary btn-block" onclick="Router.go('vocabulary')" style="margin-top:0.5rem">🎯 Làm Quiz</button>
      </div>
      <div class="card">
        <div class="card-title">📅 Ngày đã hoàn thành gần đây</div>
        ${recentDays.length ? recentDays.map((d) => `<span class="badge badge-success" style="margin:0.2rem">Ngày ${d}</span>`).join("") : '<p class="empty-state">Chưa có ngày hoàn thành</p>'}
      </div>
    `);
  },

  addNote() {
    const el = document.getElementById("quick-note");
    if (!el?.value.trim()) return;
    ProgressManager.addQuickNote(el.value.trim());
    el.value = "";
    this.renderProgress();
  },

  saveJournal() {
    const el = document.getElementById("journal-text");
    if (!el?.value.trim()) return;
    const result = ProgressManager.addWritingEntry(el.value.trim());
    alert(`Đã lưu! ${result.words} từ, ${result.sentences} câu`);
    el.value = "";
    this.renderWriting();
  },

  async toggleRecording(btn) {
    const status = document.getElementById("rec-status");
    if (AudioManager.mediaRecorder?.state === "recording") {
      const blob = await AudioManager.stopRecording();
      if (blob) {
        await AudioManager.saveRecording(blob, `Speaking Day ${ProgressManager.getCurrentDay()}`);
        status.textContent = "✅ Đã lưu bản ghi âm!";
        btn.textContent = "● Ghi âm lại";
      }
    } else {
      const ok = await AudioManager.startRecording();
      if (ok) {
        status.textContent = "🔴 Đang ghi âm...";
        btn.textContent = "■ Dừng ghi âm";
      } else {
        status.textContent = "❌ Không thể truy cập microphone";
      }
    }
  },

  startShadowingTimer() {
    const display = document.getElementById("timer-display") || document.getElementById("speak-timer");
    const duration = display?.id === "speak-timer" ? 180 : 300;
    AudioManager.startShadowingTimer(
      duration,
      (sec) => {
        if (display) display.textContent = AudioManager.formatTime(sec);
      },
      () => {
        ProgressManager.incrementStat("shadowingCount");
        if (display) display.textContent = "Hoàn thành! 🎉";
      }
    );
  },

  showRandomPrompt() {
    const prompt = IMMERSION_PROMPTS[Math.floor(Math.random() * IMMERSION_PROMPTS.length)];
    const el = document.getElementById("prompt-text");
    if (el) el.textContent = prompt;
  },

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    }
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
