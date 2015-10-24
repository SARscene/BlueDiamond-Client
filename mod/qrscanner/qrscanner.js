
function qrScanner(){
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
	$('#reader').empty();
	$('#reader').html5_qrcode(function(data){
		console.log(data);
		if(BD.connection.handShake(data)){
			$('#reader').html5_qrcode_stop();
			//Go to Tracking page
			navToTrackingPage();
			//get URL in background
			var postURL = data;
			//save url in session
			sessionStorage.setItem("postURL", postURL);
			$('#reader').html5_qrcode_stop();
			return true;
		}
		else{
			popUp(function(){
				$("#myPopupHeader").text("Oops!");
				$("#myPopupText1").text("We couldn't find your Command Post.");
				$("#myPopupText2").text("Please contact your Command Post administrator.");
				$("#myPopupPositiveButton").text("Okay");
				$("#myPopupNegativeButton").css("display", "none");
				$("#myPopupPositiveButton").unbind("click").bind("click", function(){
					$("#myPopup").popup("close");
				});
			});
		}
	},
	function(error){
		console.log(error);
	}, function(videoError){
		console.log(videoError);
	});
}

