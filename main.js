"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (!link) return;
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  history.replaceState({ data: "pushState1" }, "", `./${link}`);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (!filter) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  if (active) {
    active.classList.remove("selected");
  }
  e.target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// const selectProject = document.querySelector(".work__projects");
// const selectModal = document.querySelector(".modal-overlay");
// const modalContent = document.querySelector(".modal-content");
// selectProject.addEventListener("click", (e) => {
//   const target = e.target;
//   let project = null;
//   if (target.dataset.project) project = target.parentNode;
//   else if (target.parentNode.dataset.project)
//     project = target.parentNode.parentNode;

//   if (project) {
//     const selectProjects = project.cloneNode(true);
//     selectProjects.remove(".project__description");

//     if (!selectModal.classList.contains("active")) {
//       modalContent.appendChild(selectProjects);
//       selectModal.classList.toggle("active");
//     }
//   }
// });
// selectModal.addEventListener("click", () => {
//   const detail = document.querySelector(".modal-content .project");
//   if (detail) modalContent.removeChild(detail);
//   selectModal.classList.remove("active");
// });
const selectProject = document.querySelector(".work__projects");
const selectModal = document.querySelector(".modal-overlay");
const modalContent = document.querySelector(".modal-content .content");

selectProject.addEventListener("click", (e) => {
  const target = e.target.closest("[data-project]");
  if (!target) return;

  const project = target.closest(".project");
  if (!project) return;

  const cloneProject = project.cloneNode(true);
  const cloneContent = cloneProject
    .querySelector(".project__description")
    .cloneNode(true);
  cloneProject.querySelector(".project__description").remove();

  if (!selectModal.classList.contains("active")) {
    modalContent.appendChild(cloneProject);
    modalContent.appendChild(cloneContent);
    selectModal.classList.add("active");
  }
});

selectModal.addEventListener("click", () => {
  const detail = modalContent.querySelector(".project");
  const desc = modalContent.querySelector(".project__description");
  if (detail) {
    modalContent.removeChild(detail);
    modalContent.removeChild(desc);
  }
  selectModal.classList.remove("active");
});
