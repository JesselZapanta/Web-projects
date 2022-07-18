
let current_date = document.querySelector(".current-date");
let currentTime = document.querySelector(".time");
let searchCity = document.querySelector(".search-input");
let searchBtn = document.querySelector("#search-btn");
let weatherOverview = document.querySelector('.weather-overview');
let weatherResult = document.querySelector(".main");

setInterval(() => {
    let date = new Date();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    y = date.getFullYear();
    mm = months[date.getMonth()];
    d = days[ date.getDay()];
    dt = date.getDate();
    h = date.getHours();
    m = date.getMinutes();
    ampm = "AM";

    if(h >= 12){
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h < 10 ? "0" + h : h;
    m < 10 ? "0" + m : m;

    current_date.innerText = `${d} : ${mm} ${dt} , ${y}`;
    currentTime.innerText =`${h} : ${m} ${ampm}`;
}, 1000);

function convertTime(milliseconds,) {
    return moment(milliseconds*1000).format('hh:mm');
}


key = "e49ed6b4598f64971415d2d9cd214246";

let getWeather = () => {
    let cityValue = searchCity.value;

    console.log(cityValue);
    if(cityValue.length == 0){
        weatherOverview.innerHTML = `<h6 class="error">Enter a City</h6>`;
    } else {
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
        searchCity.value = "";
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            weatherOverview.innerHTML =  `
            <h4>Todays Overview</h4>
            <div class="overview-container">
                <div class="overview-content wind">
                    <i class="fa-solid fa-wind"></i>
                    <div class="info">
                        <h2>Wind Speed</h2>
                        <h1 class="wind-speed">${data.wind.speed} km/h</h1>
                    </div>
                </div>
                <div class="overview-content rain">
                    <i class="fa-solid fa-cloud-rain"></i>
                    <div class="info">
                        <h2>Rain Chance</h2>
                        <h1 class="rain-chance">24%</h1>
                    </div>
                </div>
                <div class="overview-content pressure">
                    <i class="fa-solid fa-water"></i>
                    <div class="info">
                        <h2>Pressure</h2>
                        <h1 class="pressure">${data.main.pressure} hpa</h1>
                    </div>
                </div>
                <div class="overview-content uv">
                    <i class="fa-solid fa-sun"></i>
                    <div class="info">
                        <h2>Humidity</h2>
                        <h1 class="humidity">${data.main.humidity}</h1>
                    </div>
                </div>
            </div>
            `;
            weatherResult.innerHTML = `
            <div class="city-container">
                <h2 class="city">${data.name}</h2>
                <h3>${data.sys.country}</h3>
            </div>
            <div class="icon-cantainer">
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" id="icon" class="icon">
        </div>
        <div class="weather-info">
            <div class="weather-container">
                <div class="temp container">
                    <small>Temperature</small>
                    <h2 class="temperature">${data.main.temp}°C</h2>
                </div>
                <div class="description container">
                    <small>Weather</small>
                    <h2 class="description">${data.weather[0].main}</h2>
                </div>
            </div>
            <div class="min-max-temp-container">
                <div class="min container">
                    <small>min temp</small>
                    <h2 class="min-temp">${data.main.temp_min}°C</h2>
                </div>
                <div class="max container">
                    <small>max temp</small>
                    <h2 class="max-temp-temp">${data.main.temp_max}°C</h2>
                </div>
            </div>
        </div>
        <h5>Sunset & Sunrise</h5>
        <div class="sun-container">
            <i class="fa-solid fa-cloud-sun"></i>
                <div class="info">
                    <h2>Sunrise</h2>
                    <h1 class="sunrise">${convertTime(data.sys.sunrise)} AM</h1>
                </div>
        </div>
        <div class="sun-container">
            <span class="material-symbols-sharp">wb_twilight</span>
                <div class="info">
                    <h2>Sunset</h2>
                    <h1 class="sunset">${convertTime(data.sys.sunset)} PM</h1>
                </div>
        </div>
            `;
        })
        .catch(() => {
            weatherOverview.innerHTML = `<h6 class="error">City Not Found</h6>`;
        })
    }
};

window.addEventListener("load", getWeather);
searchBtn.addEventListener("click", getWeather);

