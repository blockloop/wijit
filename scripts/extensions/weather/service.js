(function(){
  var $ = require('jquery');
  var _ = require('underscore');
  var xml2js = require('xml2js');
  var parseXml = new xml2js.Parser({
    trim: true,
    explicitArray: false
  }).parseString;

  var mod = {};
  exports = module.exports = mod;

  mod.type = 'service';
  mod.name = 'weatherService';
  mod.constructor = ['$http', '$q', function ($http, $q, settingsService){

    // possibly use this to search
    // http://api.openweathermap.org/data/2.5/find?q=rockwall&units=imperial
    var urlpart = "http://api.openweathermap.org/data/2.5/weather?id=$$loc$$&units=imperial";

    var sendRequest = function (locationCode) {
      var deferred = $q.defer();
      var url = urlpart.replace('$$loc$$', locationCode);

      // queue the http request
      $http.get(url).
        then(function(response) {
            var data = response.data;
            console.log(JSON.stringify(data));
            deferred.resolve({
              loc: data.name,
              temp: Math.round(data.main.temp),
              condition: data.weather[0].main,
              low: Math.round(data.main.temp_min),
              high: Math.round(data.main.temp_max),
            });

          });
          
      return deferred.promise;
    }

    var parseResponse = function (response) {
      parseString(response);
      var xmlDoc=parser.parseFromString(response,"text/xml");
    }

    return {
      getWeather: function (args) {
        var locationCode = args.locationCode;
        return sendRequest(locationCode);
      }, // getWeather()

    }; // return 

  }]; // constructor

})();
