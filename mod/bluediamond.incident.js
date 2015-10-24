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

    map:
    {
        fetch: function()
        {
            var entrypoint = "/api/mobile/handshake";
            //var url = "http://" +  /*BD.connection.active()*/ "10.0.0.207:50123" + "/Downloads/" + /*this.get("IncidentID")*/ "b1b622a1-9e19-4730-98fc-6e15ac92388e" + ".pdf";
            var url ="http://localhost:63342/BlueDiamond-Client/map.pdf";

            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                if (this.status === 200) {
                    var filename = "";
                    var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }

                    /*if (BD.u.checkPDF(this.response))                {
                     BD.u.log("Got file - it's a PDF");
                     } else BD.u.log("Got file - it's a failure");*/

                    var type = xhr.getResponseHeader('Content-Type');
                    var mapUrl = BD.u.savePdf(this.response, type);
                    BD.incident.map.addToList(mapUrl);
                    console.log(mapUrl);
                }
            };
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send();
        },

        addToList: function(url)
        {
            var list  = BD.incident.map.list() || [];
            list.push({
                url: url,
                incident: BD.incident.get('incidentid')
            });
            localStorage.setItem("maps",JSON.stringify(list));
        },

        list: function()
        {
            var list = JSON.parse(localStorage.getItem("maps")) || [];

            var fragment = document.createDocumentFragment();

            list.forEach(function(map){
                console.log(map);
                var li = document.createElement('li');
                li.innerHTML = '<a href="'+ map.url +'">'+ map.incident +'</span>';
                fragment.appendChild(li);
            });

            document.querySelector('#files-list').appendChild(fragment);

            return list;
        }
    }
};
