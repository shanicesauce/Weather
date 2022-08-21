var locationInput = document.querySelector("#city")
var userForm = document.querySelector("#user-form")
var citySearched = document.querySelector("#citySearch");
var weatherScreen = document.querySelector(".jumbotron")
var tempInfoEl = document.querySelector("#tempInfo")

var temp = document.querySelector("#temp")
var wind  = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var uvIndex = document.querySelector("#uvIndex")


var getWeatherInfo = function(cityName){
    var weatherApi= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ea9debdf1302fc125a8fd532959350aa&units=imperial"
    fetch(weatherApi) 
    .then (function(response) {
        if (response.ok){
        response.json().then(function(data) {
        displayCitySearch(data,cityName);
        });
        } else {
        alert ("Error: Location Not Found")
        }
    })
              
    console.log(weatherApi); 
};

var submitBtn = function(event) {
    event.preventDefault();
    var location = locationInput.value.trim();
    if (location) {
        getWeatherInfo(location);
        locationInput.value = "";
    }
    else {
        alert ("Please enter a location");
    }
    console.log(event);
}
userForm.addEventListener("submit",submitBtn)

var displayCitySearch = function(city){
    if (city.length === 0){
        weatherScreen.textContent = "No location found.";
        return;
    }
    var searchTime = city.dt * 1000;
    var dateObject = new Date(searchTime)
    var date = dateObject.toLocaleString ()

    console.log(date);
    var selectedCity = city.name + " " + date
   var cityTemp = city.main.temp
   var cityWindSpeed = city.wind.speed
   var cityWindDirection = city.wind.deg
   var cityHumidity = city.main.humidity
//    var cityUVIndex =

    citySearched.textContent = selectedCity;
    temp.textContent= "Temp: " + cityTemp;
    wind.textContent= "Wind: Speed = " +cityWindSpeed + " Deg: " + cityWindDirection +"°";
    humidity.textContent=  "Humidity: " + cityHumidity


}
