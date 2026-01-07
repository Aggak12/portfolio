// Burger menu
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  if (!header || !burger || !nav) return;

  const openMenu = () => {
    header.classList.add("nav-open");
    burger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    header.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    const isOpen = header.classList.contains("nav-open");
    isOpen ? closeMenu() : openMenu();
  };

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});

// Portfolio
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const openButtons = document.querySelectorAll(".project-open");
  const closeButtons = modal.querySelectorAll("[data-close]");
  const backdrop = modal.querySelector(".modal__backdrop");

  const titleEl = modal.querySelector(".modal__title");
  const bodyEl = modal.querySelector(".modal__body");

  // TEMP
  const projects = [
    {
      title: "Mobilsite",
      text: `The Mobilsite project was my first introduction to coding and web development. The main goal of the assignment was to learn the basics of HTML and CSS, as well as how to use media queries to create a mobile-responsive website. The project was developed using a mobile-first approach, where the mobile version of the site was coded before adapting it to larger screens.

We were provided with fixed content, including text and images, as well as a wireframe and layout diagram that the site had to follow. This meant that the focus of the project was not on visual concept development, but on understanding structure, layout, and correct use of code. The website consisted of multiple HTML pages connected through a navigation menu, all following the same basic structure with header, navigation, main content, and footer.

Through this project, I learned how to structure HTML files correctly, work with CSS layout techniques such as flexbox and grid, and apply margin and padding to improve readability. As this was my first experience with coding, one of the main challenges was orienting myself in the code and understanding how different elements and CSS rules affected the layout. Despite this, the project gave me a strong foundational understanding of how websites are built and increased my confidence in working with HTML and CSS in later projects.
`,
    },
    {
      title: "Emnesite – Fashion History",
      text: "FILLER: Emnesite project process text goes here.",
    },
    {
      title: "Emergency Site",
      text: "FILLER: Emergency site process text goes here.",
    },
    {
      title: "Group Project – Website Redesign",
      text: "FILLER: Group project process text goes here.",
    },
  ];

  function openModal(index) {
    const project = projects[index];
    titleEl.textContent = project.title;
    bodyEl.textContent = project.text;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.project);
      openModal(index);
    });
  });

  closeButtons.forEach((btn) => btn.addEventListener("click", closeModal));

  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
