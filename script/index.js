let now = new Date();

function formatDate(todayDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[todayDate.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let currentDate = `${day} ${hours}:${minutes}`;
  return currentDate;
}

let displayDate = document.querySelector("#date");
displayDate.innerHTML = formatDate(new Date());

function showTemp(response) {
  let temp = document.querySelector("#temperature");
  let currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${currentTemp}°C`;
}

//search
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#exampleInputEmail1");
  let city = document.querySelector("#location");
  let cityName = searchInput.value;
  city.innerHTML = `${searchInput.value}`;
  let apiKey = "95dbaccedbcba740ac2e91f17611d9d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
function showCurrentLocation(response) {
  let tempLocation = document.querySelector("#temperature");
  let currentLocation = document.querySelector("#location");
  let temp = Math.round(response.data.main.temp);

  tempLocation.innerHTML = `${temp}°C`;
  currentLocation.innerHTML = response.data.name;
}
function currentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "95dbaccedbcba740ac2e91f17611d9d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentLocation);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
