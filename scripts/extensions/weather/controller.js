(function(){
  
  var _ = require('lodash');
  var mod = exports = module.exports = {};
  
  mod.type = 'controller';
  mod.name = 'WeatherCtrl'

  mod.constructor = ['$scope', 'weatherService', 'configService',
    function ($scope, weatherService, config) {
      config.get('something');
      var config = {locationCode: 4723406};
      weatherService.getWeather(config).then(function(data){
        _.extend($scope, data);
      });

  }]; // constructor

})();

