function displayTemperatureChange(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML= Math.round (temperature);
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