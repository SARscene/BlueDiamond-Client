/**
 * Connection
 * @date 2015-10-24
 * @author Thierry D. @t_dtm
 */
var BD = BD || {};
BD.incident = {

    instance: {},

    /**
     * Stores the incident and loads it in memory as object
     * @param json
     */
    init: function(json)
    {
        // Valid id exemple: b1b622a1-9e19-4730-98fc-6e15ac92388e
        if (BD.u.guid.validate(json["IncidentID"])) //todo: validate json contents stuff in json or something
        {
            BD.u.log("GUID valid, reading incident...");
            console.log(json);
            this.instance = json;
            sessionStorage.setItem("incident", JSON.stringify(json));
            localStorage.setItem("lastIncidentId", this.get("IncidentID"));
        }
        else
            BD.u.log("Not a valid incident.");
    },

    get: function(key)
    {
        if (this.instance.hasOwnProperty(key))
            return this.instance[key];
        else
            return null;
    },

    /**
     * Gets map from the command server for active incident.
     */
    getMap: function()
    {
        $.get("//" + this.instance + "/Downloads/" + this.get("IncidentID") + ".pdf", function(e){
            //Not doing anything, handled through "done" action.
        }).done(function(e)
        {
            console.log(e);
            if (BD.u.checkPDF(e))
            {
                BD.u.log("Got file - it's a PDF");
                BD.u.savePdf(e);
            }
            else BD.u.log("Got file - it's a failure");

            return url;
        })
        .fail(function(e)
        {
            console.log(e);
            BD.u.log("Didn't get anything");
            return false;
        });
    }
};
