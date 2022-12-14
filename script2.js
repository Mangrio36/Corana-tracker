const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d58ddb8cfbmsh126e6d03322f2f1p12f43bjsn15cb86d6c87d",
    "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
  },
};

fetch(
  `https://covid-19-statistics.p.rapidapi.com/reports/total?date=${new Date()}`,
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

console.log(new Date());
