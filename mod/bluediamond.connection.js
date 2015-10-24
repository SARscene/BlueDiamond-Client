/**
 * Connection
 * @date 2015-10-24
 * @author Thierry D. @t_dtm
 */
var BD = BD || {};
BD.connection = {};

/**
 * Looks for active connections from known servers.
 * TODO: Trigger: make cleaner and trigger connectionSucceed event instead
 *
 * @returns {boolean} true if a valid connection is found
 */
BD.connection.lookup = function()
{
    var i = 0;
    var validServer = false;
    var servers = BD.connection.list();

    while (!validServer && i in servers)
    {
        validServer = BD.connection.handShake(servers[i]);
        i++;
    }

    if (validServer){
        sessionStorage.setItem("connection", url);
        return BD.connection.fetch();
    }
    else
    {
        BD.u.log("No available collection, requesting QR code"); //TODO: request QR code
        return false;
    }
};

/**
 * Checks if there is a valid BlueDiamond Server at the provided URL
 *
 * @param url
 */
BD.connection.handShake = function(url)
{
    var entrypoint = "/api/mobile/handshake";
    $.get("//" +url + entrypoint, function(e){
        //Not doing anything, handled through "done" action.
    }).done(function(e) {
        BD.u.log("Connection SUCCESS for " + url);
        BD.incident.init(e);
        return url;
    })
    .fail(function(e) {
        BD.u.log("Connection FAILED for " + url);
        return false;
    });
};

/**
 * Retrives list of previously contacted servers.
 * @returns {Array} of URLs
 */
BD.connection.list = function()
{
    return JSON.parse(localStorage.getItem("servers")) || [];
};

/**
 * Adds an URL to
 * @param url
 */
BD.connection.add = function(url)
{
    var list  = BD.connection.list() || [];
    list.push(url);
    localStorage.setItem("servers",JSON.stringify(list));
};

/**
 * Gets data
 */
BD.connection.fetch = function()
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
};