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
      body: `Mobilsite was my first project and an introduction to building a website with HTML and CSS. Using provided content about computers, together with teacher-supplied wireframes and layout diagrams, I focused on translating a predefined structure into a working webpage. This project was where I first worked with semantic HTML, navigation links, and basic CSS styling, while learning how spacing, layout structure, and visual hierarchy affect the overall clarity of a page. We were free to make visual styling choices, while still following the given layout framework. I also used CSS Grid and media queries to turn the design into a responsive mobile version. Although I initially found it challenging to keep track of everything happening in the code, seeing the visual changes helped me gradually understand how structure and styling interact.

<br><br>
<a class="modal-link-btn" href="https://aggak12.github.io/website/index.html" target="_blank" rel="noopener">Visit website</a>`,
      images: ["imgs/Mobil1.png", "imgs/Mobil5.png", "imgs/Mobil6.png", "imgs/Mobil3.png", "imgs/Mobil2.png", "imgs/Mobil7.png", "imgs/Mobil4.png"],
    },

    {
      title: "Project 2 – Emnesite",
      body: `Emnesite was an introduction to UX/UI thinking and a more design-driven project with greater creative freedom. The process began with research and idea development, followed by solution sketches that were shared and discussed in a class “gallery” format for peer feedback. We worked with user types, user goals, and user stories, and developed mood boards and style tiles to shape the visual direction. I created my own layout diagrams and focused on prototyping in Figma, working from low-fidelity to high-fidelity. This project also introduced usability methods such as Likert tests and 5-second tests, as well as tools like Lighthouse testing.

My concept was a fashion-focused website exploring history and meaning behind clothing, aiming to spark curiosity by combining visual appeal with small, engaging facts. I became very absorbed in experimenting with layout, colour, and visual structure, which strengthened my design confidence and creativity. Although I did not complete the full coded version, I built the landing page and gained a much clearer understanding of how design complexity impacts implementation, which has influenced how I approach later projects.`,
      images: ["imgs/emne1.png", "imgs/emne2.png"],
    },

    {
      title: "Project 3 – Emergency Site",
      body: `This project built on earlier UX/UI methods while introducing more advanced visual and technical elements. We worked with SVG graphics and learned how to integrate them into websites, including targeting specific parts of the SVG for styling and interaction. This was also my introduction to JavaScript, which we used to create interactive features such as pop-ups, alongside working with HTML forms. AI tools were explored as part of the process to support content development, including generating text and imagery.

For this project, I developed a fictional and humorous “emergency” website concept about Soviet dolls taking over Denmark, presented through a dramatic, propaganda-inspired visual style influenced by fashion and historical graphic aesthetics. The project leaned strongly into visual storytelling and artistic direction while maintaining a structured layout. I focused particularly on creating custom SVG visuals and establishing a distinctive visual identity. The coded prototype demonstrates key sections of the concept, with the emphasis placed on experimentation, visual expression, and combining narrative, design, and interaction.

<br><br>
<a class="modal-link-btn" href="https://aggak12.github.io/Emergency/index.html" target="_blank" rel="noopener">Visit website</a>`,
      images: ["imgs/emnesite-pre.png"],
    },

    {
      title: "Project 4 – Virksomhedsite",
      body: `This group project focused on applying the methods we had learned throughout the semester in a more realistic redesign scenario. We selected a local flower shop with an outdated and visually inconsistent website and developed a conceptual redesign aimed at improving structure, clarity, and overall user experience. The process began with analysing the existing site to identify weaknesses, followed by research into the target audience and comparable visual directions. We then developed mood boards, style tiles, layout diagrams, wireframes, and prototypes to shape a cohesive visual and structural solution.

The project introduced us to working in a more organised, collaborative workflow, including Scrum meetings and shared planning. We conducted usability methods such as 5-second tests, Likert tests, and user stories to evaluate and refine our decisions. As a group, we shared responsibilities across research, design, and coding, working together on a shared GitHub repository. Visiting the shop to take our own photos helped make the concept feel more grounded and authentic. This project strengthened my understanding of collaborative design processes and how research, visual identity, and implementation come together in a redesign context.

<br><br>
<a class="modal-link-btn" href="https://justy488.github.io/tema-5_part2/index.html" target="_blank" rel="noopener">Visit website</a>`,
      images: ["imgs/rosesblm.png", "imgs/virksm1.png", "imgs/virksm2.png", "imgs/virksm3.png", "imgs/virksm4.png", "imgs/virksm5.png", "imgs/virksm6.png"],
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
    bodyEl.innerHTML = currentProject.body;

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
