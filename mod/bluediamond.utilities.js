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

    savePdf: function(blob, type)
    {
        var blob = new Blob([blob], { type: type });
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
            window.navigator.msSaveBlob(blob, filename);
        } else {
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);

            /* if (filename) {
             // use HTML5 a[download] attribute to specify filename
             var a = document.createElement("a");
             // safari doesn't support this yet
             if (typeof a.download === 'undefined') {
             window.location = downloadUrl;
             } else {
             a.href = downloadUrl;
             a.download = filename;
             document.body.appendChild(a);
             a.click();
             }
             } else {
             window.location = downloadUrl;
             }*/

            return downloadUrl;

            //setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
        }
    },

    removeProtocol: function(url)
    {
        url.replace(/.*?:\/\//g, "");
        return url;
    }
};