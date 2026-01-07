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
