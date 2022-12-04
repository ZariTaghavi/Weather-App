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

function showLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = searchInput.value;
  cityName = cityName.trim().toLowerCase();
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  let city = document.querySelector("#city");
  city.innerHTML = `${cityName}`;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showLocation);

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
