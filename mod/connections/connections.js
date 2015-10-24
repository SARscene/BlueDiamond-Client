/* Submits any available tracking info to the User's profile on our server. */
function submitTracks(){
	//Build elements
	var memberid = localStorage.getItem("memberid");
	var postURL = sessionStorage.getItem("postURL");
	var trackID = "00000000-0000-0000-0000-000000000000";
	var name = "";
	var core = {
		"Created":"",
		"CreatedBy":"",
		"Modified":"",
		"ModifiedBy":"",
		"IsDeleted":false,
		"Version":0
	};
	//var incidentID = "00000000-0000-0000-0000-000000000000";
	var incidentID = BD.incident.get() ? BD.incident.get() : "00000000-0000-0000-0000-000000000000";
	var points = JSON.parse(sessionStorage.getItem("savedTracks"));
	//Build object
	var input = {"MemberID":memberid,"Track":{"TrackID":trackID, "Name":name, "Core":core, "IncidentID":incidentID, "Points":points}};
	
	//console.log(input);

	//Call to server using URL obtained from QR code.

	var entrypoint = "api/mobile/uploadtrack/";

	$.ajax({
		type: "post", 
		url: postURL+entrypoint,
		//url: "http://10.0.0.207:50123/api/mobile/",
		timeout: 10000,
		data: input,
		dataType: "json",
		success: function(response) {
			console.log(response);
			return true;
		},
		error: function(xhr, status, error) {
			console.log("submitTracks() Failed: " + error );
			console.log(xhr);
			return false;
		}
	}); 
}

