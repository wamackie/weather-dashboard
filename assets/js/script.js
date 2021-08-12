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

var entry = document.createElement('li')

var pastSearches = {}

//clear past search
function clearSearch (){
  var pastSearches 
}

function pastSearchDisplay (){
  //clearSearch()
  pastSearchContainer.textContent = '';
  for (var search in pastSearches){
    weeklyWeatherContainer.textContent = '';
    console.log(search)
    var pastSearchButton = document.createElement('button')
    //add click functionality getInputValue(button text)
    pastSearchButton.setAttribute ('content', search);
    pastSearchButton.textContent = search;
    pastSearchContainer.append(pastSearchButton)
  } 
  
}

function getInputValue(pastSearch){
  document.getElementById("current-weather").style.visibility = "visible";
  clearSearch()
  if(pastSearch){userInput = pastSearch}
  else{
  var userInput = document.querySelector('#myInput').value}

  pastSearches[userInput]=(userInput);

  // var searchList = document.createElement('ul')
  //  if (getInputValue){
  //    document.createElement('li')
  //    add(userInput)
  //  }
  // pastSearchContainer.append(searchList)


  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=imperial`
    fetch(apiUrl)
      .then(function (response) {
        //  Conditional for the the response.status.
        if (response.status !== 200) {
          // Place the response.status on the page.
        }
        return response.json();
      })
      .then(function (data1) {
        //test = data1
        console.log(data1)

        var currentTemp = data1.main.temp
        currentTempEl.textContent = currentTemp

        var currentWind = data1.wind.speed
        currentWindEl.textContent = currentWind

        var currentHum = data1.main.humidity
        currentHumEl.textContent = currentHum

        function secondCall(lat,lon){
          var lat = data1.coord.lat
          var lon = data1.coord.lon
          var apiUrl2 = `https:api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
            fetch(apiUrl2)
            .then(function (response) {
              //  Conditional for the the response.status.
              if (response.status !== 200) {
                // Place the response.status on the page.
              }
              return response.json();
            })
              .then(function (data2) {
                var currentUvi = data2.current.uvi
                currentUviEl.textContent = currentUvi

          //console.log(lat,lon)
          for (var i = 0; i < 5; i++) {
            // create new element
            var cardEl = document.createElement('div'); cardEl.className='weatherBox'
            // give the new element content
            cardEl.innerHTML = `
            <h4>${moment().add((i+1),'d').format('dddd')}</h4>
            <h4>${moment().add((i+1),'d').format('l')}</h4>
            <p id=pBox>Temperature: ${data2["daily"][i].temp.day}</p>
            <p id=pBox>Wind Speed: ${data2["daily"][i].wind_speed}</p>
            <p id=pBox>Humidity: ${data2["daily"][i].humidity}</p>
            <p id=pBox>UV Index: ${data2["daily"][i].uvi}</p>
            `;
            console.log(data2)
            console.log(data1)

            // put the new element on the page
            weeklyWeatherContainer.append(cardEl)
        }
        })
        }
        secondCall()
      });
    pastSearchDisplay();
  }



//<img src="the address of the weather img" />