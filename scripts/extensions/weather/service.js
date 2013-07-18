(function(){
  var _ = require('lodash');
  var mod = {};
  exports = module.exports = mod;

  mod.type = 'service';
  mod.name = 'weatherService';
  mod.constructor = ['$http', '$q', function ($http, $q){

    // possibly use this to search
    // http://api.openweathermap.org/data/2.5/find?q=rockwall&units=imperial
    var weatherUrlPart = "http://api.openweathermap.org/data/2.5/weather?id=$$loc$$&units=imperial";
    var forecastUrlPart = "http://api.openweathermap.org/data/2.5/forecast/daily?id=$$loc$$&units=imperial&cnt=4";

    function sendRequest(locationCode) {
      var weatherUrl = weatherUrlPart.replace('$$loc$$', locationCode);
      var forecastUrl = forecastUrlPart.replace('$$loc$$', locationCode);
      var weather = $http.get(weatherUrl, {cache: false});
      var forecast = $http.get(forecastUrl, {cache: false});

      return $q.all([weather, forecast]).then(function(values) {
        var parsed = buildResponse(values[0].data, values[1].data);
        return parsed;
      });

    } // function sendRequest

    function buildResponse(weatherData, forecastData) {
      var nextDay = new Date();
      return {
        weather: {
          location: weatherData.name,
          temp: weatherData.main.temp,
          condition: weatherData.weather[0].main,
          low: weatherData.main.temp_min,
          high: weatherData.main.temp_max,
        },
        forecast: _.map(forecastData.list, function (item) {
          nextDay.setDate(nextDay.getDate()+1);
          return {
            day: nextDay.getTime(),
            high: item.temp.max,
            low: item.temp.min,
            condition: item.weather[0].main
          };
        })
      };
    }

    this.getWeather = function (args) {
      var locationCode = args.locationCode;
      return sendRequest(locationCode);
    } 

  }]; // constructor

})();
