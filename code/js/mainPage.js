
// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var listHTML = ""
var APP_PREFIX = "weatherApp"

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}

function currentLocation()
{
   location.href = 'currentlocation.html' ;
    
}

var today = new Date()
var today_forecast = today.forecastDateString();
var locations = JSON.parse(localStorage.getItem(APP_PREFIX))
var output = ""

//check 
for (index = 0 ; index < locations.length ; index++) //check no. of locations and repeat
    {
        var weather_info = new_location.locationAtIndex(index).forecasts.date;
        new_location.getWeatherAtIndexForDate(index, today_forecast, function(index, weather_info){
        createHtmlLayout(index, weather_info);
    })
        
//        document.getElementById('span'+index).textContent = locations[index].nickname
        //console.log(weather_data)
    }


function createHtmlLayout(index, weather_data) //make a function to create buttons
{
   
    
    var new_li = document.createElement("li");
    new_li.setAttribute("class", "mdl-list__item mdl-list__item--two-line");
    new_li.setAttribute('onclick', 'viewLocation(' + index + ')');
    
    var new_span1 = document.createElement('span');
    new_span1.setAttribute('class', "mdl-list__item-primary-content");
    
    var new_icon = document.createElement("img");
    new_icon.setAttribute('class', "mdl-list__item-icon")
    new_icon.setAttribute('id', 'icon'+index)
    new_icon.setAttribute("width","30x30");
    new_icon.setAttribute('src', 'images/' + weather_data.icon + '.png') 
    new_icon.setAttribute('class', "list-avatar" )
    
    
    var new_span2 = document.createElement('span');
    new_span2.setAttribute('id', 'span'+index);
    new_span2.textContent = locations[index].nickname;
    
    var new_span3 = document.createElement('span');
    new_span3.setAttribute('id', 'weather'+index);
    new_span3.setAttribute('class', "mdl-list__item-sub-title")
    new_span3.innerHTML = 'Min : ' + weather_data.temperatureMin.toFixed(1) +'&#8451&nbsp&nbsp&nbsp&nbspMax : ' +  weather_data.temperatureMax.toFixed(1) +"&#8451"
    
    document.getElementById('locationList').appendChild(new_li)
    new_li.appendChild(new_span1);
    new_span1.appendChild(new_icon);
    new_span1.appendChild(new_span2);
    new_span1.appendChild(new_span3);
    

}

/*while (index< locations.length)
    {
output += createHtmlLayout(locations[index])    
document.getElementById('location_index') =  output
    }
*/
//Displaying Current Location weather on index page
var currentTemp =  JSON.parse(localStorage.getItem("currentWeatherData"))
var currentMinTemp = currentTemp.MinTemp
var currentMaxTemp = currentTemp.MaxTemp
document.getElementById('weather0').innerHTML = 'Min : ' + currentMinTemp +'&#8451&nbsp&nbsp&nbsp&nbspMax : ' +  currentMaxTemp +"&#8451"
document.getElementById('icon0').setAttribute('src', 'images/' + currentTemp.Icon + '.png')
document.getElementById('icon0').setAttribute("width","30x30")

