const EdtechHub = {
  renderHubLink() {
    const url = EdtechApps.getHubUrl();
    return `
    <a class="edtech-hub-home-btn" href="${Utils.escapeHTML(url)}" title="Về EdTech Hub">
      <span aria-hidden="true">🏠</span>
      <span class="edtech-hub-label-btn">Hub</span>
    </a>`;
  },
  renderButton() {
    const apps = EdtechApps.listApps();
    const hubItem = `
      <a class="edtech-hub-item edtech-hub-item-home" href="${Utils.escapeHTML(EdtechApps.getHubUrl())}">
        <span class="edtech-hub-emoji" aria-hidden="true">🏠</span>
        <span class="edtech-hub-meta">
          <strong>EdTech Hub</strong>
          <small>Trang chủ · chọn môn học</small>
        </span>
      </a>`;
    const menu = apps.map((app) => `
      <a class="edtech-hub-item${app.isCurrent ? " is-current" : ""}" href="${Utils.escapeHTML(app.url)}"${app.isCurrent ? ' aria-current="page"' : ""}>
        <span class="edtech-hub-emoji" aria-hidden="true">${app.emoji}</span>
        <span class="edtech-hub-meta">
          <strong>${Utils.escapeHTML(app.short)}</strong>
          <small>${Utils.escapeHTML(app.name)}</small>
        </span>
        ${app.isCurrent ? '<span class="edtech-hub-here">Đang học</span>' : ""}
      </a>`).join("");
    return `
      <div class="edtech-hub">
        ${this.renderHubLink()}
        <button type="button" class="edtech-hub-btn" id="edtechHubBtn" aria-haspopup="true" aria-expanded="false">
          <span class="edtech-hub-icon" aria-hidden="true">📚</span>
          <span class="edtech-hub-label-btn">Môn học</span>
          <span class="edtech-hub-caret" aria-hidden="true">▾</span>
        </button>
        <div class="edtech-hub-menu" id="edtechHubMenu" hidden>
          ${hubItem}
          <p class="edtech-hub-menu-title">Chuyển môn học</p>
          ${menu}
        </div>
      </div>`;
  },
  renderSidebar() {
    const hub = EdtechApps.getHubUrl();
    return `<div class="edtech-hub-sidebar">
      <a href="${Utils.escapeHTML(hub)}" class="edtech-hub-sidebar-home">
        <span aria-hidden="true">🏠</span><span>EdTech Hub</span>
      </a>
      ${EdtechApps.listApps().map((app) => `
      <a href="${Utils.escapeHTML(app.url)}" class="${app.isCurrent ? "is-current" : ""}">
        <span aria-hidden="true">${app.emoji}</span>
        <span>${Utils.escapeHTML(app.short)}</span>
      </a>`).join("")}</div>`;
  },
  renderGrid(title = "Khám phá môn học khác") {
    const apps = EdtechApps.listApps().filter((app) => !app.isCurrent);
    if (!apps.length) return "";
    return `
      <section class="edtech-hub-grid-section card-panel">
        <div class="section-head">
          <h2>${Utils.escapeHTML(title)}</h2>
          <a href="${Utils.escapeHTML(EdtechApps.getHubUrl())}">← Về EdTech Hub</a>
        </div>
        <div class="edtech-hub-grid">
          ${apps.map((app) => `
            <a class="edtech-hub-card" href="${Utils.escapeHTML(app.url)}">
              <span class="edtech-hub-card-emoji" aria-hidden="true">${app.emoji}</span>
              <strong>${Utils.escapeHTML(app.short)}</strong>
              <span>${Utils.escapeHTML(app.name)}</span>
            </a>`).join("")}
        </div>
      </section>`;
  },
  bind() {
    const button = document.getElementById("edtechHubBtn");
    const menu = document.getElementById("edtechHubMenu");
    if (!button || !menu) return;
    button.onclick = (event) => {
      event.stopPropagation();
      const open = menu.hidden;
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
    };
    menu.onclick = (event) => event.stopPropagation();
    if (this._documentBound) return;
    this._documentBound = true;
    document.addEventListener("click", () => {
      const activeMenu = document.getElementById("edtechHubMenu");
      const activeBtn = document.getElementById("edtechHubBtn");
      if (!activeMenu || !activeBtn) return;
      activeMenu.hidden = true;
      activeBtn.setAttribute("aria-expanded", "false");
    });
  }
};