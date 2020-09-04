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
let degree = document.querySelector("#degree");
let degrees = document.querySelectorAll("span.degrees");
console.log(degrees);
let buttonCelsius = document.querySelector("#button-celsius");
let buttonFahrenheit = document.querySelector("#button-fahrenheit");
let currentTemperature = document.querySelector("#temperature");
let tomorrow = document.querySelector("#tomorrow");
let tomorrow1 = document.querySelector("#tomorrow1");
let tomorrow2 = document.querySelector("#tomorrow2");
let tomorrow3 = document.querySelector("#tomorrow3");
let tomorrow4 = document.querySelector("#tomorrow4");
let tomorrowTemp = document.querySelector("#tomorrowTemp");
let tomorrow1Temp = document.querySelector("#tomorrow1Temp");
let tomorrow2Temp = document.querySelector("#tomorrow2Temp");
let tomorrow3Temp = document.querySelector("#tomorrow3Temp");
let tomorrow4Temp = document.querySelector("#tomorrow4Temp");

function fahrenheitCalc(event) {
  event.preventDefault();
  let fahrenheit = Math.round(temperature.innerHTML * 1.8 + 32);
  let fahrenheitTom = Math.round(tomorrowTemp.innerHTML * 1.8 + 32);
  let fahrenheitTom1 = Math.round(tomorrow1Temp.innerHTML * 1.8 + 32);
  let fahrenheitTom2 = Math.round(tomorrow2Temp.innerHTML * 1.8 + 32);
  let fahrenheitTom3 = Math.round(tomorrow3Temp.innerHTML * 1.8 + 32);
  let fahrenheitTom4 = Math.round(tomorrow4Temp.innerHTML * 1.8 + 32);
  if (degree === "F") {
    event.preventDefault();
  } else {
    temperature.innerHTML = `${fahrenheit}`;
    tomorrowTemp.innerHTML = `${fahrenheitTom}`;
    tomorrow1Temp.innerHTML = `${fahrenheitTom1}`;
    tomorrow2Temp.innerHTML = `${fahrenheitTom2}`;
    tomorrow3Temp.innerHTML = `${fahrenheitTom3}`;
    tomorrow4Temp.innerHTML = `${fahrenheitTom4}`;
    degree.innerHTML = "F";
    degrees[0].innerHTML = "F";
    degrees[1].innerHTML = "F";
    degrees[2].innerHTML = "F";
    degrees[3].innerHTML = "F";
    degrees[4].innerHTML = "F";
  }
}

buttonFahrenheit.addEventListener("click", fahrenheitCalc);

function celsiusCalc(event) {
  event.preventDefault();
  let celsius = Math.round((temperature.innerHTML - 32) / 1.8);
  let celsiusTom = Math.round((tomorrowTemp.innerHTML - 32) / 1.8);
  let celsiusTom1 = Math.round((tomorrow1Temp.innerHTML - 32) / 1.8);
  let celsiusTom2 = Math.round((tomorrow2Temp.innerHTML - 32) / 1.8);
  let celsiusTom3 = Math.round((tomorrow3Temp.innerHTML - 32) / 1.8);
  let celsiusTom4 = Math.round((tomorrow4Temp.innerHTML - 32) / 1.8);
  if (degree === "C") {
    event.preventDefault();
  } else {
    temperature.innerHTML = `${celsius}`;
    tomorrowTemp.innerHTML = `${celsiusTom}`;
    tomorrow1Temp.innerHTML = `${celsiusTom1}`;
    tomorrow2Temp.innerHTML = `${celsiusTom2}`;
    tomorrow3Temp.innerHTML = `${celsiusTom3}`;
    tomorrow4Temp.innerHTML = `${celsiusTom4}`;
    degree.innerHTML = "C";
    degrees[0].innerHTML = "C";
    degrees[1].innerHTML = "C";
    degrees[2].innerHTML = "C";
    degrees[3].innerHTML = "C";
    degrees[4].innerHTML = "C";
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

function showWeatherHere(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  currentTemperature.innerHTML = `${temperature}`;
  let location = document.querySelector("h2");
  location.innerHTML = `${place}`;
  let apiKey = "e04e51dd1592166f33d5c79d198d4731";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecastHere);
}

function showForecastHere(response) {
  console.log(response.data);
  let tomorrowDate = response.data.list[7].dt_txt;
  let tomorrowTemperature = Math.round(response.data.list[7].main.temp);
  tomorrow.innerHTML = `${tomorrowDate}`;
  tomorrowTemp.innerHTML = `${tomorrowTemperature}`;
  let tomorrow1Date = response.data.list[15].dt_txt;
  let tomorrow1Temperature = Math.round(response.data.list[15].main.temp);
  tomorrow1.innerHTML = `${tomorrow1Date}`;
  tomorrow1Temp.innerHTML = `${tomorrow1Temperature}`;
  let tomorrow2Date = response.data.list[23].dt_txt;
  let tomorrow2Temperature = Math.round(response.data.list[23].main.temp);
  tomorrow2.innerHTML = `${tomorrow2Date}`;
  tomorrow2Temp.innerHTML = `${tomorrow2Temperature}`;
  let tomorrow3Date = response.data.list[31].dt_txt;
  let tomorrow3Temperature = Math.round(response.data.list[31].main.temp);
  tomorrow3.innerHTML = `${tomorrow3Date}`;
  tomorrow3Temp.innerHTML = `${tomorrow3Temperature}`;
  let tomorrow4Date = response.data.list[39].dt_txt;
  let tomorrow4Temperature = Math.round(response.data.list[39].main.temp);
  tomorrow4.innerHTML = `${tomorrow4Date}`;
  tomorrow4Temp.innerHTML = `${tomorrow4Temperature}`;
}

function apply(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#your-city");
  searchNow(cityInput.value);
  searchFuture(cityInput.value);
}
function searchNow(city) {
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

function searchFuture(city) {
  let apiKey = "e04e51dd1592166f33d5c79d198d4731";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityForecast);
}

function displayCityForecast(response) {
  console.log(response.data);
  let tomorrowDate = response.data.list[7].dt_txt;
  let tomorrowTemp = Math.round(response.data.list[7].main.temp);
  tomorrow.innerHTML = `<br /> ${tomorrowDate}<br /> ${tomorrowTemp}°C`;
  let tomorrow1Date = response.data.list[15].dt_txt;
  let tomorrow1Temp = Math.round(response.data.list[15].main.temp);
  tomorrow1.innerHTML = `<br /> ${tomorrow1Date}<br /> ${tomorrow1Temp}°C`;
  let tomorrow2Date = response.data.list[23].dt_txt;
  let tomorrow2Temp = Math.round(response.data.list[23].main.temp);
  tomorrow2.innerHTML = `<br /> ${tomorrow2Date}<br /> ${tomorrow2Temp}°C`;
  let tomorrow3Date = response.data.list[31].dt_txt;
  let tomorrow3Temp = Math.round(response.data.list[31].main.temp);
  tomorrow3.innerHTML = `<br /> ${tomorrow3Date}<br /> ${tomorrow3Temp}°C`;
  let tomorrow4Date = response.data.list[39].dt_txt;
  let tomorrow4Temp = Math.round(response.data.list[39].main.temp);
  tomorrow4.innerHTML = `<br /> ${tomorrow4Date}<br /> ${tomorrow4Temp}°C`;
}

let searchButton = document.querySelector("#button-addon1");

searchButton.addEventListener("click", apply);

let backToYou = document.querySelector("#back-to-you");

function currentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}
backToYou.addEventListener("click", currentPosition);
