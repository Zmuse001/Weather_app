$(document).ready(function(){
    $("#search").click(function(){
        var baseURL = "https://api.openweathermap.org/data/2.5/weather?"
        var apiKey = config.MY_KEY;
        var location = $("#location").val();
        let isNum = /\d/;
        const isSearchNum = isNum.test(location);
        var searchKey = "";
        if(isSearchNum){
            searchKey = "zip";
        }else{
            searchKey = "q";
        }
        var apiUrl = `${baseURL}${searchKey}=${location}&APPID=${apiKey}&units=imperial`;
        // console.log(apiUrl);
        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function(data){
                // console.log(data);
                if (data.cod === 200){
                    let weatherInfo = `<h2>Weather in ${data.name}, ${data.sys.country}</h2>`;
                    //toFixed(2) returns the first two digits
                    weatherInfo += `<p>Temperature: ${data.main.temp.toFixed(2)} °F</p>`;
                    weatherInfo += `<p>Weather: ${data.weather[0].description}</p>`;
                    weatherInfo += `<p>Humidity: ${data.main.humidity}%</p>`;
                    weatherInfo += `<p>Wind Speed: ${data.wind.speed}mph</p>`;
                    $("#weather-info").html(weatherInfo);
                    $("#error-message").empty();
                }else {
                    $("#weather-info").empty();
                    $("#error-message").text("Location not found. Please check the mame or zip")
                }
            },
            error: function(xhr, status, error){
                let err = xhr.responseJSON;
                let errCode = err.cod;
                let errMessage = err.message;
                // console.log(errCode + errMessage);
                $("#weather-info").empty();
                $("#error-message").text(`${errCode}: Network error. ${errMessage}`);
            }
        })
    })
})