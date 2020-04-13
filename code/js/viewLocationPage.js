
// Code for the View Location page.
loadLocations()
// This is sample code to demonstrate navigation.
// You need not use it for final app.
var map;
var date = new Date()
var simpledate = date.simpleDateString()
var forecastdate =  date.forecastDateString()

document.getElementById("Date").innerHTML = simpledate


//var cacheData = JSON.parse(localStorage.getItem(APP_PREFIX));
// To load the location
var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
var myLocation = new_location.locationAtIndex(locationIndex)
//console.log(myLocation)

    // If a location name was specified, use it for header bar title.
    document.getElementById("headerBarTitle").textContent = myLocation.nickname;

// console.log(new_location.lat)
 console.log(new_location.locationAtIndex(locationIndex))


function centreOnLocation()                    //Centers marker on use selected entry
{
   var current_latitude = new_location.locationAtIndex(locationIndex).lat
   var current_longitude = new_location.locationAtIndex(locationIndex).long
   var Latlng = {lat: current_latitude, lng: current_longitude}
    
    map = new google.maps.Map(document.getElementById('map'), {
                center: Latlng,
                zoom: 15
            });
                              
     var infoWindow = new google.maps.InfoWindow({map: map,
                                                  content: myLocation.nickname})  
     infoWindow.setPosition(Latlng)

     map.setCenter(new google.maps.LatLng(current_latitude,current_longitude))
    
}

function sliderValueChange()     //Changes date value on slider user input
{
 var value = document.getElementById("slider").value 
    var date = new Date(); //create slider with dates
    date =  new Date(date.getTime()- ((30-value) * 24 * 3600 * 1000));
    //date = date - ((30-value) * 24 * 3600 * 1000);
    console.log(date)
    
    simpledate = date.simpleDateString();
    console.log(simpledate)
    forecastdate = date.forecastDateString();
    //console.log(simpledate)
   // console.log(timevalue)
    document.getElementById("Date").innerHTML = simpledate;
//document.getElementById("DateF").innerHTML = forecastdate
    console.log(forecastdate)
    printout()
 
}

function printout()                     //Call weather callback function from cache and outputs weather information on html page
{
    var weather_info = myLocation.forecasts.date;
    new_location.getWeatherAtIndexForDate(locationIndex, forecastdate, function(index, weather_info){
//        var weather_info = locations[index].forecasts[properties];
        var output = '<br>Weather Summary : ' + weather_info.summary + '</br>';
        output += '<br>Maximum temperature : ' + weather_info.temperatureMax.toFixed(1) +' &#8451</br>';
        output += '<br>Minimum temperature : ' + weather_info.temperatureMin.toFixed(1) +' &#8451</br>';
        output += '<br>Humidity : ' + weather_info.humidity.toFixed(1)*100 +'%</br>';
        output += '<br>Wind Speed : ' + weather_info.windSpeed +'m/s</br><br></br>';
        document.getElementById('weather_info').innerHTML = output;
        document.getElementById("weather").innerHTML = "Weather for " 
        console.log(weather_info);
    })
}

printout();

// Printing information
    /*document.getElementById("summary").innerHTML = 'Summary: ' + weather_info.data[0].summary;
    document.getElementById("minTemp").innerHTML = 'Minimum temperature: ' + weather_info.data[0].temperatureMin;
    document.getElementById("maxTemp").innerHTML = 'Maximum temperature: ' + weather_info.data[0].temperatureMax;
    document.getElementById("humidity").innerHTML = 'Humidity: ' + weather_info.data[0].humidity;
    document.getElementById("windSpeed").innerHTML = 'Wind speed: ' + weather_info.data[0].windSpeed;*/



console.log(document.getElementById("slider").value)


// To remove locations
function removeLocation()
{
    new_location.removeLocationAtIndex(locationIndex);
    location.href = "index.html"
}



/*
function getWeatherInfo(latitude, longitude, time){
        var response = 'https://api.forecast.io/forecast/63616fe6bcc35d5d36e05efe6ecc0ec8/'
        response += latitude + ',' + longitude + ',' + time
        response = response + '?callback=?'
        var url = document.createElement('script')
//        url.src = response;
//        document.body.appendChild(url);
        //var test;
        $.getJSON(response, function(data){
            return data;
        })
        }

*/

//getWeatherInfo(myLocation.lat, myLocation.long, forecastdate)