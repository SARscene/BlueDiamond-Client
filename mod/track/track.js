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
