// ============================================================
// DATA — component library (skills), organized like a parts bin
// ============================================================
const COMPONENT_LIBRARY = [
  {
    title: "VLSI & Hardware Design",
    items: ["Verilog HDL (basic)", "Xilinx Vivado", "Cadence (schematic / layout)", "Proteus circuit simulation"]
  },
  {
    title: "Embedded Systems",
    items: ["Arduino IDE, IoT system design", "Microcontroller integration", "Relay & sensor systems", "ARM Cortex-M4"]
  },
  {
    title: "5G & RF Technology",
    items: ["5G Core & RAN management", "RF & antenna basics (HFSS)", "5G protocol stack"]
  },
  {
    title: "AI / ML Integration",
    items: ["Qualcomm AI Upskilling (certified)", "Arduino sensor-based ML inference", "NVIDIA AI architecture fundamentals"]
  },
  {
    title: "Software Tools",
    items: ["Docker · Python", "HTML / CSS / JS", "Linux (Ubuntu) · Windows"]
  },
  {
    title: "Domain Knowledge",
    items: ["Digital & analog electronics", "Digital & analog communication", "CMOS"]
  }
];

function renderChipLibrary(){
  const root = document.getElementById("chiplib");
  if(!root) return;
  const frag = document.createDocumentFragment();
  COMPONENT_LIBRARY.forEach((group) => {
    const chip = document.createElement("div");
    chip.className = "chip reveal";
    const title = document.createElement("div");
    title.className = "chip__title";
    title.textContent = group.title;
    const list = document.createElement("ul");
    list.className = "chip__list";
    group.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    chip.appendChild(title);
    chip.appendChild(list);
    frag.appendChild(chip);
  });
  root.appendChild(frag);
  observeReveals();
}

// ============================================================
// TYPEWRITER — role rotation
// ============================================================
const ROLES = [
  "5G RAN & Core Infrastructure",
  "Embedded Systems Engineer",
  "AI/ML on Constrained Hardware",
  "FPGA & Digital Design"
];

function startTypewriter(){
  const el = document.getElementById("typewriter");
  if(!el) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion){
    el.textContent = ROLES[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick(){
    const current = ROLES[roleIndex];

    if(!deleting){
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
}

// ============================================================
// SCROLL SPY — highlight active rail nav node
// ============================================================
function initScrollSpy(){
  const sections = document.querySelectorAll("main section[id]");
  const navNodes = document.querySelectorAll(".railnav__node");
  if(!sections.length || !navNodes.length) return;

  const map = new Map();
  navNodes.forEach((n) => map.set(n.getAttribute("href").slice(1), n));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const node = map.get(entry.target.id);
      if(!node) return;
      if(entry.isIntersecting){
        navNodes.forEach((n) => n.classList.remove("active"));
        node.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

  sections.forEach((s) => observer.observe(s));
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu(){
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  if(!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
let revealObserver;
function observeReveals(){
  if(!revealObserver){
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}

function markSectionsForReveal(){
  document.querySelectorAll(".pcard, .timeline__item, .edu__card, .contactcard, .traintrack__item")
    .forEach((el) => el.classList.add("reveal"));
  observeReveals();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderChipLibrary();
  startTypewriter();
  initScrollSpy();
  initMobileMenu();
  markSectionsForReveal();
});
