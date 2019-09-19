var map;
        var latitude;
        var longitude;

        (function() {
          window.onload = function() {
            var geocoder = new google.maps.Geocoder();
            var address = document.getElementById('address').value;

            geocoder.geocode( { 'address': address}, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                userLoc = {lat: latitude, lng: longitude};
                map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: latitude, lng:longitude},
                  zoom: 17
                });

                var marker = new google.maps.Marker({
                  position: {lat: latitude, lng: longitude},
                  map: map,
                  title: 'Your new home!'
                });
              } 
            });
          }
        })();

        function setSearch(clickedID) {
          var geocoder = new google.maps.Geocoder();
          var address = document.getElementById('address').value;

            geocoder.geocode( { 'address': address}, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: latitude, lng: longitude},
                  zoom: 17
                });

                var marker = new google.maps.Marker({
                  position: {lat: latitude, lng: longitude},
                  map: map,
                  title: 'Your new home!'
                });

                if (clickedID === 'dmv') {
                  console.log(clickedID);
                  searchMap(latitude, longitude, 'city_hall');
                } else if (clickedID === 'grocery') {
                  console.log(clickedID);
                  searchMap(latitude, longitude, 'supermarket');
                } else if (clickedID === 'clothing') {
                  console.log(clickedID);
                  searchMap(latitude, longitude, 'clothing_store');
                } else if (clickedID === 'transportation') {
                  console.log(clickedID);
                  searchMap(latitude, longitude, 'bus_station');
                } else if (clickedID === 'postOffice') {
                  console.log(clickedID);
                  searchMap(latitude, longitude, 'post_office');
                } else if (clickedID === 'hospital') {
                  console.log(clickedID);
                  searchMap(latitude, longitude, 'hospital');
                }
              }
            });
          }

        function hideScreen(){
          this.document.getElementById("startingScreen").style.visibility = "hidden";
          this.document.getElementById("startScreen").style.visibility = "hidden";
          this.document.getElementById("map").style.visibility = "visible";
        }
  
        function searchMap(latitude, longitude, search) {  
          console.log(search);
          // Create the places service.
          var service = new google.maps.places.PlacesService(map);
          var getNextPage = null;
          var moreButton = document.getElementById('more');
          moreButton.onclick = function() {
            moreButton.disabled = true;
            if (getNextPage) getNextPage();
          };
  
          // Perform a nearby search.
          service.nearbySearch(
              {location: {lat: latitude, lng: longitude}, radius: 500, type: [search]},
              function(results, status, pagination) {
                if (status !== 'OK') return;
  
                createMarkers(results);
                moreButton.disabled = !pagination.hasNextPage;
                getNextPage = pagination.hasNextPage && function() {
                  pagination.nextPage();
                };
              });
        }
  
        function createMarkers(places) {
          var bounds = new google.maps.LatLngBounds();
          var placesList = document.getElementById('places');
  
          for (var i = 0, place; place = places[i]; i++) {
            var image = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
  
            var marker = new google.maps.Marker({
              map: map,
              icon: image,
              title: place.name,
              position: place.geometry.location
            });
  
            var li = document.createElement('li');
            li.textContent = place.name;
            placesList.appendChild(li);
  
            bounds.extend(place.geometry.location);
          }
          map.fitBounds(bounds);
        }