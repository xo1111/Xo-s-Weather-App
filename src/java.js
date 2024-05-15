function handleSearchSubmit (event){
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city-name")
    cityElement.innerHTML = searchInputElement.value;
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);