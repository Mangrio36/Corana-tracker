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

// global Stats
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
    const deaths = data.data.deaths;
    const active = data.data.active;
    const confirm = data.data.confirmed;
    const numbers = document.querySelector(".numbers");
    numbers.innerText = confirm;
    const recover = document.querySelector(".recover");
    recover.innerText = active;
    const dead = document.querySelector(".dead");
    dead.innerText = deaths;
    const updated = document.querySelector(".updated");
    updated.innerText = data.data.last_update;
    const lastUpdate = document.getElementById("update");
    lastUpdate.innerText = data.data.last_update;
  })
  .catch((err) => console.error(err));

const optns = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d58ddb8cfbmsh126e6d03322f2f1p12f43bjsn15cb86d6c87d",
    "X-RapidAPI-Host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
  },
};

fetch(
  "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Pakistan/pak",
  optns
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const newDeath = document.getElementById("newdeaths");
    const newCases = document.getElementById("newcases");
    const country = document.getElementById("country");
    const deathss = document.getElementById("deaths");
    const casess = document.getElementById("cases");
    casess.innerText = data[0].TotalCases;
    country.innerText = data[0].Country;
    deathss.innerText = data[0].TotalDeaths;
    newDeath.innerText = data[0].NewDeaths;
    newCases.innerText = data[0].Population;
  })
  .catch((err) => console.error(err));

const searchData = document.querySelector(".searchdata");
const btn = document.querySelector(".btn");
const form = document.querySelector(".form");

// stats of countries on search
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchText = searchData.value;

  fetch(`https://covid-19-statistics.p.rapidapi.com/regions`, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const countriesIso = [];

      for (i = 0; i < data.data.length; i++) {
        if (searchText === data.data[i].name) {
          count = data.data[i].iso;
          countriesIso.push(count);
        }
      }
      console.log(countriesIso);
      fetch(
        `https://covid-19-statistics.p.rapidapi.com/reports?iso=${countriesIso}`,
        options
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let countryName = data.data[0].region.name;
          const country = document.getElementById("country");
          country.innerText = countryName;
          let totalCase = 0;
          for (i = 0; i < data.data.length; i++) {
            totalCase += parseInt(data.data[i].active);
          }
          const casess = document.getElementById("cases");
          casess.innerText = totalCase;
          let totaldeath = 0;
          for (i = 0; i < data.data.length; i++) {
            totaldeath += parseInt(data.data[i].deaths);
          }
          const deathss = document.getElementById("deaths");
          deathss.innerText = totaldeath;

          const lastUpdate = document.getElementById("update");
          lastUpdate.innerText = data.data[0].last_update;
        })
        .catch((err) => console.error(err));

      const optons = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d58ddb8cfbmsh126e6d03322f2f1p12f43bjsn15cb86d6c87d",
          "X-RapidAPI-Host":
            "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
        },
      };

      fetch(
        "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered",
        optons
      )
        .then((response) => response.json())
        .then((data) => {
          const countries = [];
          console.log(countries);
          countriesIsoLowercase = countriesIso[0].toLowerCase();

          for (i = 0; i < data.length; i++) {
            if (countriesIsoLowercase === data[i].ThreeLetterSymbol) {
              count = data[i].Country;
              countries.push(count);
            }
          }
          fetch(
            `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${countries}/${countriesIsoLowercase}`,
            optons
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const newDeath = document.getElementById("newdeaths");
              const newCases = document.getElementById("newcases");
              newDeath.innerText = data[0].NewDeaths;
              newCases.innerText = data[0].Population;
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

fetch(`https://covid-19-statistics.p.rapidapi.com/regions`, options)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const countries = [];

    for (i = 0; i < data.data.length; i++) {
      count = data.data[i].name;
      countries.push(count);
    }

    autocomplete(searchData, countries);
    function autocomplete(inp, arr) {
      var currentFocus;

      inp.addEventListener("input", function (e) {
        var a,
          b,
          i,
          val = this.value;

        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");

            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);

            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

            b.addEventListener("click", function (e) {
              inp.value = this.getElementsByTagName("input")[0].value;

              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });

      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;

          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;

          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
      });
      function addActive(x) {
        if (!x) return false;

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;

        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }

      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    }
  })
  .catch((err) => console.error(err));

// sidebar data

const countryConfirm = document.querySelector(".country-confirm");
const countryNames = document.querySelector(".countryname");
const countryRecovered = document.querySelector(".countrt-recovered");
const countryDeaths = document.querySelector(".countrt-death");

const optons = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d58ddb8cfbmsh126e6d03322f2f1p12f43bjsn15cb86d6c87d",
    "X-RapidAPI-Host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
  },
};

fetch(
  "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/",
  optons
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    for (i = 0; i < data.length; i++) {
      const div = document.createElement("p");
      div.innerText = data[i].Country;
      countryNames.appendChild(div);
      const ele = document.createElement("p");
      ele.innerText = data[i].TotalCases;
      countryConfirm.appendChild(ele);
      const elel = document.createElement("p");
      elel.innerText = data[i].TotalDeaths;
      countryDeaths.appendChild(elel);
      const ell = document.createElement("p");
      ell.innerText = data[i].TotalRecovered;
      countryRecovered.appendChild(ell);
      div.addEventListener("click", () => {
        console.log(div.innerText);

        fetch(
          "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered",
          optons
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            for (i = 0; i < data.length; i++) {
              if (div.innerText === data[i].Country) {
                const iso = data[i].ThreeLetterSymbol;
                console.log(iso);
                anb(div.innerText, iso);
              }
            }
          })
          .catch((err) => console.error(err));
      });
    }
  })
  .catch((err) => console.error(err));

// sidebar click on country to get data
const anb = (kami, iso) => {
  fetch(
    `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${kami}/${iso}`,
    optons
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const newDeath = document.getElementById("newdeaths");
      const newCases = document.getElementById("newcases");
      const country = document.getElementById("country");
      const deathss = document.getElementById("deaths");
      const casess = document.getElementById("cases");
      casess.innerText = data[0].TotalCases;
      country.innerText = data[0].Country;
      deathss.innerText = data[0].TotalDeaths;
      newDeath.innerText = data[0].NewDeaths;
      newCases.innerText = data[0].Population;
    })
    .catch((err) => console.error(err));
};
