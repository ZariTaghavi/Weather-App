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

let cityElement = document.querySelector("#city");
let countryElement = document.querySelector("#country");

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

searchForm.addEventListener("submit", getCityData);

let farenheitflag = true;
let celciusflag = true;
function convertToFarenheit(event) {
  event.preventDefault();
  if (farenheitflag) {
    let temperature = document.querySelector("h2");
    let temperatureValue = temperature.innerText;
    temperatureValue = Number(temperatureValue);
    let farenheit = Math.round(temperatureValue * 1.8 + 32);
    temperature.innerHTML = farenheit;
  }
  farenheitflag = false;
  celciusflag = true;
}
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", convertToFarenheit);

function convertToCelcius(event) {
  if (celciusflag) {
    event.preventDefault();
    let temperature = document.querySelector("h2");
    let temperatureValue = temperature.innerText;
    temperatureValue = Number(temperatureValue);
    let celcius = Math.round(((temperatureValue - 32) * 5) / 9);
    temperature.innerHTML = celcius;
  }
  celciusflag = false;
  farenheitflag = true;
}
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", convertToCelcius);
