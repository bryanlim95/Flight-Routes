var browserSupportFlag =  new Boolean(); // Boolean function to indicate geolocation support for browser
var properties = {}


//document.getElementById("headerBarTitle").textContent = "Current Location"

var map;
var cityCircle;
var infoWindow

function initialize() {                                     // Function that is called everytime the page is loaded to initialize map postion and 
  var myOptions = {                                         // weather data
    zoom: 15,
  };
 
  map = new google.maps.Map(document.getElementById("map"), myOptions)     
  ;    

navigator.geolocation.getCurrentPosition(function(position)   // Geolocation function
   {
  var currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
    
    
    infoWindow = new google.maps.InfoWindow({map: map,
                                                content: "You are Here!"})  
     infoWindow.setPosition(currentPosition)
  
    cityCircle = new google.maps.Circle({                        // Draw accuracy circle around centred point
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: currentPosition,
      radius: 100
    });
    
      map.setCenter(currentPosition);
    
// Set variables for weather callback
        var date  = new Date;
        var forecastdate = date.forecastDateString();
        var simpledate = date.simpleDateString();

        var APIKEY = "63616fe6bcc35d5d36e05efe6ecc0ec8";
        var properties =  lat + "," + lng + "," + forecastdate;
        var url = "https://api.forecast.io/forecast/" + APIKEY + "/"+ properties + "?units=si&callback=getLocalWeather";
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
        document.getElementById('Date').innerHTML = simpledate
        document.getElementById('weather').innerHTML = 'Local Weather for' 

      
      }

  )}


var watchOptions =       //Options for watchOptions argument 
{
        enableHighAccuracy: true,
        maximumAge: 28000,
        timeout: 20000
};

function watchError (error)
{
    console.log("Error:" + error.message)
    
}
        

    
     // map.setCenter(currentPosition);
    
// Set variables for weather callback
function callWeather(lat, lng){
        var date  = new Date;
        var forecastdate = date.forecastDateString();
        var simpledate = date.simpleDateString();

        var APIKEY = "63616fe6bcc35d5d36e05efe6ecc0ec8";
        var properties =  lat + "," + lng + "," + forecastdate;
        var url = "https://api.forecast.io/forecast/" + APIKEY + "/"+ properties + "?units=si&callback=getLocalWeather";
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
        document.getElementById('Date').innerHTML = simpledate
        document.getElementById('weather').innerHTML = 'Local Weather for' 
   
}
      


    var check_lat = 0, check_lng = 0;
    
function getLocalWeather(response)      // Outputs weather information 
    {
        var output = '<br>Weather Summary : ' + response.daily.data[0].summary + '</br>';
        output += '<br>Maximum temperature : ' + response.daily.data[0].temperatureMax.toFixed(1) +' &#8451</br>';
        output += '<br>Minimum temperature : ' + response.daily.data[0].temperatureMin.toFixed(1) +' &#8451</br>';
        output += '<br>Humidity : ' + response.daily.data[0].humidity.toFixed(1)*100 +'%</br>';
        output += '<br>Wind Speed : ' + response.daily.data[0].windSpeed +'m/s</br><br></br>';
        document.getElementById('weather_info').innerHTML = output;
        
        //Saving current location data to a different prefix 
        var AP_PREFIX = "currentWeatherData"
        var weatherData =  {
            MinTemp : response.daily.data[0].temperatureMin.toFixed(1),
            MaxTemp : response.daily.data[0].temperatureMax.toFixed(1),
            Icon :  response.daily.data[0].icon
        }
        var weatherDataJSON= JSON.stringify(weatherData)
        localStorage.setItem(AP_PREFIX,weatherDataJSON)
    
    //Recalling watchPosition     
       navigator.geolocation.watchPosition(function (position){
           console.log(position);
           var currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
           if(check_lat != currentPosition.lat || check_lng != currentPosition.lng)
               {
                   callWeather(currentPosition.lat, currentPosition.lng);
                   console.log("working!")
               }
           check_lat = currentPosition.lat
           check_lng = currentPosition.lng
           infoWindow.setMap(null)
           infoWindow = new google.maps.InfoWindow({map: map,
                                                content: "You are Here!"})  
     infoWindow.setPosition(currentPosition)
     cityCircle.setMap(null)
      cityCircle = new google.maps.Circle({                        // Draw accuracy circle around centred point
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.25,
      map: map,
      center: currentPosition,
      radius: 100
    });
      
     
       }, watchError,watchOptions)          // Arguments for watchPosition
       
    }
    

