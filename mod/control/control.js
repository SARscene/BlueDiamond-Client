/* Navigate from qrPage to trackingPage. */
function navToTrackingPage(){
	$.mobile.changePage('#trackingPage', {
        allowSamePageTransition: true,
        transition: 'slide'
    });
}

/* Navigate to trackingPage from qrPage. */
function navToQrPage(){
	$.mobile.changePage('#qrPage', {
        allowSamePageTransition: true,
        transition: 'slide'
    });
}

/* Controller for TrackButton. */
function trackButtonClick(){
	if(sessionStorage.getItem("tracking")){
		trackStop();
	}
	else{
		trackStart();
	}
}