var apiKey = '871609c38c37e30a4a9d514a96883f59'
var city = 'portland'
var input = document.getElementById('myInput')
//current day DOM elements
var currentTempEl = document.getElementById('current-temp')
var currentWindEl = document.getElementById('current-wind')
var currentHumEl = document.getElementById('current-humidity')
var currentUviEl = document.getElementById('current-uvi')
//weekly forecast DOM elements
var weeklyTempEl = document.getElementById('weekly-temperature')
var weeklyWindEl = document.getElementById('current-wind')
var weeklyHumEl = document.getElementById('current-humidity')
var weeklyUviEl = document.getElementById('current-uvi')

var weeklyWeatherContainer = document.getElementById('weekly-weather')

function getApi() {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(apiUrl)
      .then(function (response) {
        console.log(response.status);
        //  Conditional for the the response.status.
        if (response.status !== 200) {
          // Place the response.status on the page.
          console.log(response.status)
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var currentTemp = data.main.temp
        currentTempEl.textContent = currentTemp

        var currentWind = data.wind.speed
        currentWindEl.textContent = currentWind

        var currentHum = data.main.humidity
        currentHumEl.textContent = currentHum

        function secondCall(lat,lon){
          var lat = data.coord.lat
          var lon = data.coord.lon
          var apiUrl2 = `https:api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
            fetch(apiUrl2)
            .then(function (response) {
              console.log(response.status);
              //  Conditional for the the response.status.
              if (response.status !== 200) {
                // Place the response.status on the page.
                console.log(response.status)
              }
              return response.json();
            })
              .then(function (data) {
                console.log(data);
                var currentUvi = data.current.uvi
                currentUviEl.textContent = currentUvi

          console.log(lat,lon)
        })
        }
        secondCall()

        console.log(data)

        for (i = 0; i < 5; i++) {

            console.log(data.daily[i])
            // create new element
            var cardEl = document.createElement('div')
            // give the new element content
            cardEl.innerHTML = `
            <h2>This is the day</h2>
            <span>${data.daily[i].temp.day}</span>
            <span>${data.daily[i].wind_speed}</span>
            <span>${data.daily[i].humidity}</span>
            <span>${data.current[i].uvi}</span>
            <img src="the address of the weather img" />
            `;

            // put the new element on the page
            weeklyWeatherContainer.append(cardEl)
        }
      });
  }

getApi()
