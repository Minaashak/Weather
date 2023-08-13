let locationSearch = document.getElementById("locationSearch"); 
let response = [];

// !---API
async function getApi(location="cairo") {
  let https = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=e55cbaffa4e5469ea68174134231308&q=${location}&days=3`
  );
  response = await https.json();
  showData();
  nextWeatherDay();
  afterWeatherDay();
}
getApi();

// !----Function
// First Day
function showData() {
  let today = new Date()
  let col = ``;
  col += `
    <div class="head d-flex justify-content-between">
        <p class="lead"> ${today.toLocaleDateString("en-us", {
          weekday: "long",
        })} </p>
        <p class="lead"> ${today.getDate()} ${today.toLocaleDateString(
    "en-us",
    { month: "long" }
  )}  </p>
    </div>
    <div class="card-body text-center">
        <h4 class="card-title">${response.location.name}</h4>
        <h1 class="card-text">28<sup>o</sup>C <img class="" src="https:${
          response.current.condition.icon
        }" alt="about-weather"></h1>
        <p class="text-primary">${response.current.condition.text}</p>
    </div>
    <div class="icons d-flex ">
        <p class="me-4"><i class="fa-solid fa-umbrella p-2"></i> ${
          response.current.wind_degree
        } %</p>
        <p class="me-3"><i class="fa-solid fa-wind p-2"></i> ${
          response.current.wind_kph
        } km/h</p>
        <p><i class="fa-solid fa-compass p-2"></i> ${response.current.wind_dir} </p>
    </div>
    `;
  document.getElementById("card").innerHTML = col;
}

// Next Day

function nextWeatherDay() {
  let firstDay = ``;
  for (let i = 0; i < 1; i++) {
    let nextDay = new Date(response.forecast.forecastday[i + 1].date);
    firstDay += `
    <div class="head ">
        <p class="lead"> ${nextDay.toLocaleDateString("en-us", {
          weekday: "long",
        })} </p>
    </div>
    <div class>
        <img src="https:${
          response.forecast.forecastday[i + 1].day.condition.icon
        }" alt="about-weather">
        <h3>${
          response.forecast.forecastday[i + 1].day.maxtemp_c
        } <sup>o</sup>C</h3>
        <p>${
          response.forecast.forecastday[i + 1].day.mintemp_c
        }<sup>o</sup>C</p>
        <p class="text-primary">${
          response.forecast.forecastday[i + 1].day.condition.text
        }</p>
    </div>
    `;
  }
  document.getElementById("nextDay").innerHTML = firstDay;
}

// After Next Day
function afterWeatherDay() {
  let thirdDay = ``;
  for (let i = 0; i < 1; i++) {
    let thirdDate = new Date(response.forecast.forecastday[i + 2].date);
    thirdDay += `
    <div class="head ">
        <p class="lead">${thirdDate.toLocaleDateString("en-us", {
          weekday: "long",
        })}</p>
    </div>
    <div class>
        <img src="https:${
          response.forecast.forecastday[i + 2].day.condition.icon
        }" alt="about-weather">
        <h3>${
          response.forecast.forecastday[i + 2].day.maxtemp_c
        }<sup>o</sup>C</h3>
        <p>${
          response.forecast.forecastday[i + 2].day.mintemp_c
        }<sup>o</sup>C</p>
        <p class="text-primary">${
          response.forecast.forecastday[i + 2].day.condition.text
        }</p>
    </div>
    `;
  }
  document.getElementById("afterNextDay").innerHTML = thirdDay;
}


// !-----Serach

locationSearch.addEventListener("input" , function(){
  getApi(locationSearch.value);
})
