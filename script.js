const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-500px",
  }
);
obs.observe(sectionHeroEl);

const sidebar = document.querySelector(".sidebar");
const sidebar1 = document.querySelector(".sidebar1");
const sidebar2 = document.querySelector(".sidebar2");
const sidebar4 = document.querySelector(".sidebar4");
const sidebar3 = document.querySelector(".sidebar3");
const prev = document.querySelector(".prev");
const home = document.querySelector(".home");
const covid = document.querySelector(".covid");
const about = document.querySelector(".about");

home.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar1.style.display = "none";
  sidebar2.style.display = "none";
  sidebar4.style.display = "none";
  sidebar3.style.display = "block";
});
prev.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar1.style.display = "block";
  sidebar2.style.display = "none";
  sidebar4.style.display = "none";
  sidebar3.style.display = "none";
});
covid.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar2.style.display = "block";
  sidebar1.style.display = "none";
  sidebar4.style.display = "none";
  sidebar3.style.display = "none";
});
about.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar2.style.display = "none";
  sidebar1.style.display = "none";
  sidebar4.style.display = "block";
  sidebar3.style.display = "none";
});
