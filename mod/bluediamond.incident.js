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
    }
};
