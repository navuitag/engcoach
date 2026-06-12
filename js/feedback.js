const Feedback = (() => {
  const FEEDBACK_CATEGORIES = ["Góp ý chung","Báo lỗi","Đề xuất tính năng","Nội dung / bài học"];

  function getAppName() {
    const app = EdtechApps.EDTECH_APPS.find(
      (item) => item.id === EdtechApps.CURRENT_APP_ID || item.folder.toLowerCase() === String(EdtechApps.CURRENT_APP_ID).toLowerCase()
    );
    return app?.name || document.title.split("—")[0].trim() || "EngCoach";
  }

  function buildFeedbackMailto({ message = "", category = FEEDBACK_CATEGORIES[0], appName = getAppName() } = {}) {
    const subject = encodeURIComponent(`[${appName}] ${category}`);
    const body = encodeURIComponent(
      `Ứng dụng: ${appName}\nLoại góp ý: ${category}\nTrang: ${location.href}\nThiết bị: ${navigator.userAgent}\n\n---\nNội dung góp ý:\n${message.trim() || "(Chưa nhập nội dung)"}\n`
    );
    return `mailto:${Contact.AUTHOR.email}?subject=${subject}&body=${body}`;
  }

  function renderFeedbackFooterAction() {
    return `<button type="button" class="feedback-link-btn" data-feedback-open>Góp ý ứng dụng</button>`;
  }

  function renderFeedbackCard() {
    const options = FEEDBACK_CATEGORIES.map((category) => `<option value="${Utils.escapeHTML(category)}">${Utils.escapeHTML(category)}</option>`).join("");
    return `
      <article class="feedback-card card-panel" id="feedbackCard">
        <h2>Góp ý ứng dụng</h2>
        <p class="feedback-card-lead">Ý kiến của bạn giúp cải thiện ${Utils.escapeHTML(getAppName())}. Góp ý sẽ mở ứng dụng email với nội dung đã điền sẵn.</p>
        <form class="feedback-form" id="feedbackForm">
          <label><span>Loại góp ý</span><select name="category">${options}</select></label>
          <label><span>Nội dung</span><textarea name="message" rows="5" maxlength="2000" placeholder="Mô tả góp ý, lỗi gặp phải hoặc đề xuất của bạn..." required></textarea></label>
          <button class="btn btn-primary" type="submit">Gửi</button>
        </form>
      </article>`;
  }

  function renderFeedbackModal() {
    const options = FEEDBACK_CATEGORIES.map((category) => `<option value="${Utils.escapeHTML(category)}">${Utils.escapeHTML(category)}</option>`).join("");
    return `
      <div class="feedback-backdrop" id="feedbackBackdrop" hidden>
        <section class="feedback-modal card-panel" role="dialog" aria-modal="true" aria-labelledby="feedbackModalTitle">
          <div class="feedback-modal-head">
            <h2 id="feedbackModalTitle">Góp ý · ${Utils.escapeHTML(getAppName())}</h2>
            <button type="button" class="feedback-close" data-feedback-close aria-label="Đóng">×</button>
          </div>
          <form class="feedback-form" id="feedbackModalForm">
            <label><span>Loại góp ý</span><select name="category">${options}</select></label>
            <label><span>Nội dung</span><textarea name="message" rows="6" maxlength="2000" placeholder="Mô tả góp ý, lỗi hoặc đề xuất..." required></textarea></label>
            <div class="feedback-modal-actions">
              <button class="btn btn-secondary" type="button" data-feedback-close>Hủy</button>
              <button class="btn btn-primary" type="submit">Gửi</button>
            </div>
          </form>
        </section>
      </div>`;
  }

  function ensureFeedbackModal() {
    let backdrop = document.getElementById("feedbackBackdrop");
    if (!backdrop) {
      document.body.insertAdjacentHTML("beforeend", renderFeedbackModal());
      backdrop = document.getElementById("feedbackBackdrop");
    }
    return backdrop;
  }

  function openFeedbackModal() {
    ensureFeedbackModal().hidden = false;
    document.getElementById("feedbackBackdrop")?.querySelector("textarea")?.focus();
  }

  function closeFeedbackModal() {
    const backdrop = document.getElementById("feedbackBackdrop");
    if (backdrop) backdrop.hidden = true;
  }

  function submitFeedbackForm(form) {
    const data = new FormData(form);
    const message = String(data.get("message") || "").trim();
    const category = String(data.get("category") || FEEDBACK_CATEGORIES[0]);
    if (!message) { form.querySelector("textarea")?.focus(); return; }
    window.location.href = buildFeedbackMailto({ message, category });
    closeFeedbackModal();
    form.reset();
  }

  let feedbackBound = false;

  function bind() {
    document.querySelectorAll("[data-feedback-open]").forEach((button) => {
      if (button.dataset.feedbackBound === "true") return;
      button.dataset.feedbackBound = "true";
      button.addEventListener("click", openFeedbackModal);
    });
    const profileForm = document.getElementById("feedbackForm");
    if (profileForm && profileForm.dataset.feedbackBound !== "true") {
      profileForm.dataset.feedbackBound = "true";
      profileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitFeedbackForm(profileForm);
      });
    }
    const backdrop = document.getElementById("feedbackBackdrop");
    if (backdrop && backdrop.dataset.feedbackBound !== "true") {
      backdrop.dataset.feedbackBound = "true";
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop || event.target.closest("[data-feedback-close]")) closeFeedbackModal();
      });
      backdrop.querySelector("#feedbackModalForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        submitFeedbackForm(event.currentTarget);
      });
    }
    if (feedbackBound) return;
    feedbackBound = true;
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeFeedbackModal();
    });
  }

  return { bind, renderFeedbackCard, renderFeedbackFooterAction, buildFeedbackMailto, getAppName };
})();
