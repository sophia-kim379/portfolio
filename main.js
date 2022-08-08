'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
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
})

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
    home.style.opacity = 1 - window.scrollY/homeHeight;
})

// Projects
const workBtnContainer = document.querySelector(".work__categories")
const projectContainer = document.querySelector(".work__projects")
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (!filter) {
      return;
    }
  
    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    if (active) {
      active.classList.remove('selected');
    }
    e.target.classList.add('selected');
  
    projectContainer.classList.add('anim-out');
    setTimeout(() => {
      projects.forEach((project) => {
        if (filter === '*' || filter === project.dataset.type) {
          project.classList.remove('invisible');
        } else {
          project.classList.add('invisible');
        }
      });
      projectContainer.classList.remove('anim-out');
    }, 300);
  });


// Project description detail
// const projectItem = document.querySelector(".project");
// projectItem.addEventListener("click", (e)=> {
//   console.log(e.target)
// })


// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
  }


