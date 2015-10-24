/* Navigate to welcomePage. */
function navToWelcomePage(){
	localStorage.clear();
	sessionStorage.clear();
	try{
		$('#reader').html5_qrcode_stop();
	}catch(err){}
	$.mobile.changePage('#welcomePage', {
        allowSamePageTransition: true,
        transition: 'slide'
    });
}

/* Navigate to trackingPage. */
function navToTrackingPage(){
	try{
		$('#reader').html5_qrcode_stop();
	}catch(err){}
	$.mobile.changePage('#trackingPage', {
        allowSamePageTransition: true,
        transition: 'slide'
    });
}

/* Navigate to trackingPage. */
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
		submitTracks();
	}
	else{
		trackStart();
		$("#trackButton").css("background-color", "red");
		$("#trackButton").text("Stop");
	}
}

/* Initiate pages. */
$(this).unbind("pagecontainershow").bind("pagecontainershow", function (event, ui) {
    //initiate page
    var page = $.mobile.activePage.attr('id');

	if(page == "welcomePage"){
		welcome();
	}
	if(page == "qrPage"){
		qrScanner();
	}
	if(page == "trackingPage"){
		$('#reader').html5_qrcode_stop();
		$('#reader').empty();
	}
});