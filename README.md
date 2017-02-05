# Hackatown: Crime Watch

Welcome to Crime Watch, a multiplatform application that empowers citizens to know what lurks in their surroundings. Data was pulled from the city of Montreal (link: http://donnees.ville.montreal.qc.ca/) and built using Ionic. Special thanks goes to Josh Morony for his very helpful tutorials online (link: https://www.joshmorony.com/).

# How to use Crime Watch
Since this application does require quite a few permissions, we demoed it using Ionic View. To run it yourself, a few prerequisites will be needed in addition to this repo for both Android and iOS.

- Ionic
- Cordova
- Google Maps API Key

Many of the exceptions have yet to be implemented; if you do not have internet access for example, the application will not work. If you are using Android, make sure it is in development mode and accepts the USB debugging connection.

Once you have the dependencies set up, you can run our project on a phone or emulator using:

For Android:
$ cordova build android
$ cordova run android

For iOS:

$ cordova build ios
$ cordova run ios

# Using your own dataset
For both Android and iOS, you can place your own dataset in the format of a doubly linked list. It should be of the format [["Nature of crime", "Date of crime", Latitude, Longitude, Year, Month]].
