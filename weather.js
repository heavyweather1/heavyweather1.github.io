const JoJo = document.querySelectorAll('.city');
const conditionReport = document.querySelector('.condition');
const nameReport = document.querySelector('.name');
const search = document.querySelector('.search');
const dateReport = document.querySelector('.date');
const timeReport = document.querySelector('.time');
const humidityReport = document.querySelector('.humidity');
const windReport = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const weatherButton = document.querySelector('.submit');
const report = document.querySelector('.weather-report');
const molnReport = document.querySelector('.cloud');
const weatherTemp = document.querySelector('.temperature');

let cityInput = "Gothenburg";

JoJo.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    JoJo.style.opacity = "0";
  });
})

form.addEventListener('submit', (e) => {
  if(search.value.trim() === '') {
    alert('Please type in a city name');
  } else {
    cityInput = search.value.trim();
    fetchWeatherData();
    search.value = '';
    report.style.opacity = '0';
  }
  
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};



function fetchWeatherData() {
fetch(`https://api.weatherapi.com/v1/current.json?key=e0c1a083d9094ababd0211848210510&q=${cityInput}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    weatherTemp.innerHTML = data.current.temp_c + "&#176;";
    conditionReport.innerHTML = data.current.condition.text;
    


    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const d = parseInt(date.substr(5, 2));
    const m = parseInt(date.substr(8, 2));
    const time = date.substr(11); 
    

    dateReport.innerHTML = `${dayOfTheWeek(d, m, y)}, ${m} ${y}`;
    timeReport.innerHTML = time;
    nameReport.innerHTML = data.location.name;    
    
    molnReport.innerHTML = data.current.cloud + "%";
    humidityReport.innerHTML = data.current.humidity + "%";
    windReport.innerHTML = data.current.wind_kph + "km/h";
    
    let timeOfDay = "day";
    const code = data.current.condition.code; 
    
    if(!data.current.is_day) {
      timeOfDay = "night";
    } 
    
    if (code === 1000) {
      report.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
      weatherButton.style.background = timeOfDay === "night" ? "#181e27" : "#e5ba92";
    } else if (
      code === 1003 ||
      code === 1006 ||
      code === 1009 ||
      code === 1030 ||
      code === 1069 ||
      code === 1087 ||
      code === 1135 ||
      code === 1273 ||
      code === 1276 ||
      code === 1279 ||
      code === 1282
    ) {
      report.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      weatherButton.style.background = timeOfDay === "night" ? "#181e27" : "#fa6d1b";
    } else if (
      code === 1063 ||
      code === 1069 ||
      code === 1072 ||
      code === 1150 ||
      code === 1153 ||
      code === 1180 ||
      code === 1183 ||
      code === 1186 ||
      code === 1189 ||
      code === 1192 ||
      code === 1195 ||
      code === 1204 ||
      code === 1207 ||
      code === 1240 ||
      code === 1243 ||
      code === 1246 ||
      code === 1249 ||
      code === 1252 
    ) {
      report.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      weatherButton.style.background = timeOfDay === "night" ? "#325c80" : "#647d75";
    } else {
      report.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      weatherButton.style.background = timeOfDay === "night" ? "#1b1b1b" : "#4d72aa";
    }

    report.style.opacity = "1";
  })


  .catch(() => {
    alert('Weather Report was not found.');
    report.style.opacity = "1";
  });
}

fetchWeatherData();

report.style.opacity = "1";