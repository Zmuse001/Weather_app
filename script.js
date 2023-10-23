$(document).ready(function(){
    function temperatureConverter(valNum) {
        valNum = parseFloat(valNum);
        var far = (Math.floor(valNum-273.15)*1.8)+32;
        return far
      }
    var baseURL = "https://api.openweathermap.org/data/2.5/weather"
    var apiKey = config.MY_KEY
    $("#search").click(function(){
        var location = $("#location").val();
        $.ajax({
            url: `${baseURL}?q=${location}&appid=${apiKey}`,
            method: "GET",
            success: function(data){
                console.log(data)
                $("#weather-info").text(`Temperature: ` + temperatureConverter(data.main.temp) + " Degrees Fahrenheit")
                $("#weather-info2").text(`Weather: ${data.weather[0].main}`)
                $("#weather-info3").text(`Conditions: ${data.weather[0].description}`)
                $("#weather-info4").text(`Humdity: ${data.main.humidity}`)
                $("#weather-info5").text(`Wind-speed: ${data.wind.speed} mph`)
            },
            error: function(error){
                $("#error-message").text("Network error: please try again." + error);
            }
             
        });
    })
});