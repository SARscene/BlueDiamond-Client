function navToTrackingPage(){
	$.mobile.changePage('#trackingPage', {
        allowSamePageTransition: true,
        transition: 'slide'
    });
}

function navToQrPage(){
	$.mobile.changePage('#qrPage', {
        allowSamePageTransition: true,
        transition: 'slide'
    });
}

function trackButtonClick(){
	if(sessionStorage.getItem("tracking")){
		trackStop();
	}
	else{
		trackStart();
	}
}