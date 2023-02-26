//Get all necessary elements from the DOM
const cloudOutput = document.querySelector('.cloud');
const temp = document.querySelector('.temp');
const conditionOutput = document.querySelector('.condition');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const icon = document.querySelector('.icon');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const nameOutput = document.querySelector('.name');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const app = document.querySelector('.weather-app');
const cities = document.querySelectorAll('.city');

// Staden som kommer att laddas in först på sidan
let cityInput = "Gothenburg";

cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
  });
})

//Add submit event to the form
form.addEventListener('submit', (e) => {
  if(search.value.trim() === '') {
    alert('Please type in a city name');
  } else {
    cityInput = search.value.trim();
    fetchWeatherData();
    search.value = '';
    app.style.opacity = '0';
  }
  
  e.preventDefault();
});


/*Function that returns a day of the week 
(Monday, Tuesday, Friday...) from a date (12 03 2021)
We will use this function later*/
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
    
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;
    

    /* Get the date and time from the city and extract 
    the day, month, year and time into individual variables*/
    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const d = parseInt(date.substr(5, 2));
    const m = parseInt(date.substr(8, 2));
    const time = date.substr(11); 
    
    /*Reformat the date into somehing more 
    appealing and add it to the page*/
    /*Original format: 2021-10-09 17:53*/
    /*New Format: 17:53 - Friday 9, 10 2021*/
    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
    timeOutput.innerHTML = time;
    /*Add the name of the city into the page*/
    nameOutput.innerHTML = data.location.name;
    /*Get the corresponding icon url for 
    the weather and extract a part of it*/
    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    

    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)}, ${m} ${y}`;
    timeOutput.innerHTML = time;
    nameOutput.innerHTML = data.location.name;

    
    cloudOutput.innerHTML = data.current.cloud + "%";
    humidityOutput.innerHTML = data.current.humidity + "%";
    windOutput.innerHTML = data.current.wind_kph + "km/h";
    
    let timeOfDay = "day";
    const code = data.current.condition.code; 
    
    if(!data.current.is_day) {
      timeOfDay = "night";
    } 
    
    if (code === 1000) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
      btn.style.background = timeOfDay === "night" ? "#181e27" : "#e5ba92";
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
      app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      btn.style.background = timeOfDay === "night" ? "#181e27" : "#fa6d1b";
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
      app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      btn.style.background = timeOfDay === "night" ? "#325c80" : "#647d75";
    } else {
      app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      btn.style.background = timeOfDay === "night" ? "#1b1b1b" : "#4d72aa";
    }
    //Fade in the page once all is done
    app.style.opacity = "1";
  })

  /*If the user types a city that doesn't exist, 
  throw an alert*/
  .catch(() => {
    alert('Weather Report was not found.');
    app.style.opacity = "1";
  });
}

//Call the function on page load
fetchWeatherData();

//Fade in the page
app.style.opacity = "1";
  



