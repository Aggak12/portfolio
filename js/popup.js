// ===== Portfolio modal + carousel =====
(() => {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const titleEl = modal.querySelector("#modalTitle");
  const imgEl = modal.querySelector(".carousel__img");
  const countEl = modal.querySelector(".carousel__count");
  const bodyEl = modal.querySelector(".modal__body");

  const btnPrev = modal.querySelector("[data-prev]");
  const btnNext = modal.querySelector("[data-next]");
  const closeEls = modal.querySelectorAll("[data-close]");

  const projects = [
    {
      title: "Project 1 – Mobilsite",
      body: "Dummy text for now. Short description of process, methods, and final solution. (We’ll replace this with your real write-up.)",
      images: ["imgs/Mobil1.png", "imgs/Mobil5.png", "imgs/Mobil6.png", "imgs/Mobil7.png", "imgs/Mobil2.png", "imgs/Mobil3.png", "imgs/Mobil4.png"],
    },
    {
      title: "Project 2 – Emnesite",
      body: "Dummy text for now. Explain research, prototyping, design choices, and how the final solution supports the goal.",
      images: ["imgs/emne1.png", "imgs/emne2.png"],
    },
    {
      title: "Project 3 – Emergency site",
      body: "Dummy text for now. Mention SVG, visual communication, layout decisions, and what you learned.",
      images: ["imgs/emnesite-pre.png"],
    },
    {
      title: "Project 4 – Virksomhedsite",
      body: "Dummy text for now. Describe group collaboration, redesign decisions, and outcome improvements.",
      images: ["imgs/emnesite-pre.png", "imgs/emnesite-pre.png"],
    },
  ];

  let currentProject = null;
  let index = 0;
  let lastFocusEl = null;

  function render() {
    if (!currentProject) return;
    const total = currentProject.images.length;
    imgEl.src = currentProject.images[index];
    imgEl.alt = `${currentProject.title} image ${index + 1}`;
    countEl.textContent = `${index + 1} / ${total}`;

    // Disable arrows when only 1 image
    const single = total <= 1;
    btnPrev.disabled = single;
    btnNext.disabled = single;
    btnPrev.style.opacity = single ? 0.4 : 1;
    btnNext.style.opacity = single ? 0.4 : 1;
  }

  function openModal(projectIdx) {
    currentProject = projects[projectIdx];
    if (!currentProject) return;

    index = 0;
    titleEl.textContent = currentProject.title;
    bodyEl.textContent = currentProject.body;

    render();

    lastFocusEl = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // focus close button for accessibility
    const closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusEl && typeof lastFocusEl.focus === "function") {
      lastFocusEl.focus();
    }
  }

  function prev() {
    if (!currentProject) return;
    const total = currentProject.images.length;
    if (total <= 1) return;
    index = (index - 1 + total) % total;
    render();
  }

  function next() {
    if (!currentProject) return;
    const total = currentProject.images.length;
    if (total <= 1) return;
    index = (index + 1) % total;
    render();
  }

  // Open buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-open");
    if (!btn) return;
    const idx = Number(btn.dataset.project);
    if (Number.isNaN(idx)) return;
    openModal(idx);
  });

  // Close buttons/backdrop
  closeEls.forEach((el) => el.addEventListener("click", closeModal));

  // Arrows
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
