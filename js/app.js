/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Helper function to check if a section is in the viewport
const isInViewport = (section) => {
  const rect = section.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom < window.innerHeight / 2;
};

// Helper function to toggle content visibility
const toggleContent = (button) => {
  const section = button.closest("section");
  const content = section.querySelector(".content");
  content.style.display = content.style.display === "block" ? "none" : "block";
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build the navigation
const buildNav = () => {
  sections.forEach((section) => {
    const navItem = document.createElement("li");
    navItem.innerHTML = `<a class='menu__link' href='#${section.id}'>${section.dataset.nav}</a>`;
    navList.appendChild(navItem);
  });
};

// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
  sections.forEach((section) => {
    const navItem = navList.querySelector(`a[href='#${section.id}']`);
    const rect = section.getBoundingClientRect();
    if (rect.top >= 150 && rect.bottom <= 150) {
      // Adjusted range
      section.classList.add("active__class");
      navItem.classList.add("active");
    } else {
      section.classList.remove("active__class");
      navItem.classList.remove("active");
    }
  });
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {
  event.preventDefault();
  const targetId = event.target.getAttribute("href").slice(1);
  const targetSection = document.getElementById(targetId);
  targetSection.scrollIntoView({ behavior: "smooth" });
};

// Show or hide navbar on scroll event
let scrollTimer = null;
const handleScroll = () => {
  if (scrollTimer !== null) {
    clearTimeout(scrollTimer);
  }
  navList.style.display = "block"; // Show navbar on scroll
  scrollTimer = setTimeout(() => {
    navList.style.display = "none"; // Hide navbar after scroll ends
  }, 1000); // Adjust the timeout duration as needed
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", buildNav);

// Scroll to section on link click
navList.addEventListener("click", scrollToSection);

// Set sections as active
window.addEventListener("scroll", setActiveSection);

// Show scroll-to-top button
window.addEventListener("scroll", handleScroll);

// Scroll to top on button click
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Add toggle content functionality
document.querySelectorAll(".toggle__button").forEach((button) => {
  button.addEventListener("click", () => toggleContent(button));
});
