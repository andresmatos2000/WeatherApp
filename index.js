//Current Weather
document.getElementById("weatherSubmit").addEventListener("click", function(event){
    const API_KEY = "5a378c01a0dab996b5d14260e434fcac";
    event.preventDefault();
    const value = document.getElementById("weatherSearch").value;
    if (value === "")
      return;
    console.log(value);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`;
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      displayCurrent(json);
    });
})
const iconHelp = (arr) => {
  if (arr.length == 0){
    return;
  }
  let holder = [];
  let max_temp = 0;
  let min_temp = arr[0].temperature;
  let date = arr[0].date;
  for(let i = 0; i < 8; i++){
    if(arr[i].temperature > max_temp){
      max_temp = arr[i].temperature;
    }
    if(arr[i].temperature < min_temp ){
      min_temp = arr[i].temperature;
    }
    holder.push(arr[i].icon);
  }
  let common = iconPush(holder)
  forecastArray.push({date, icon: common, max_temp, min_temp});
  arr.splice(0,8);
  iconHelp(arr);
  console.log(forecastArray);
};
function iconPush(arr){
  return arr.sort((a,b) =>
        arr.filter(v => v===a).length
      - arr.filter(v => v===b).length
  ).pop();
}

function isOdd(n) {
  return Math.abs(n % 2) == 1;
}
//5 Day / 3 Hour
let clickCount = 0;
let forecastArray = [];
let icons = [];
document.getElementById("fiveDaySubmit").addEventListener("click", function(event){
  clickCount++;
  if (!isOdd(clickCount)){
    document.getElementById("forecastResults").style.display = "none";
  }else{
    document.getElementById("forecastResults").style.display = "flex";

  }
  
  const API_KEY = "5a378c01a0dab996b5d14260e434fcac";
  event.preventDefault();
  const value = document.getElementById("weatherSearch").value;
  if (value === "")
    return;
  console.log(value);
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${API_KEY}`;
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let forecast = "";
      for (let i=0; i < json.list.length; i++) {
        if(i == 0 || i == 9 || i == 17 || i == 25 || i == 33)forecast += "<div class='row'>";

        icons.push({ date: moment(json.list[i].dt_txt).format('MMM Do'), icon: json.list[i].weather[0].icon, temperature: Math.ceil((json.list[i].main.temp - 273.15) * 9/5 + 32)});

        forecast += "<h2 class='col-12 col-sm-6 '>" + moment(json.list[i].dt_txt).format('MMM Do YYYY, h a') + "</h2>";
        forecast += "<p class='col-12 text-left text-sm-right col-sm-6' data-value='temperature'>Temperature: " + Math.ceil((json.list[i].main.temp - 273.15) * 9/5 + 32); + "</p>";
	      forecast += '<img class="" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
        if(i == 8 || i == 16 || i == 24 || i == 32 || i == 40) forecast += "</div>";
      }
      document.getElementById("forecastResults").innerHTML = forecast;
      iconHelp(icons);

  });
})

const displayCurrent = (data) => {
  
  let description = data.weather[0].description;
  let main = data.main;
  let temperature = Math.ceil((main.temp - 273.15) * 9/5 + 32);
  let minTemp = Math.ceil((main.temp_min - 273.15) * 9/5 + 32);
  let maxTemp = Math.ceil((main.temp_max - 273.15) * 9/5 + 32);
  let humidity = main.humidity;
  let wind_speed = data.wind.speed;
  let wind_direction = getDirection(data.wind.deg);
  let location = data.name;

  document.getElementById("Location").innerText = location;
  document.getElementById("Description").innerHTML = `${description}<br>Wind Speed ${wind_speed} mph <br>Wind Direction ${wind_direction}<br>Humidity ${humidity}%`;
  document.getElementById("Temperature").innerHTML = `${minTemp}<span>&#176</span>/${maxTemp}<span>&#176</span>`;
  
  document.getElementById("weatherIcon").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  document.getElementById("weatherResults").style.display = "flex";
}


const getDirection = (degree) => {
  if(degree > 15 && degree < 75)
  return "North East";
  else if (degree >= 75 && degree <= 105 )
  return "East";
  else if (degree > 105 && degree < 165)
  return "South East"
  else if (degree >=165 && degree <= 195)
  return "South"
  else if (degree > 195 && degree < 255)
  return "South West"
  else if (degree >= 255 && degree <= 285)
  return "West"
  else if (degree > 285 && degree < 345)
  return "North West"
  else if (degree >= 345 || degree <= 15)
  return "North"
};


document.querySelectorAll("p[data-value='temperature']")[1].innerText.substring(13)

