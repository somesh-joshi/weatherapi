var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var i= 0;
var d ='', day='';
var url = "https://api.weatherapi.com/v1/forecast.json";
var key = "8a1362221e524488b3e112953200305";

$(document).ready(function(){
    weather('India');
    $("#mainbody").hide();
    $("#forecasttable").hide();
    $("#loadingbox").show();
});

function weather(city) {
var api = url+'?key='+key+'&q='+city+'&days=3';
$.getJSON(api, function(result) {
        $("#city").html(result.location.name);
        $("#mainbody img").attr("src", 'https:'+result.current.condition.icon);
        $("#temp").html(result.current.temp_c+' °C');
        $("#chanceofrain").html(result.forecast.forecastday[0].day.daily_chance_of_rain+' %');
        $("#cond").html(result.current.condition.text);
        $("#humidity").html(result.current.humidity+' %');
        $("#feel").html(result.current.feelslike_c+' °C');
        $("#wind").html(result.current.wind_kph+' km/h');
        $("#direction").html(result.current.wind_dir);
        $("#update").html(result.current.last_updated);
        $("#mainbody").show();
        for(i=0;i<=2;i++) {
        var date = result.forecast.forecastday[i].date;
        var avgtemp = result.forecast.forecastday[i].day.avgtemp_c+' °C';
        var humidity = result.forecast.forecastday[i].day.avghumidity+' %';
        var rain = result.forecast.forecastday[i].day.daily_chance_of_rain+' %';
        var sunrise = result.forecast.forecastday[i].astro.sunrise;
        var sunset = result.forecast.forecastday[i].astro.sunset;
        var moonrise = result.forecast.forecastday[i].astro.moonrise;
        var moonset = result.forecast.forecastday[i].astro.moonset;
        var summary = result.forecast.forecastday[i].day.condition.text;
        var icon = result.forecast.forecastday[i].day.condition.icon;
        icon = "https:" + icon;
        d = new Date(date);
        day = days[d.getDay()];
        $("#forecastlabel").html('3 Day Forecast for ' + result.location.name);
        $("#forecastlabel").show();
        $("#forecasttable").append(`
        <div id="forecast">
            <div id="top">
            <span id="date">${day}</span>
            <img src="${icon}"><span id="avgtemp">${avgtemp}</span>
            </div>
            <br />
            <span id="summary">${summary}</span>
            <br/>
            <div id="more">
            <span id="label">Chance of Rain: </span><span id="rainchance">${rain}</span>
            </div>
            <div id="more">
            <span id="label">Humidity: </span><span id="avghumidity">${humidity}</span>
            </div>
            <div id="more">
            <span id="label">Sunrise: </span><span id="sunrise">${sunrise}</span>
            </div>
            <div id="more">
            <span id="label">Sunset: </span><span id="sunset">${sunset}</span>
            </div>
            <div id="more">
            <span id="label">Moonrise: </span><span id="moonrise">${moonrise}</span>
            </div>
            <div id="more">
            <span id="label">Moonset: </span><span id="moonset">${moonset}</span>
            </div>
        </div>
        <br>
        <br>
        `);
      }
        $("#loadingbox").hide();
        $("#mainbody").show();
        $("#forecasttable").show();
});
}

$(function() {
    $("#topbar #searchicon").click(function() {
        $("#searchbox").toggle(500);
    });
});

$(document).on("keypress", "input", function(e) {
    if(e.which == 13) {
        $("#searchbox").toggle(500);
        weather($("#searchbox input").val());
        $("#searchbox input").val('');
        $("#forecasttable").html(`<h2 id="forecastlabel"></h2>`);
        $("#mainbody").hide();
        $("#forecasttable").hide();
        $("#loadingbox").show();
    }
});

$(function() {
    $("#searchbox button").click(function() {
        $("#searchbox").toggle(500);
        weather($("#searchbox input").val());
        $("#searchbox input").val('');
        $("#forecasttable").html(`<h2 id="forecastlabel"></h2>`);
        $("#mainbody").hide();
        $("#forecasttable").hide();
        $("#loadingbox").show();
    });
});
