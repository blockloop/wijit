(function(){
  var $ = require('jquery');

  var mod = {};
  exports = module.exports = mod;

  mod.type = 'service';
  mod.name = 'weatherService';
  mod.constructor = ['$http', '$q', function ($http, $q, settingsService){

    var urlpart = "http://rss.accuweather.com/rss/liveweather_rss.asp?metric=0&locCode=";

    function sendRequest(locationCode) {
      var deferred = $q.defer();
      var url = urlpart + locationCode;

      // queue the http request
      $http.get(url).
        then(function(response) {
            deferred.resolve(response.data);
          });
          
      return deferred.promise;
    }

    return {
      getWeather: function (args) {
        var locationCode = args.locationCode;
        return sendRequest(locationCode);
      }, // getWeather()

    }; // return 

  }]; // constructor

})();
