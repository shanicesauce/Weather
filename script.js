var locationInput = document.querySelector("#city")
var userForm = document.querySelector("#user-form")
var citySearched = document.querySelector("#citySearch")
var weatherScreen = document.querySelector(".jumbotron")
var tempInfoEl = document.querySelector("#tempInfo")
var forecastEl = document.querySelector("#forecast")
var unhideEl = document.querySelector("#unhide")

var temp = document.querySelector("#temp")
var wind  = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var uvIndex = document.querySelector("#uvIndex")
var firstCard = document.querySelector("#one")
var secondCard = document.querySelector("#two")
var thirdCard = document.querySelector("#three")
var forthCard = document.querySelector("#four")
var fifthCard = document.querySelector("#five")




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
        console.log(weatherApi);
    }) 


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
    var date = dateObject.toLocaleString ([],{year:'numeric', month:'long',day:'2-digit'})

    console.log(date);
    var selectedCity = city.name + " " + date
   var cityTemp = city.main.temp
   var cityWindSpeed = city.wind.speed
   var cityHumidity = city.main.humidity  

    citySearched.textContent = selectedCity;
    temp.textContent= "Temp: " + cityTemp + "°F";
    wind.textContent= "Wind:" +cityWindSpeed + " Mph";
    humidity.textContent=  "Humidity: " + cityHumidity + "%"

    var longtitude = city.coord.lon;
    var latitude = city.coord.lat;

    var uvIndexApi = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude+ "&lon=" + longtitude +"&appid=82c7060fd4a42e933ec2ef18954a1566"
    fetch(uvIndexApi).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                var cityUVIndex = data.value
                uvIndex.textContent = "UV Index: " + cityUVIndex
                if (cityUVIndex >= 8 ){
                    uvIndex.classList.add("danger")
                    uvIndex.classList.remove("okay")
                    uvIndex.classList.remove("safe")
                } else if (cityUVIndex >= 4) {
                    uvIndex.classList.add("okay")
                    uvIndex.classList.remove("danger")
                    uvIndex.classList.remove("safe")
                }
                else {
                    uvIndex.classList.add("safe")
                    uvIndex.classList.remove("okay")
                    uvIndex.classList.remove("danger")
                }
                console.log(cityUVIndex);
            })

        }
       
    })
    console.log(uvIndexApi);

    var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longtitude + "&appid=2832b4456bf8bca726dc6e8b7c3bb492&units=imperial";
    fetch(forecastApi) 
    .then (function(response){
        if (response.ok){
            response.json().then(function(data){  
                unhideEl.classList.remove("hide")
                forecastEl.classList.remove("hide")
                var minitemp = document.createElement("p")
                var miniwind = document.createElement("p")
                var minihumidity = document.createElement("p")


                var oneDay = data.list[3].dt * 1000;
                var oneObject = new Date(oneDay)
                var one = oneObject.toLocaleString ([],{year:'numeric', month:'long',day:'2-digit'})

                firstCard.textContent= one;
                minitemp.textContent= "Temp: " + data.list[3].main.temp + "°F"
                miniwind.textContent= "Wind:" + data.list[3].wind.speed + " Mph"
                minihumidity.textContent= "Humidity: " + data.list[3].main.humidity + "%"

                firstCard.appendChild(minitemp)
                firstCard.appendChild(miniwind)
                firstCard.appendChild(minihumidity)

                var minitemptwo = document.createElement("p")
                var miniwindtwo = document.createElement("p")
                var minihumiditytwo = document.createElement("p")


                var dosDay = data.list[11].dt * 1000;
                var dosObject = new Date(dosDay)
                var dos = dosObject.toLocaleString ([],{year:'numeric', month:'long',day:'2-digit'})

                secondCard.textContent= dos;
                minitemptwo.textContent= "Temp: " + data.list[11].main.temp + "°F"
                miniwindtwo.textContent= "Wind:" + data.list[11].wind.speed + " Mph"
                minihumiditytwo.textContent= "Humidity: " + data.list[11].main.humidity + "%"

                secondCard.appendChild(minitemptwo)
                secondCard.appendChild(miniwindtwo)
                secondCard.appendChild(minihumiditytwo)

                var minitempthree = document.createElement("p")
                var miniwindthree = document.createElement("p")
                var minihumiditythree = document.createElement("p")


                var tresDay = data.list[19].dt * 1000;
                var tresObject = new Date(tresDay)
                var tres = tresObject.toLocaleString ([],{year:'numeric', month:'long',day:'2-digit'})

                thirdCard.textContent= tres;
                minitempthree.textContent= "Temp: " + data.list[19].main.temp + "°F"
                miniwindthree.textContent= "Wind:"+ data.list[19].wind.speed + " Mph "
                minihumiditythree.textContent= "Humidity: " + data.list[19].main.humidity + "%"

                thirdCard.appendChild(minitempthree)
                thirdCard.appendChild(miniwindthree)
                thirdCard.appendChild(minihumiditythree)

                var minitempfour = document.createElement("p")
                var miniwindfour = document.createElement("p")
                var minihumidityfour = document.createElement("p")


                var fourDay = data.list[27].dt * 1000;
                var fourObject = new Date(fourDay)
                var four = fourObject.toLocaleString ([],{year:'numeric', month:'long',day:'2-digit'})

                forthCard.textContent= four;
                minitempfour.textContent= "Temp: " + data.list[27].main.temp + "°F"
                miniwindfour.textContent= "Wind:"+ data.list[27].wind.speed + " Mph "
                minihumidityfour.textContent= "Humidity: " + data.list[27].main.humidity + "%"

                forthCard.appendChild(minitempfour)
                forthCard.appendChild(miniwindfour)
                forthCard.appendChild(minihumidityfour)

                var minitempfive = document.createElement("p")
                var miniwindfive = document.createElement("p")
                var minihumidityfive = document.createElement("p")


                var fiveDay = data.list[35].dt * 1000;
                var fiveObject = new Date(fiveDay)
                var five = fiveObject.toLocaleString ([],{year:'numeric', month:'long',day:'2-digit'})

                fifthCard.textContent= five;
                minitempfive.textContent= "Temp: " + data.list[35].main.temp + "°F"
                miniwindfive.textContent= "Wind:" + data.list[35].wind.speed + " Mph "
                minihumidityfive.textContent= "Humidity: " + data.list[35].main.humidity + "%"

                fifthCard.appendChild(minitempfive)
                fifthCard.appendChild(miniwindfive)
                fifthCard.appendChild(minihumidityfive)

                console.log(forecastApi);
            })
        }
    })
}
