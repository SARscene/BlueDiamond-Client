var trackingEngine;					//Timer obj running tracking.
var monitoringEngine;				//Timer obj running monitoring.

function trackButtonClick(){
	trackStart();
}

/* Recursively monitors the Memeber's emergnecy status every 30 seconds and tracks the user if status = 1 */
function monitorEmergencyStatus(){
	//if not currently tracking, track
	if(!sessionStorage.getItem("tracking")){
		trackStart();
	}
	//Display existing tracked points
	/*
	if(page == "editPage" && sessionStorage.getItem("editPID") != 0 && sessionStorage.getItem("editPID") != null){
		getTracking(sessionStorage.getItem("editPID"), function(trackingData){
			trackEmergencyDisplay(trackingData, map);
		});
	}
	*/

	clearTimeout(monitoringEngine);
	if(sessionStorage.getItem("tracking")){
		monitoringEngine = setTimeout(function(){
			monitorEmergencyStatus();
		}, 30000);
	}
}

/* Reports the User's location to Server. 
 * @param location Location object returned by navigator.geolocation.getCurrentPosition
 */
function trackStart(){
	
	sessionStorage.setItem("tracking", 1);
	try{
		window.plugin.backgroundMode.enable();
	}
	catch(err){}

	//PING variables
	var mPingInterval = 30000;			//Number of milliseconds to wait between ping calls.
	var mPingTimeout = 20000;			//Number of milliseconds before registering a ping timeout.
	var mPingDistance = 10;				//Number of meters necessary to register arrival.
											//suggestedMin: 10-20

	ping(mPingInterval, mPingTimeout, mPingDistance);

	function ping(pingInterval, pingTimeout, pingDistance){
		navigator.geolocation.getCurrentPosition(function(location){
			//save tracking
			var savedTracks = [];
			if(sessionStorage.getItem("savedTracks")){
				savedTracks = JSON.parse(sessionStorage.getItem("savedTracks"));
			}
			console.log(savedTracks);
			savedTracks.push(location);
			sessionStorage.setItem("savedTracks", JSON.stringify(savedTracks));
			//ping again at interval
			clearTimeout(trackingEngine);
			trackingEngine = setTimeout(function() {
				ping(pingInterval, pingTimeout, pingDistance);
			}, pingInterval);
		}, function(e){
			console.log(e);
			//recursive call
			ping(pingInterval, pingTimeout, pingDistance);
		}, {timeout:pingTimeout, enableHighAccuracy: true, maximumAge:10000});
	}
}

function trackEmergencyStop(){
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


function getTracking(pid, callback){
	$.ajax({
		type: "post", 
		url: getTrackingConnect,
		timeout: 10000,
		data: {"pid":pid},
		dataType: "json",
		success: function(response) {
			callback(response);
		},
		error: function(xhr, status, error) {
			console.log("getTracking() Failed: " + error);
			console.log(xhr);
			return false;
		}
	}); 
}