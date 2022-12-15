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

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d58ddb8cfbmsh126e6d03322f2f1p12f43bjsn15cb86d6c87d",
    "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
  },
};

fetch("https://covid-19-statistics.p.rapidapi.com/reports/total", options)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const deaths = data.data.deaths;
    console.log(deaths);
    const active = data.data.active;
    console.log(active);
    const confirm = data.data.confirmed;
    const numbers = document.querySelector(".numbers");
    numbers.innerText = confirm;
    const recover = document.querySelector(".recover");
    recover.innerText = active;
    const dead = document.querySelector(".dead");
    dead.innerText = deaths;
  })
  .catch((err) => console.error(err));

const country = document.querySelector(".country");
const countryConfirm = document.querySelector(".country-confirm");
const countryRecovered = document.querySelector(".countrt-recovered");
const countryDeaths = document.querySelector(".countrt-death");

fetch("https://covid-19-statistics.p.rapidapi.com/regions", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
fetch("https://covid-19-statistics.p.rapidapi.com/provinces?iso=PAK", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

fetch(
  "https://covid-19-statistics.p.rapidapi.com/reports?region_province=Islamabad&iso=PAK",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
