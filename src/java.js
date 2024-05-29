function displayTemperatureChange(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let iconElement = document.querySelector("#icon");


    //iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="weather-app-icon"`
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    speedElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML= Math.round (temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />
`;
}

function formatDate (date){
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",  
        "Monday", 
        "Tuesday", 
        "wednesday", 
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days [date.getDay()];

    if (minutes < 10 ){
        minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes},`
}


function searchCity(city){
    let apiKey = "43b3d2a62713f3o1f02c2d24tea00254";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperatureChange);
}

function handleSearchForm (event){
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-form-input");
    
    searchCity(searchInputElement.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchForm);

searchCity("London");

function displayForecast() {
  let days = ["Tue","Wed"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-date">
                ${day}
              </div>
              <div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" width="42"
                  alt="" />
              </div>
              <div class="weather-forecast-temperatures">

                <span class="weather-forecast-temperature-max">
                  18°
                </span>

                <span class="weather-forecast-temperature-min">
                  12°
                </span>
              </div>
            </div>
          </div>
     `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();