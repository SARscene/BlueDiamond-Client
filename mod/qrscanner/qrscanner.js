
function qrScanner(){
	//Clear session on new load
	sessionStorage.clear();

	try{
		$('#reader').html5_qrcode_stop();
	}catch(err){}

	//Size QR-video to screen
	
	//$("#reader").css('height', ($(window).height()));
	$("#reader").css('width', ($(window).width()));
	$("#reader").css('top', ($(window).height()) );
	$("#reader").css('left', ($(window).width()) );
	$("#reader").children("video").css('height', ($(window).height()));
	$("#reader").children("video").css('width', ($(window).width()));
	

	//Initiate QR-code-reader
	$('#reader').empty();
	$('#reader').html5_qrcode(function(data){
		console.log(data);
		BD.connection.handShake(data);
	},
	function(error){
		console.log(error);
	}, function(videoError){
		console.log(videoError);
	});
}

