var apiKey = '871609c38c37e30a4a9d514a96883f59'
var lat = 74.01
var lon = 40.71
var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
var currentTempEl = document.getElementById('current-temp')
var currentWindEl = document.getElementById('current-wind')
var currentHumEl = document.getElementById('current-humidity')
var currentUviEl = document.getElementById('current-uvi')

function getApi(url) {
    fetch(url)
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
        // Make sure to look at the response in the console and read how 404 response is structured.
        console.log(data);
        console.log(data.current);
        console.log(data.current.temp);
        console.log(data.current.humidity);
        console.log(data.current.wind_speed);
        console.log(data.current.uvi);

        var currentTemp = data.current.temp
        currentTempEl.textContent = currentTemp

        var currentWind = data.current.wind_speed
        currentWindEl.textContent = currentWind

        var currentHum = data.current.humidity
        currentHumEl.textContent = currentHum

        var currentUvi = data.current.uvi;
        currentUviEl.textContent = currentUvi

        for (i = 0; i < 5; i++) {
            console.log(data.daily[i])
            var cardEl = document.getElementById(`data-id-${i}`)
            cardEl.innerHTML = data.daily[i].temp
        }
      });
  }



getApi(apiUrl)

//document.querySelectorAll("[data-foo='1']")
//data.daily.length