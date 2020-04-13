// Code for the Add Location page.
//autocomplete search suggestions
//https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
//loadLocations()
var map;
var geocoder;
var latitude, longitude;
var defaultName;

//make map and autocomplete using google api
        function initAutocomplete() 
        {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -37.9115568, lng: 145.1340114},
                zoom: 15
                
            });
            var input = document.getElementById('location_name');
            var searchBox = new google.maps.places.SearchBox(input);
            geocoder = new google.maps.Geocoder();
            
            map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
            
        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
            

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          /*markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
            // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
              

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
            
          map.fitBounds(bounds);*/
        });
            
            
      }
      
//change location
function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('location_name').value;
        geocoder.geocode({'address': address}, function(results, status) 
    {
          if (status === google.maps.GeocoderStatus.OK) 
           {
              resultsMap.setCenter(results[0].geometry.location);
              console.log(results[0])
              latitude = results[0].geometry.location.lat();
              longitude = results[0].geometry.location.lng();
              defaultName = address;
              
             /*var marker = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location
                                                });  
               marker.setMap(results[0].geometry.location)*/ 
                  
            var infoWindow = new google.maps.InfoWindow(
                {map: resultsMap,
                content: results[0].formatted_address,
                //disableAutoPan: true
                })  
              infoWindow.setPosition(results[0].geometry.location) 
           } 
          else 
          {
            alert('Geocode was not successful for the following reason: ' + status);
          }
    });
}

function locationName() //when location name is empty, prevent geocoder to avoid error
{
    if(document.getElementById('location_name').value == "")
        {
            
        }
    else
    {
        geocodeAddress(geocoder, map)
        console.log(latitude + ', ' + longitude)
        console.log(defaultName)
    }    
}

function saveButton() //save location
{
    var nickname_value = document.getElementById('nickname').value;
    if (latitude === null || longitude === null )
        {
          alert("The location that you are trying to save is invalid, please try again")
        }
    else{
        
        if(nickname_value == '')
        {
            nickname_value = defaultName; //change blank nickname to location name
            new_location.addLocation(latitude,longitude,nickname_value)
            saveLocations()
            alert("Location successfully saved!")
            location.href = 'index.html'
        }
        
        else 
            {
            new_location.addLocation(latitude,longitude,nickname_value)
            saveLocations()
            alert("Location successfully saved!")
            location.href = 'index.html'
                
            }
        
        }    
    
    /*var toBeSaved = {
    'latitude' : latitude,
    'longitude' : longitude,
    'nickname' : nickname_value
    };
    var APP_PREFIX = "weatherApp";
    localStorage.setItem(APP_PREFIX,JSON.stringify(toBeSaved));*/
    //var new_location = new LocationWeatherCache();
    
    
}
