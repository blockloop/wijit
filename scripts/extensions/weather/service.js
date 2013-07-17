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

    var urlpart = "http://rss.accuweather.com/rss/liveweather_rss.asp?metric=0&locCode=";

    var sendRequest = function (locationCode) {
      var deferred = $q.defer();
      var url = urlpart + locationCode;

      // queue the http request
      $http.get(url).
        then(function(response) {
            parseXml(response.data, function (err, result){
              if (err) throw err;
              var forecast = _.map(result.rss.channel.item, function(item){
                return {
                  date: item.title.split(' ')[0],
                  desc: item.description
                }
              }).splice(1,2);

              deferred.resolve({
                current: result.rss.channel.item[0].title,
                currentLong: result.rss.channel.item[0].description,
                forecast: forecast
              });

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
