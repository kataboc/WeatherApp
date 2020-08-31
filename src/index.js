let todayDate = document.querySelector("#today-date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
function formatDate() {
  if (minutes < 10) return `${day}, ${date}.${month} ${hour}:0${minutes}`;
  else {
    return `${day}, ${date}.${month} ${hour}:${minutes}`;
  }
}

todayDate.innerHTML = formatDate(new Date());

let temperature = document.querySelector("#temperature");
let degrees = document.querySelector("#degrees");
let buttonCelsius = document.querySelector("#button-celsius");
let buttonFahrenheit = document.querySelector("#button-fahrenheit");
function fahrenheitCalc(event) {
  event.preventDefault();
  let fahrenheit = Math.round(temperature.innerHTML * 1.8 + 32);
  if (degrees === "F") {
    event.preventDefault();
  } else {
    temperature.innerHTML = `${fahrenheit}`;
    degrees.innerHTML = "F";
  }
}

buttonFahrenheit.addEventListener("click", fahrenheitCalc);

function celsiusCalc(event) {
  event.preventDefault();
  let celsius = Math.round((temperature.innerHTML - 32) / 1.8);
  if (degrees === "C") {
    event.preventDefault();
  } else {
    temperature.innerHTML = `${celsius}`;
    degrees.innerHTML = "C";
  }
}
buttonCelsius.addEventListener("click", celsiusCalc);

function myPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e04e51dd1592166f33d5c79d198d4731";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherHere);
}
navigator.geolocation.getCurrentPosition(myPosition);

let currentTemperature = document.querySelector("#temperature");
function showWeatherHere(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  currentTemperature.innerHTML = `${temperature}`;
  let location = document.querySelector("h2");
  location.innerHTML = `${place}`;
}

function apply(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#your-city");
  search(cityInput.value);
}
function search(city) {
  let apiKey = "e04e51dd1592166f33d5c79d198d4731";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityWeather);
}

function displayCityWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  currentTemperature.innerHTML = `${temperature}`;
  let location = document.querySelector("h2");
  location.innerHTML = `${place}`;
}

let searchButton = document.querySelector("#button-addon1");

searchButton.addEventListener("click", apply);

let backToYou = document.querySelector("#back-to-you");

function currentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}
backToYou.addEventListener("click", currentPosition);
