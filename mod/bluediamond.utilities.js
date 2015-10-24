/**
 * Utilites
 * @date 2015-10-24
 * @author Thierry D. @t_dtm
 */
var BD = BD || {};
BD.u = {};

/***
 * Validates the field based on HTML5 form validation. TODO: do it for real.
 * @param (field) HTML input
 * @param (callback) must accept 1 argument = field value
 * @returns {boolean|?} or callback's return value
 */
BD.u.validate = function(field, callback)
{
    //TODO: validate URL format
    if (field.val().length > 0) return callback(field.val());
    else return false;
};

BD.u.log = function(msg)
{
    if (window.console) {
    	console.log("["+(new Date().toISOString())+"] " + msg);
    }
};
