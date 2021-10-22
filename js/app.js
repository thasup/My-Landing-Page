/**
 * 
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
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/


// =======================
// Define Global Variables
// =======================

const sections = document.getElementsByTagName("section");
const sec = document.getElementsByClassName("sec");
const eachSection = document.getElementsByClassName("landing__container");
const navList = document.getElementById("navbar__list");

const headerX = document.querySelector("#page__header");
const headerHeight = headerX.offsetHeight;

const logo = document.querySelector(".logo");
const backToTop = document.querySelector("#back-to-top");

const hamburger = document.querySelector("#hamburger-menu");

// const idSections = document.querySelectorAll("sec");

// ====================
// End Global Variables
// ====================

// ======================
// Start Helper Functions
// ======================

// Build hamburger menu button
hamburger.addEventListener("click", () => {
    navList.classList.toggle("hamburger-menu-active");
    hamburger.classList.toggle("hamburger-button-active");
});

// Back to the Top when click on button.
const toTop = (item) => {
    item.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
};

// Make back-to-top button disapper untill page scrolled down
const hideButton = (item) => {
    window.addEventListener("scroll", () => {
        if (window.scrollY < window.innerHeight / 2) {
            backToTop.style.display = "none";
        } else {
            backToTop.style.display = "block";
        }
    }, false);
};

// ====================
// End Helper Functions
// ====================

// ====================
// Begin Main Functions
// ====================

// build the nav
const navigationBar = (items) => {
    
    for (item of items) {
      const listNav = document.createElement('li');
      const aNav = document.createElement('a');

      // Set Attributes
      aNav.href = `#${item.id}`;
      aNav.id = `${item.id}_button`;
      aNav.className = "menu__link";

      const sectionAttr = item.getAttribute("data-nav");
      aNav.textContent = sectionAttr;

      listNav.appendChild(aNav);
      navList.appendChild(listNav);
    }
  };

// Add class "your-active-class" to section and class "active-link" to navigation button 
// when that section come to visual viewport
const addActiveClass = (items) => {
    window.addEventListener("scroll",() =>{
        for (item of items) {
            const currentMenu = document.getElementById(`${item.id}_button`);
            const position = item.getBoundingClientRect();
            const windowScreen = window.innerHeight;
            // console.log(currentMenu);
            // console.log(position);
    
            if (
                position.top < (windowScreen / 2) && position.bottom > (windowScreen / 2)
            ) {
                item.classList.add("your-active-class");
                currentMenu.classList.add("active-link");
            }
            else {
                item.classList.remove("your-active-class");
                currentMenu.classList.remove("active-link");
            }
        }
    })   
}

// Scroll to anchor ID using scrollTO event
const scrollOnClick = () => {
    for (let i = 0; i < navList.children.length; i++) {
        navList.children[i].addEventListener("click", (event) => {
            window.scrollTo({
                top: sec[i].offsetTop - 20 - headerHeight,
                behavior: "smooth",
            });
            
            event.preventDefault();
        });
    }
};

// ==================
// End Main Functions
// ==================

// =============
// Begin Events
// =============

// Build menu 
navigationBar(sections);

// Scroll to section on link click
scrollOnClick();

// Set sections as active
addActiveClass(sections);

// Run back-to-top function
toTop(logo);
toTop(backToTop);
hideButton(backToTop)

