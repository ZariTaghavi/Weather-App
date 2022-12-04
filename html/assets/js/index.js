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
