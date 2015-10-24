/**
 * Connection
 * @date 2015-10-24
 * @author Thierry D. @t_dtm
 */
var BD = BD || {};

BD.connection = {

    /**
     * Looks for active connections from known servers.
     * TODO: Trigger: make cleaner and trigger connectionSucceed event instead
     *
     * @returns {boolean} true if a valid connection is found
     */
    lookup: function()
    {
        var i = 0;
        var validServer = false;
        var servers = BD.connection.list();

        while (!validServer && i in servers)
        {
            validServer = this.handShake(servers[i]);
            i++;
        }

        if (validServer){
            sessionStorage.setItem("connection", url);
            return this.fetch();
        }
        else
        {
            BD.u.log("No available collection, requesting QR code"); //TODO: request QR code
            return false;
        }
    },

    /**
     * Checks if there is a valid BlueDiamond Server at the provided URL
     *
     * @param url
     */
    handShake: function(url)
    {
        var entrypoint = "api/mobile/handshake";
        $.get(url + entrypoint, function(e){
            //Not doing anything, handled through "done" action.
        }).done(function(e) {

            $('#reader').html5_qrcode_stop();
            //save url in session
            sessionStorage.setItem("postURL", url);

            BD.u.log("Connection SUCCESS for " + url);
            BD.incident.init(e);
            BD.connection.signin(url);
            return url;
        })
        .fail(function(e) {

            popUp(function(){
                $("#myPopupHeader").text("Oops!");
                $("#myPopupText1").text("We couldn't find your Command Post.");
                $("#myPopupText2").text("Please contact your Command Post administrator.");
                $("#myPopupPositiveButton").text("Okay");
                $("#myPopupNegativeButton").css("display", "none");
                $("#myPopupPositiveButton").unbind("click").bind("click", function(){
                    navToQrPage();
                    $("#myPopup").popup("close");
                });
            });

            BD.u.log("Connection FAILED for " + url);
            return false;
        });
    },

    /**
     * Retrives list of previously contacted servers.
     * @returns {Array} of URLs
     */
    list: function()
    {
        return JSON.parse(localStorage.getItem("servers")) || [];
    },

    /**
     * Adds an URL to
     * @param url
     */
    add: function(url)
    {
        var list  = this.list() || [];
        list.push(url);
        localStorage.setItem("servers",JSON.stringify(list));
    },

    /**
     * Gets data
     */
    fetch: function()
    {
        var url = sessionStorage.getItem("connection");
        var entryPoint = ""; //TODO: set entrypoint URL

        $.get("//" + url, function(e){
            BD.u.log("Fetch SUCCESS");
            return url;
        }).done(function() {
            BD.u.log("Fetch DONE");
        })
        .fail(function() {
            BD.u.log("Fetch FAILED");
            return false;
        });
    },

    signin: function(url)
    {
        var incident = [];
        var incidentID = "00000000-0000-0000-0000-000000000000";
        if(sessionStorage.getItem(incident)){
            incident = JSON.parse(sessionStorage.getItem(incident));
            if(incident.IncidentID){
                incidentID = incident.IncidentID;
            }
        }

        var entrypoint = "api/mobile/signin/"+incidentID;
        //var params = "?phoneNumber="+localStorage.getItem("telephone");
        var params = "";
        $.get(url + entrypoint + params, function(e){
            console.log(e);
            BD.u.log("Signin SUCCESS");
            //Go to Tracking page
            navToTrackingPage();
        }).done(function(memberid) {
            localStorage.setItem("memberid", memberid);
            BD.u.log("Signin DONE");
        })
        .fail(function(e) {
            BD.u.log("Signin FAILED: ");
            console.log(e);
            popUp(function(){
                $("#myPopupHeader").text("Oops!");
                $("#myPopupText1").text("We couldn't sign you in.");
                $("#myPopupText2").text("Please contact your Command Post administrator.");
                $("#myPopupPositiveButton").text("Okay");
                $("#myPopupNegativeButton").css("display", "none");
                $("#myPopupPositiveButton").unbind("click").bind("click", function(){
                    navToQrPage();
                    $("#myPopup").popup("close");
                });
            });
            return false;
        });
    }
};