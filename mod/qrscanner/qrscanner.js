
$(document).ready(function(){

	//Clear session on new load
	sessionStorage.clear();

	//Size QR-video to screen
	$("#reader").css('height', ($(window).height()));
	$("#reader").css('width', ($(window).width()));
	$("#reader").css('top', ($(window).height()) );
	$("#reader").css('left', ($(window).width()) );
	$("#reader").children("video").css('height', ($(window).height()));
	$("#reader").children("video").css('width', ($(window).width()));

	//Initiate QR-code-reader
	$('#reader').html5_qrcode(function(data){
			//Go to Tracking page
			navToTrackingPage();
			//get URL in background
			var postURL = data;
			//save url in session
			sessionStorage.setItem("postURL", postURL);
		},
		function(error){
			console.log(error);
		}, function(videoError){
			console.log(videoError);
		}
	);
});

