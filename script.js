document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=071f165c3c96f569ecad437ee7ba3297";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let results = "";
            results += '<h2 class="header">Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h3 class="header">Temperature: ' + json.main.temp + " &deg;F</h3>"
            results += '<h3 class="header">Feels Like: ' + json.main.feels_like + " &deg;F</h3>"
            results += '<h3 class="header">Wind Speed: ' + json.wind.speed + " Meter/s</h3>"
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }

            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=071f165c3c96f569ecad437ee7ba3297";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let forecast = "";
        forecast += "<h2 class='header'>Forecast for " + json.city.name + "</h2>"
        forecast += "<div id='forecast-container'>"
        for (let i=0; i < json.list.length; i++) {
            forecast += "<div class='forecast'>"
            forecast += "<h3 class='header'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h3>";
            forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
            forecast += "</div>"
        }
        forecast += "</div>"
        document.getElementById("forecastResults").innerHTML = forecast;
      });
});