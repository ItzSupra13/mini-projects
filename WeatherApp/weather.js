const apiKey = "09caa63c06c81d83c618eabd511c8ace";
let city;
let apiUrl;
let typeofWeather;
let input = document.getElementById("searchit");

async function getWeather() {
    
    const data = await fetch(apiUrl).then(res => res.json()).catch(err => console.error(err));
    document.querySelector(".weather").style.display = "flex";
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity h3").innerHTML = data.main.humidity + "%";
    document.querySelector(".windspeed h3").innerHTML = data.wind.speed + "km/h";

    typeofWeather = data.weather[0].main;
    let weatherIcon = document.querySelector("#weather-icon");
    if (typeofWeather === "Clear") {
        weatherIcon.src = "weather-app-img/images/clear.png";
    } else if (typeofWeather === "Clouds") {
        weatherIcon.src = "weather-app-img/images/clouds.png";
    } else if (typeofWeather === "Rain") {
        weatherIcon.src = "weather-app-img/images/rain.png";
    } else if (typeofWeather === "Snow") {
        weatherIcon.src = "weather-app-img/images/snow.png";
    } else if (typeofWeather === "Mist") {
        weatherIcon.src = "weather-app-img/images/mist.png";
    } else if (typeofWeather === "Drizzle") {
        weatherIcon.src = "weather-app-img/images/drizzle.png";
    } else if (typeofWeather === "Thunderstorm") {
        weatherIcon.src = "weather-app-img/images/rain.png";
    }
    console.log(data);
}

document.querySelector("button").addEventListener("click", () => {
    city = document.querySelector("#searchit").value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    getWeather();
});

// Get the input field

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("button").click();
  }
});