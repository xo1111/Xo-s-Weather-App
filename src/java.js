function displayTemperatureChange(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  //iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="weather-app-icon"`
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />
`;
  getForecast(response.data.city);

}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
  let apiKey = "43b3d2a62713f3o1f02c2d24tea00254";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperatureChange);
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");

  searchCity(searchInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchForm);

function formatDay(timestamp){
  let date = new Date (timestamp *1000);
  let days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];

  return days [date.getDay()];
}


function getForecast(city) {
  let apiKey = "43b3d2a62713f3o1f02c2d24tea00254";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}


function displayForecast(response) {
  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {

    if (index < 5){
      forecastHtml =
        forecastHtml +
        `
      <div>
        <div class="weather-forecast-date">
         ${formatDay(day.time)}
        </div>
        <div>
          <img src= ${day.condition.icon_url} class="weather-forecast-icon"/>
        </div>
        <div class="weather-forecast-temperatures">
        
          <span class="weather-forecast-temperature-max">
            ${Math.round(day.temperature.maximum)}°
          </span>
        
          <span class="weather-forecast-temperature-min">
            ${Math.round(day.temperature.minimum)}°
          </span>
        </div>
      </div>
     `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("London");

