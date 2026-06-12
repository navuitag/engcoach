const LearnerUI = {
  _handlers: {},
  _documentBound: false,

  initials(name = "") {
    return name.trim().slice(0, 1).toUpperCase() || "?";
  },

  renderSwitcher() {
    const profiles = ProfileStore.getProfiles();
    if (!profiles.length) return "";

    const state = ProfileStore.getState();
    const active = profiles.find((p) => p.id === state.profileId) || profiles[0];
    const menu = profiles.map((profile) => {
      const activeClass = profile.id === state.profileId ? " is-active" : "";
      return `
        <button type="button" class="learner-menu-item${activeClass}" data-profile-id="${Utils.escapeHTML(profile.id)}">
          <span class="learner-avatar" style="background:${Utils.escapeHTML(profile.avatarColor)}">${Utils.escapeHTML(this.initials(profile.name))}</span>
          <span class="learner-menu-meta">
            <strong>${Utils.escapeHTML(profile.name)}</strong>
            <small>${profile.summary.studyTodayLabel || "0 phút"} hôm nay · ${profile.summary.studyTotalLabel || "0 phút"} tổng</small>
          </span>
        </button>`;
    }).join("");

    return `
      <div class="learner-switcher">
        <button type="button" class="learner-switcher-btn" id="learnerSwitcherBtn" aria-haspopup="true" aria-expanded="false">
          <span class="learner-avatar" style="background:${Utils.escapeHTML(active.avatarColor)}">${Utils.escapeHTML(this.initials(active.name))}</span>
          <span class="learner-switcher-name">${Utils.escapeHTML(active.name)}</span>
          <span class="learner-switcher-caret">▾</span>
        </button>
        <div class="learner-menu" id="learnerMenu" hidden>
          <p class="learner-menu-label">Chọn người học</p>
          ${menu}
          <button type="button" class="learner-menu-add" id="addLearnerQuick">+ Thêm người học</button>
        </div>
      </div>`;
  },

  bindSwitcher(handlers = {}) {
    this._handlers = handlers;
    const button = document.getElementById("learnerSwitcherBtn");
    const menu = document.getElementById("learnerMenu");
    if (!button || !menu) return;

    const closeMenu = () => {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    };

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = menu.hidden;
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
    });

    if (!this._documentBound) {
      document.addEventListener("click", () => {
        const activeMenu = document.getElementById("learnerMenu");
        const activeBtn = document.getElementById("learnerSwitcherBtn");
        if (!activeMenu || !activeBtn) return;
        activeMenu.hidden = true;
        activeBtn.setAttribute("aria-expanded", "false");
      });
      this._documentBound = true;
    }

    menu.addEventListener("click", (event) => event.stopPropagation());

    menu.addEventListener("click", (event) => {
      const switchBtn = event.target.closest("[data-profile-id]");
      if (switchBtn) {
        this._handlers.onSwitch?.(switchBtn.dataset.profileId);
        closeMenu();
        return;
      }
      if (event.target.closest("#addLearnerQuick")) {
        this._handlers.onAdd?.();
        closeMenu();
      }
    });
  },

  renderLearnerList(profiles) {
    const state = ProfileStore.getState();
    if (!profiles.length) {
      return `<article class="empty-state">Chưa có người học nào.</article>`;
    }

    return profiles.map((profile) => {
      const isActive = profile.id === state.profileId;
      return `
        <article class="learner-card${isActive ? " is-active" : ""}">
          <div class="learner-card-head">
            <span class="learner-avatar learner-avatar-lg" style="background:${Utils.escapeHTML(profile.avatarColor)}">${Utils.escapeHTML(this.initials(profile.name))}</span>
            <div>
              <h3>${Utils.escapeHTML(profile.name)}${isActive ? ' <span class="tag">Đang học</span>' : ""}</h3>
              <p>Ngày ${profile.summary.currentDay}/60 · ${profile.summary.studyTotalLabel || "0 phút"} tổng · Streak ${profile.summary.streak}</p>
            </div>
          </div>
          <div class="learner-card-actions">
            ${isActive ? "" : `<button class="btn btn-secondary btn-sm" type="button" data-switch-profile="${Utils.escapeHTML(profile.id)}">Chuyển sang</button>`}
            <button class="btn btn-secondary btn-sm" type="button" data-rename-profile="${Utils.escapeHTML(profile.id)}">Đổi tên</button>
            <button class="btn btn-secondary btn-sm" type="button" data-reset-profile="${Utils.escapeHTML(profile.id)}">Xóa tiến độ</button>
            ${profiles.length > 1 ? `<button class="btn btn-outline btn-sm" type="button" data-delete-profile="${Utils.escapeHTML(profile.id)}">Xóa hồ sơ</button>` : ""}
          </div>
        </article>`;
    }).join("");
  },

  renderAddLearnerForm() {
    return `
      <form class="add-learner-form" id="addLearnerForm">
        <label class="form-label">
          <span>Tên người học</span>
          <input class="form-input" type="text" name="name" maxlength="40" placeholder="Ví dụ: Minh, Lan..." required>
        </label>
        <button class="btn btn-primary" type="submit">Thêm và chuyển sang</button>
      </form>`;
  }
};
