
// ==============================
// 1. ANIMATED TYPING TEXT
// ==============================

const typingElement = document.getElementById("typing-text");

const roles = [
  "Software Developer",
  "Python Developer",
  "AI Enthusiast",
  "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    characterIndex++;
    typingElement.textContent =
      currentRole.substring(0, characterIndex);

    if (characterIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1400);
      return;
    }
  } else {
    characterIndex--;
    typingElement.textContent =
      currentRole.substring(0, characterIndex);

    if (characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const delay = deleting ? 45 : 85;
  setTimeout(typeRole, delay);
}

if (reduceMotion) {
  typingElement.textContent = roles[0];
} else {
  typeRole();
}


// ==============================
// 2. MOBILE NAVIGATION
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});


// ==============================
// 3. SCROLL REVEAL ANIMATIONS
// ==============================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

 // ==============================
 // 4. ACTIVE NAVIGATION LINK
 // ==============================

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = [...entries]
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top
        );

      if (visibleSections.length > 0) {
        const currentId = visibleSections[0].target.id;

        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentId}`
          );
        });
      }
    },
    {
      rootMargin: "-15% 0px -70% 0px",
      threshold: 0
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}



// ==============================
// 5. BACK TO TOP BUTTON
// ==============================

const backToTop = document.getElementById("back-to-top");

function updateBackToTop() {
  backToTop.classList.toggle(
    "visible",
    window.scrollY > 400
  );
}

window.addEventListener("scroll", updateBackToTop, {
  passive: true
});

updateBackToTop();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth"
  });
});


// ==============================
// 6. AUTOMATIC COPYRIGHT YEAR
// ==============================

document.getElementById("year").textContent =
  new Date().getFullYear();
