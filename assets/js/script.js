var apiKey = '871609c38c37e30a4a9d514a96883f59'
var city = ''
var input = document.getElementById('myInput')
var test
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
var pastSearchContainer = document.getElementById('past-searches')

function getInputValue(){
  var userInput = document.querySelector('#myInput').value
  console.log(userInput)

  var searchList = document.createElement('ul')
   if (getInputValue){
     //add <li>userInput</li> as item within searchList
     add(userInput)
   }
  pastSearchContainer.append(searchList)


  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=imperial`
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
      .then(function (data1) {
        console.log(data1);
        test = data1

        var currentTemp = data1.main.temp
        currentTempEl.textContent = currentTemp

        var currentWind = data1.wind.speed
        currentWindEl.textContent = currentWind

        var currentHum = data1.main.humidity
        currentHumEl.textContent = currentHum

        function secondCall(lat,lon){
          var lat = data1.coord.lat
          var lon = data1.coord.lon
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
              .then(function (data2) {
                console.log(data2);
                var currentUvi = data2.current.uvi
                currentUviEl.textContent = currentUvi

          //console.log(lat,lon)
          for (var i = 0; i < 5; i++) {

            //console.log(data.daily[i])
            console.log(data2.daily[i])
            // create new element
            var cardEl = document.createElement('div')
            // give the new element content
            cardEl.innerHTML = `
            <h2>${moment().add((i+1),'d').format('l')}</h2>
            <span>${data2["daily"][i].temp.day}</span>
            <span>${data2["daily"][i].wind_speed}</span>
            <span>${data2["daily"][i].humidity}</span>
            <span>${data2["daily"][i].uvi}</span>
            <img src="the address of the weather img" />
            `;

            // put the new element on the page
            weeklyWeatherContainer.append(cardEl)
        }
        })
        }
        secondCall()
      });
  }



