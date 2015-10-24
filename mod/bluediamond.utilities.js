/**
 * Utilites
 * @date 2015-10-24
 * @author Thierry D. @t_dtm
 */
var BD = BD || {};
BD.u = {

    /***
     * Validates the field based on HTML5 form validation. TODO: do it for real.
     * @param (field) HTML input
     * @param (callback) must accept 1 argument = field value
     * @returns {boolean|?} or callback's return value
     */
   validate: function(field, callback)
    {
        //TODO: validate URL format
        if (field.val().length > 0) return callback(field.val());
        else return false;
    },

    log: function(msg)
    {
        if (window.console) console.log("["+(new Date().toISOString())+"] " + msg);
    },

    guid:
    {
        validate: function(guid) {
                return (guid.match(/^[{]?[0-9a-fA-F]{8}[-]?([0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}[}]?$/))
        }
    },

    checkRequirements: function()
    {
        return  window.File && window.FileReader && window.FileList && window.Blob;
    },

    checkPDF: function(blob)
    {
        var data = blob.substr(0, 8); // This gets the first 8 bytes/characters of the file
        var regex = new RegExp("%PDF-1.[0-7]"); // This Regular Expression is used to check if the file is valid
        return data.match(regex);
    },

    savePdf: function(blob)
    {
        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

        window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
            fs.root.getFile('incident.pdf', {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(writer) {

                    writer.onwrite = function(e) { console.log("write"); };
                    writer.onerror = function(e) {console.log("error"); };

                    var blob = new Blob([blob], {type: 'application/pdf'});

                    writer.write(blob);

                }, onError);
            }, onError);
        }, onError);
    },

    removeProtocol: function(url)
    {
        return url.replace(/.*?:\/\//g, "");
    }
};