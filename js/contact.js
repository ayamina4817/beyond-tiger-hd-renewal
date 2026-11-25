
/* =========================
   CONTACT CONFIRMATION
========================= */

(() => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("contact-confirm-modal");

  if (!form || !modal) return;

  const overlay = modal.querySelector(".contact-confirm-overlay");
  const closeButton = modal.querySelector(".contact-confirm-close");
  const backButton = modal.querySelector(".contact-confirm-back");
  const proceedButton = modal.querySelector(".contact-confirm-submit");
  const notice = document.getElementById("contact-confirm-notice");

  const fields = {
    company: document.getElementById("company"),
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    category: document.getElementById("category"),
    message: document.getElementById("message")
  };

  const displayFields = {
    company: document.getElementById("confirm-company"),
    name: document.getElementById("confirm-name"),
    email: document.getElementById("confirm-email"),
    category: document.getElementById("confirm-category"),
    message: document.getElementById("confirm-message")
  };

  let lastFocusedElement = null;

  const categoryLabels = {
    business: "事業について",
    partnership: "協業・パートナーシップ",
    recruitment: "採用について",
    other: "その他"
  };

  function openModal() {
    lastFocusedElement = document.activeElement;

    displayFields.company.textContent = fields.company.value.trim() || "未入力";
    displayFields.name.textContent = fields.name.value.trim();
    displayFields.email.textContent = fields.email.value.trim();
    displayFields.category.textContent =
      categoryLabels[fields.category.value] || "";
    displayFields.message.textContent = fields.message.value.trim();

    notice.textContent =
      "現在、実際のメール送信機能は未接続です。";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-confirm-open");

    closeButton.focus();
  }

  function closeModal() {
    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-confirm-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    openModal();
  });

  closeButton.addEventListener("click", closeModal);
  backButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  proceedButton.addEventListener("click", () => {
    notice.textContent =
      "送信機能は未接続です。入力内容は送信されていません。";
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();

