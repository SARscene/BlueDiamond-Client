/*
popUp(function(){
	$("#myPopupHeader").text("Popup!");
	$("#myPopupText1").text("Oh no, oh no, oh no...");
	$("#myPopupText2").text("This is REALLY bad!");
	$("#myPopupPositiveButton").text("I AGREE, FML!");
	$("#myPopupNegativeButton").text("calm down");
	$("#myPopupPositiveButton").unbind("click").bind("click", function(){
		$("#myPopup").popup("close");
	});
	$("#myPopupNegativeButton").unbind("click").bind("click", function(){
		$("#myPopup").popup("close");
	});
});
*/

function popUp(callback){
	//get page
	var page = $.mobile.activePage.attr('id');
	//append _popup
	$("#" + page).append($("<div/>",{
		'id': page + "PopupDiv"
	}));
	$("#" + page + "PopupDiv").load('mod/popup/popup.html', function(response, status, xhr) {
		//set popup .on(close) event to remove _popup
		$("#myPopup").bind({
			popupafterclose: function(event, ui) {
				$("#myPopup-popup").remove();
				$("#" + page + "PopupDiv").remove();
			}
		});
		$("#" + page + "PopupDiv").trigger('create');
		//run callback
		callback();
		$("#myPopup").popup("open");
		return true;
	});
	
}