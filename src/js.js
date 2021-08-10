let now = new Date();
let date = document.querySelector("#current-date");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];
let numberDay = now.getDate();
let year = now.getFullYear();
date.innerHTML = `${currentDay} ${numberDay} ${currentMonth} ${year}`;

let time = document.querySelector("#current-time");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hour}:${minutes}`;

// function changeUnitTemperatureC(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#number-temperature");
//   let farValue = temp.innerHTML;
//   let celsius = ((farValue - 32) * 5) / 9;
//   temp.innerHTML = celsius;
// }

// function changeUnitTemperatureF(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#number-temperature");
//   let celValue = temp.innerHTML;
//   let farenheit = (celValue * 9) / 5 + 32;
//   temp.innerHTML = farenheit;
// }

// let unitInfoC = document.querySelector("#celsius-degrees-link");
// unitInfoC.addEventListener("click", changeUnitTemperatureC);

// let unitInfoF = document.querySelector("#farenheit-degrees-link");
// unitInfoF.addEventListener("click", changeUnitTemperatureF);

function displayWeatherCondition(response) {
  document.querySelector("#city-selected").innerHTML = response.data.name;
  document.querySelector("#number-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  console.log(response.data);
  console.log(response.data.main.temp);
  console.log(response.data.name);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "9e38b432e6a4b2912f3775e17cf35501";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
searchCity("Melbourne");

let searchCityForm = document.querySelector("#city-form");
searchCityForm.addEventListener("submit", handleSubmit);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "9e38b432e6a4b2912f3775e17cf35501";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector("#current-city-botton");
currentLocationButton.addEventListener("click", currentLocation);
