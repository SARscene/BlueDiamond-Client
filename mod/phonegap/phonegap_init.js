var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("pause", this.onDevicePause, false);
        document.addEventListener("resume", this.onDeviceResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();

        console.log("deviceready");

        //this never gets fired
        $(document).unbind("pagecontainershow").bind("pagecontainershow", function (event, ui) {
            console.log("pagecontainershow");
            var page = $.mobile.activePage.attr('id');
            if(page == "welcomePage"){
                try{
                    app.statusBarDark();
                }catch(e){
                    console.log(e);
                }
            }
            else{
                try{
                    app.statusBarLight();
                }catch(e){
                    console.log(e);
                }
            }
        });
        Appsee.start("7f97aede95ed488fbbbdc96bbc7b9ba6");
    },
    onDeviceResume: function() {
        app.receivedEvent('deviceresume');
        Appsee.resume();
    },
    onDevicePause: function() {
        app.receivedEvent('devicepause');
        Appsee.pause();
    },
    statusBarLight: function(){
        console.log("setting to white bg with dark text");
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        if(iOS){
            StatusBar.show();
            StatusBar.overlaysWebView(true);
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString("#ffffff");
        }
    },
    statusBarDark: function(){
        console.log("setting to overlaid with light text");
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        if(iOS){
            StatusBar.show();
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //do stuff
    }
};