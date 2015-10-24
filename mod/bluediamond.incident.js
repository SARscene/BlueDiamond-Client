/**
 * Connection
 * @date 2015-10-24
 * @author Thierry D. @t_dtm
 */
var BD = BD || {};
BD.incident = {};
BD.incident.instance = {};

/**
 * Stores the incident and loads it in memory as object
 * @param json
 */
BD.incident.init = function(json)
{
    if (true) //todo: validate json contents stuff in json or something
    {
        BD.u.log("Reading incident...");
        BD.incident.instance = JSON.parse(json);
        sessionStorage.setItem("incident", json);
        localStorage.setItem("lastIncidentId", BD.incident.get("in"));
    }
    else
        BD.u.log("Not a valid incident.");
};

BD.incident.get = function(key)
{
    if (BD.incident.instance.hasOwnProperty(key))
        return BD.incident.instance[key];
    else
        return null;
};