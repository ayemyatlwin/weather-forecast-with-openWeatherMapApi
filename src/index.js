function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "be81f193e065bf5feb2d944c7336968b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }

  function formatDay(timestamp){
    let date= new Date(timestamp*1000);
    let day=date.getDay();
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[day];
  }

function displayForecast(response) {
    let forecast=response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = `<div class="row d-flex justify-content-center mt-5">`;
    let days = ["tue", "wed", "thu", "fri", "sat", "sun"];
    forecast.forEach(function (forecastDay,index) {
     if(index<6){
        forecastHtml =
        forecastHtml +
        `
          <div class="col-6 col-md-4 text-center p-2 shadow-sm col-lg-2 border border-1 border-primary-subtle rounded-3 ">
            <h5 class="text-capitalize">${formatDay(forecastDay.dt)}</h5>
            <img src="https://www.openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="">
            <p class="text-black-50">
            <span>${forecastDay.temp.max} °C</span>
            | 
            <span>${forecastDay.temp.min} °C</span>
            </p>
          </div>
        `;
     }
    });
    forecastHtml = forecastHtml + `</div>`;
    forecastElement.innerHTML = forecastHtml;
  }



function showTemperature(response) {
  //console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let FtemperatureElement = document.querySelector("#fTemp");
  let CtemperatureElement = document.querySelector("#cTemp");
  let description = document.querySelector("#temperature_description");
  let icon = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  let temperature_description = response.data.weather[0].description;
  temperatureElement.innerHTML = `${temperature}`;
  CtemperatureElement.addEventListener("click", tempFunc);
  FtemperatureElement.addEventListener("click", tempFunc2);
  function tempFunc() {
    temperatureElement.innerHTML = `${temperature}`;
  }
  function tempFunc2() {
    //console.log("clicked F");
    let fahValue = Math.round(temperature * 1.8 + 32);
    temperatureElement.innerHTML = fahValue;
  }
  description.innerHTML = `${temperature_description}`;
  icon.setAttribute(
    "src",
    `https://www.openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //response.data.weather[0].icon

  let wind = response.data.wind.speed;
  let windSpeed = Math.round(wind * 2.24);
  let details = document.querySelector("#wind");
  details.innerHTML = `Wind: ${windSpeed} mph`;

  let humidity = response.data.main.humidity;
  let rain = document.querySelector("#rain");
  rain.innerHTML = ` Humidity: ${humidity}%`;

   getForecast(response.data.coord)
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "f67c81bfa6f5fe2ca42362f49d8bfa77";
  let city = document.querySelector("#input").value;
  let unit = "metric";
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
let btn = document.querySelector("#search-btn");
btn.addEventListener("click", searchCity);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let h2 = document.querySelector("h2");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;



