var trackingEngine;					//Timer obj running tracking.

/* Begins tracking the User's location at a set interval. */
function trackStart(){
	
	//Record tracking in session
	sessionStorage.setItem("tracking", 1);
	//Set App to run in background on phone.
	try{
		window.plugin.backgroundMode.enable();
	}
	catch(err){}

	//PING variables
	var mPingInterval = 10000;			//Number of milliseconds to wait between ping calls.
	var mPingTimeout = 20000;			//Number of milliseconds before registering a ping timeout.

	//Perform ping to get location.
	ping(mPingInterval, mPingTimeout);

	/* Performs a location lookup on the User's device at a set interval. */
	function ping(pingInterval, pingTimeout){
		//Get location
		navigator.geolocation.getCurrentPosition(function(location){
			//save tracking
			var savedTracks = [];
			if(sessionStorage.getItem("savedTracks")){
				savedTracks = JSON.parse(sessionStorage.getItem("savedTracks"));
			}
			//Build point object
			var tpid = "00000000-0000-0000-0000-000000000000";
			var lat = location.coords.latitude;
			var lng = location.coords.longitude;
			var alt = location.coords.altitude;
			var acc = location.coords.accuracy;
			var timestamp = location.timestamp;
			var newTrack = {"TrackPointID":tpid, "Latitide":lat, "Longitude":lng, "Altitude":alt, "Accuracy":acc, "TimeStamp":timestamp};
			//Push newTrack onto track-array and save to session
			savedTracks.push(newTrack);
			sessionStorage.setItem("savedTracks", JSON.stringify(savedTracks));

			//console.log(savedTracks);

			//ping again at interval
			clearTimeout(trackingEngine);
			trackingEngine = setTimeout(function() {
				ping(pingInterval, pingTimeout);
			}, pingInterval);
		}, function(e){
			console.log(e);
			//recursive call if error on location lookup
			ping(pingInterval, pingTimeout);
		}, {timeout:pingTimeout, enableHighAccuracy: true, maximumAge:10000});
	}
}

/* Stops tracking the User's location. */
function trackStop(){
	sessionStorage.removeItem("tracking");
	clearTimeout(trackingEngine);
	try{
		window.plugin.backgroundMode.disable();
	}
	catch(err){}
}

var emergencyTracks = [];
function trackDisplay(trackingData, map){
	require([ "esri/config", "dojo/_base/Color", "esri/map", "esri/graphic", "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol"],
	function( esriConfig, Color, Map, Graphic, Point, SimpleMarkerSymbol) {  

		//get range of emergency point colours
		var numberOfItems = trackingData.length * 2;
		var rainbow = new Rainbow(); 
		if(numberOfItems > 0){
			rainbow.setNumberRange(0, numberOfItems);
			rainbow.setSpectrum('#aaaaaa', 'red');
			var s = [];
			for (var i = 1; i <= numberOfItems; i++) {
			    var hexColour = rainbow.colourAt(i);
			    s.push(hexColour);
			}
			//loop through and remove old tracks
			$.each(emergencyTracks, function(key, val){
				map.graphics.remove(val);
			});
			emergencyTracks = [];
			//loop through current data points and plot them
			$.each(trackingData, function(key, val){
				//get point from lat/lng
				var mapPoint = new Point(val.longitude, val.latitude);
				//select colour
				var centerColour = key==(trackingData.length-1) ? Color.fromHex("#"+s[key+trackingData.length]) : Color.fromHex("#"+s[Number(key)]);
				var borderColour = key==(trackingData.length-1) ? Color.fromHex("#"+s[key+trackingData.length]) : Color.fromHex("#"+s[Number(key)]);
				borderColour.a = 0.5;
				//build icon
				var stopSymbol = new SimpleMarkerSymbol({
					"color": centerColour,
					"size": 5,
					"type": "esriSMS",
					"style": "esriSMSCircle",
					"outline": {
						"color": borderColour,
						"width": 5,
						"type": "esriSLS",
						"style": "esriSLSSolid"
					}
				});
				//add to map
				var stop = map.graphics.add(new Graphic(mapPoint, stopSymbol));
				emergencyTracks.push(stop);
			});
		}
		else{
			console.log("no tracks");
		}
	});
}