function formatWeekday(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[time.getDay()]}`;
}

function formatClock(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

let now = new Date();
let todayTime = document.querySelector("#today-time");
todayTime.innerHTML = `${formatWeekday(now)}, ${formatClock(now)}`;

let weatherApiKey = `3c949ba49d38be2487ee278e0d2d4059`;
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

let unitValue = "metric";

let searchForm = document.querySelector("form");
let searchInput = document.querySelector("#search-input");
let celciusLink = document.querySelector("#celcius");
let farenheitLink = document.querySelector("#farenheit");
let currentLocationButton = document.querySelector("#current-location");
let updateLink = document.querySelector("#update");

let cityElement = document.querySelector("#city");
let countryElement = document.querySelector("#country");
let temperatureElement = document.querySelector("h2");
let descriptionElement = document.querySelector("#weather-description");
let precipitationElement = document.querySelector("#precipitation");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let uvIndexElement = document.querySelector("#uv-index");
let windSpeedUnitElement = document.querySelector("#wind-speed-unit");

function updateTime(time) {
  todayTime.innerHTML = `${formatWeekday(time)}, ${formatClock(time)}`;
}

function showWeatherData(response) {
  let timeValue = new Date();
  let temperatureValue = Math.round(response.data.main.temp);
  let descriptionValue = response.data.weather[0].description;
  let humidityValue = Math.round(response.data.main.humidity);
  let windSpeedValue = Math.round(response.data.wind.speed);
  updateTime(timeValue);
  temperatureElement.innerHTML = `${temperatureValue}`;
  descriptionElement.innerHTML = `${descriptionValue}`;
  precipitationElement.innerHTML = `not available`;
  humidityElement.innerHTML = `${humidityValue} %`;
  windSpeedElement.innerHTML = `${windSpeedValue}`;
  uvIndexElement.innerHTML = `not available`;
}

function showWeatherUnit(weatherUnit) {
  if (weatherUnit === "metric") {
    celciusLink.classList.add("active");
    farenheitLink.classList.remove("active");
    windSpeedUnitElement.innerHTML = `m/s`;
  } else {
    celciusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    windSpeedUnitElement.innerHTML = `mph`;
  }
}

function getWeatherData(cityName, unit) {
  let cityWeatherUrl = `${weatherApiUrl}q=${cityName}&appid=${weatherApiKey}&units=${unit}`;
  axios.get(cityWeatherUrl).then(showWeatherData);
  showWeatherUnit(unit);
}

function showCityData(response) {
  let countryNameValue = response.data.sys.country;
  let cityNameValue = response.data.name;
  cityElement.innerHTML = `${cityNameValue}`;
  countryElement.innerHTML = `${countryNameValue}`;
  unitValue = "metric";
  getWeatherData(cityNameValue, unitValue);
}

function getCityData(event) {
  event.preventDefault();
  let cityInput = searchInput.value;
  cityInput = cityInput.trim().toLowerCase();
  let cityWeatherUrl = `${weatherApiUrl}q=${cityInput}&appid=${weatherApiKey}`;
  axios.get(cityWeatherUrl).then(showCityData);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let cityNameValue = cityElement.innerText;
  unitValue = "imperial";
  getWeatherData(cityNameValue, unitValue);
}

function convertToCelcius(event) {
  event.preventDefault();
  let cityNameValue = cityElement.innerText;
  unitValue = "metric";
  getWeatherData(cityNameValue, unitValue);
}

function getLocationData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let cityWeatherUrl = `${weatherApiUrl}lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;
  axios.get(cityWeatherUrl).then(showCityData);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocationData);
}

function getUpdateData(event) {
  event.preventDefault();
  let cityNameValue = cityElement.innerText;
  unitValue = "metric";
  getWeatherData(cityNameValue, unitValue);
}

searchForm.addEventListener("submit", getCityData);
celciusLink.addEventListener("click", convertToCelcius);
farenheitLink.addEventListener("click", convertToFarenheit);
currentLocationButton.addEventListener("click", getLocation);
updateLink.addEventListener("click", getUpdateData);
