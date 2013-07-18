(function(){
  
  var $ = require('jquery');
  var mod = exports = module.exports = {};
  
  mod.type = 'controller';
  mod.name = 'WeatherCtrl'

  mod.constructor = ['$scope', 'weatherService', 'configService',
    function ($scope, weatherService, config) {
      config.get('something');
      var config = {locationCode: 4723406};
      weatherService.getWeather(config).then(function(data){
        $.extend($scope, data);
      });

  }]; // constructor

})();

