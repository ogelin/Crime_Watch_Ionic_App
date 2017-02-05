// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova']);
app.run(function($ionicPlatform) {
   $ionicPlatform.ready(function() {
       // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
       // for form inputs)
       if(window.cordova && window.cordova.plugins.Keyboard) {
           cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
       }
       if(window.StatusBar) {
           StatusBar.styleDefault();
       }
   });
});
app.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {


   $ionicPlatform.ready(function() {


       $ionicLoading.show({
           template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!!'
       });

       var posOptions = {
           enableHighAccuracy: true,
           timeout: 20000,
           maximumAge: 0
       };



       $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        //  console.log(json);

           var lat  = position.coords.latitude;
           var long = position.coords.longitude;

           var myLatlng = new google.maps.LatLng(lat, long);

           var mapOptions = {
               center: myLatlng,
               zoom: 15,
               styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ],
               mapTypeId: google.maps.MapTypeId.ROADMAP
           };
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);


          var markers = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url':"/android_asset/www/sample1000.json",
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
          })();
          for( i = 0; i < markers.length; i++ ) {
              var position = new google.maps.LatLng(markers[i][2], markers[i][3]);
              marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  title: "There was a " + markers[i][0].toLowerCase() + " nearby during " + markers[i][5] + " " + markers[i][4] +".",
                  animation: google.maps.Animation.DROP,
                  optimized: false
              });
              addInfoWindow(marker, marker.title);
          }

          function addInfoWindow(marker, message) {

              var infoWindow = new google.maps.InfoWindow({
                  content: message
              });

              google.maps.event.addListener(marker, 'click', function () {
                  infoWindow.open(map, marker);
              });

          }

           $scope.map = map;
           $ionicLoading.hide();

       }, function(err) {
           $ionicLoading.hide();
           console.log(err);
       });
   });
   

});
