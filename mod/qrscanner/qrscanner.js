
$(document).ready(function(){

	sessionStorage.clear();

	$("#reader").css('height', ($(window).height()));
	$("#reader").css('width', ($(window).width()));
	$("#reader").css('top', ($(window).height()) );
	$("#reader").css('left', ($(window).width()) );
	$("#reader").children("video").css('height', ($(window).height()));
	$("#reader").children("video").css('width', ($(window).width()));

	$('#reader').html5_qrcode(function(data){
			//Go to Tracking page
			navToTrackingPage();
			//get URL
			var postURL = data;
			//save url in session
			sessionStorage.setItem("postURL", postURL);
		},
		function(error){
			$('#read_error').html(error);
		}, function(videoError){
			$('#vid_error').html(videoError);
		}
	);
});

