/* =========================================
   beyond Tiger HD CORPORATION
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  console.log("beyond Tiger HD Renewal initialized.");

  /* ---------- SCROLL REVEAL ---------- */

  const revealTargets = [
    "#vision .vision-content",
    "#business .business-intro",
    "#business .business-item",
    "#culture .culture-intro",
    "#culture .culture-value",
    "#news .news-intro",
    "#news .news-item",
    "#contact .contact-content"
  ];

  const elements = document.querySelectorAll(revealTargets.join(","));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });

});

/* NEWS MODAL */
(() => {
  const modal = document.getElementById("news-modal");
  if (!modal) return;

  const closeButton = modal.querySelector(".news-modal-close");
  const overlay = modal.querySelector(".news-modal-overlay");
  const dateElement = document.getElementById("news-modal-date");
  const categoryElement = document.getElementById("news-modal-category");
  const titleElement = document.getElementById("news-modal-title");
  const bodyElement = document.getElementById("news-modal-body");
  const newsItems = document.querySelectorAll(".news-item[data-news]");

  const articles = [
    {
      title: "Beyond Tiger HD コーポレートサイト公開のお知らせ",
      category: "INFORMATION",
      date: "2026.01.01",
      body: [
        "Beyond Tiger HDの企業理念や事業活動、私たちが大切にする価値観をお伝えするコーポレートサイトを公開しました。",
        "「可能性を超えていけ。」を理念に、私たちの想いや事業、未来へ向けた取り組みを発信していきます。",
        "今後もBeyond Tiger HDの歩みを、このサイトを通じてお届けしてまいります。"
      ]
    },
    {
      title: "Beyond Tiger HDの事業紹介について",
      category: "PROJECT",
      date: "2026.01.01",
      body: [
        "Beyond Tiger HDが取り組む事業領域と、それぞれの事業を通じて生み出したい価値をご紹介しています。",
        "AI & DIGITAL、EDUCATION、FOOD。それぞれの領域で新たな可能性を追求し、人々の暮らしや未来につながる価値の創出を目指します。",
        "各事業の詳細は、コーポレートサイト内のBUSINESSページよりご覧いただけます。"
      ]
    },
    {
      title: "企業理念とCULTUREを公開しました",
      category: "INFORMATION",
      date: "2026.01.01",
      body: [
        "Beyond Tiger HDが大切にする理念と、組織としての価値観をCULTUREページに公開しました。",
        "挑戦、協働、成長。私たちは一人ひとりの可能性を信じ、互いを尊重しながら、共に未来を創ることを大切にしています。",
        "私たちの想いと文化を、ぜひご覧ください。"
      ]
    }
  ];

  let lastFocusedElement = null;

  function openModal(index) {
    const article = articles[index];
    if (!article) return;

    lastFocusedElement = document.activeElement;

    dateElement.textContent = article.date;
    categoryElement.textContent = article.category;
    titleElement.textContent = article.title;
    bodyElement.replaceChildren();

    article.body.forEach(text => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      bodyElement.appendChild(paragraph);
    });

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("news-modal-open");
    closeButton.focus();
  }

  function closeModal() {
    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("news-modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  newsItems.forEach(item => {
    const index = Number(item.dataset.news);

    item.addEventListener("click", () => openModal(index));

    item.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(index);
      }
    });
  });

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();
