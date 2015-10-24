module.exports = function(grunt) {

  // timestamp in asset URLs for cache busting
  var time = (new Date()).getTime();

  return {
    js: {
      src: 'src/js/wrapper.js.ejs',
      dest: 'tmp/wrapped.js',
      variables: function() {
        return {
          plugin: grunt.file.read('src/js/intlTelInput.js'),
          data: grunt.file.read('src/js/data.js'),
        }
      }
    },
    invalidKey: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/invalid-key.html',
      variables: function() {
        return {
          time: time,
          title: "Invalid Key",
          desc: "Use the custom invalidkey event to flash the input red. To test it, focus the input and type an invalid character e.g. a letter.",
          stylesheet: 'invalidKey.css',
          markup: grunt.file.read('examples/partials/simpleInput.html'),
          code: grunt.file.read('examples/js/invalidKey.js'),
          script: "invalidKey.js"
        }
      }
    },
    nationalMode: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/national-mode.html',
      variables: function() {
        return {
          time: time,
          title: "National Mode",
          desc: "Allow users to enter their national number, and then convert it to international format using the public method getCleanNumber.",
          stylesheet: "",
          markup: grunt.file.read('examples/partials/nationalMode.html'),
          code: grunt.file.read('examples/js/nationalMode.js'),
          script: "nationalMode.js"
        }
      }
    },
    defaultCountryIp: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/default-country-ip.html',
      variables: function() {
        return {
          time: time,
          title: "Lookup user's country",
          desc: "Set defaultCountry to 'auto' to perform a JSONP request to ipinfo.io, which returns the user's country based on their IP address.",
          stylesheet: "",
          markup: grunt.file.read('examples/partials/simpleInput.html'),
          code: grunt.file.read('examples/js/defaultCountryIp.js'),
          script: "defaultCountryIp.js"
        }
      }
    },
    modifyCountryData: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/modify-country-data.html',
      variables: function() {
        return {
          time: time,
          title: "Modify country data",
          desc: "Use static getCountryData method to update the data to only show localised country names.",
          stylesheet: "",
          markup: grunt.file.read('examples/partials/simpleInput.html'),
          code: grunt.file.read('examples/js/modifyCountryData.js'),
          script: "modifyCountryData.js"
        }
      }
    },
    onlyCountries: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/only-countries-europe.html',
      variables: function() {
        return {
          time: time,
          title: "European countries",
          desc: "Set onlyCountries option to just European country codes.",
          stylesheet: "",
          markup: grunt.file.read('examples/partials/simpleInput.html'),
          code: grunt.file.read('examples/js/onlyCountriesEurope.js'),
          script: "onlyCountriesEurope.js"
        }
      }
    },
    countrySync: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/country-sync.html',
      variables: function() {
        return {
          time: time,
          title: "Country sync",
          desc: "Use static getCountryData method to create a separate country dropdown for an address form, and then listen for change events to keep the two dropdowns in sync.",
          stylesheet: 'countrySync.css',
          markup: grunt.file.read('examples/partials/countrySync.html'),
          code: grunt.file.read('examples/js/countrySync.js'),
          script: "countrySync.js"
        }
      }
    },
    validation: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/is-valid-number.html',
      variables: function() {
        return {
          time: time,
          title: "Validation",
          desc: "Use public isValidNumber method (utilising Google's libphonenumber) to validate the telephone number on the change event.",
          stylesheet: 'isValidNumber.css',
          markup: grunt.file.read('examples/partials/isValidNumber.html'),
          code: grunt.file.read('examples/js/isValidNumber.js'),
          script: "isValidNumber.js"
        }
      }
    }
  };
};