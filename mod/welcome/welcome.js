$( document ).ready(function() {
    $.support.cors=true;
});



/* Run welcome page (signup). */
function welcome(){

	//Create telephone widget
	$("#telephone").intlTelInput({
	    "autoFormat":true,
	    "preferredCountries":["ca", "us", "gb"],
	    "utilsScript":"lib/intl-tel-input-master/lib/libphonenumber/build/utils.js"
	});
	$(".flag-dropdown").css("display", "none");
	$("#telephone").parent().css("width", "100%");

	//Remove validation styling on focusin
	$("#telephone").unbind('focusin').bind('focusin', function(){
		$(this).css("padding-left", ".4em");
		$(this).css("border", "1px solid #ddd");
		$(this).removeClass("error");
		$(this).addClass("valid");
	});
	//validate on focusout
	$("#telephone").unbind('focusout').bind('focusout', function(){
		$(this).css("border", "none");
		var regex = /^\+\d/g;
		if($(this).val().length == 13 && regex.test($(this).val()) == true){
			var formattedNumber = $(this).val();
			var fs = formattedNumber.replace(/(\+[0-9 ]{2})(\d{3})(\d{3})(\d{4})/, '$1$2-$3-$4');
			$(this).val(fs);
		}
		if($(this).val() != "" && $(this).val().length == 15){
			$(this).removeClass("error");
			$(this).addClass("valid");
			$(this).css("padding-left", ".4em");
			$("#error").css("display", "none");
			$("#error").text("");
		}
		else{
			$(this).removeClass("valid");
			$(this).addClass("error");
			$(this).css("padding-left", ".4em");
			$("#error").html("Please enter your telephone number.<br>[+x xxx-xxx-xxxx]");
			$("#error").css("display", "block");
			return false;
		}
	});
	//listen for enter
	$("#telephone").unbind('keyup').bind("keyup", function(event){
		if (event.keyCode == 13) {
			$("#telephone").blur();
		}
	});

	$("#signupButton").unbind("click").bind("click", function(){
		if(validateTelephone()){
			var formattedNumber = $("#telephone").val();
			formattedNumber = formattedNumber.replace(/\W/g, '');
			localStorage.setItem("telephone", formattedNumber);
			navToQrPage();
		}
	});

	//FUNCTINALITY
	//Check for Telephone
	//If telephone, check for connection
	if(localStorage.getItem("telephone")){
		//If connection, go to trackingPage
		if(BD.connection.lookup()){
			navToTrackingPage();
		}
		//If no connection, go to qrPage
		else{
			navToQrPage();
		}
	}
		
}

function validateTelephone(){
	//telephone
	if($("#telephone").val() != "" && $("#telephone").val().length == 15){
		$("#telephone").removeClass("errorLight");
		$("#telephone").addClass("lowlight");
		$("#telephone").css("padding-left", ".4em");
		$("#error").css("display", "none");
		$("#error").text("");
		return true;
	}
	else{
		$("#telephone").removeClass("lowlight");
		$("#telephone").addClass("errorLight");
		$("#telephone").css("padding-left", ".4em");
		$("#error").html("Please enter your mobile number.<br>[+x xxx-xxx-xxxx]");
		$("#error").css("display", "block");
		popUp(function(){
			$("#myPopupText1").html("Please enter a valid phone number.<br>[+x xxx-xxx-xxxx]");
			$("#myPopupPositiveButton").text("Okay");
			$("#myPopupNegativeButton").css("display", "none");
			$("#myPopupPositiveButton").unbind("click").bind("click", function(){
				$("#myPopup").popup("close");
			});
		});
		return false;
	}
}