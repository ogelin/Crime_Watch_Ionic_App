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
           var lat  = position.coords.latitude;
           var long = position.coords.longitude;

           var myLatlng = new google.maps.LatLng(lat, long);

           var mapOptions = {
               center: myLatlng,
               zoom: 16,
               mapTypeId: google.maps.MapTypeId.ROADMAP
           };

          var map = new google.maps.Map(document.getElementById("map"), mapOptions);
          var markers = [
            ['Me', 45.5040136,-73.6133872],
            ['You',40.758895,-73.985131]
          ];
          //
          for( i = 0; i < markers.length; i++ ) {
              var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
              marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  title: markers[i][0],
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
