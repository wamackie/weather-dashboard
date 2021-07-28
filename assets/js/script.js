var apiKey = '871609c38c37e30a4a9d514a96883f59'
var lat = 40.71
var lon = 74.01
var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
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
        var currentUvi = data.current.uvi;
        currentUviEl.textContent = currentUvi
        for (i = 0; i < data.daily.length; i++) {
            console.log(data.daily[i])
            var cardEl = document.querySelectorAll(`[data-id=${i}]`)
            cardEl.textContent = data.daily[i].temp
        }
      });
  }



getApi(apiUrl)
