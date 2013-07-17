(function(){
  
  var $ = require('jquery');
  var mod = exports = module.exports = {};
  
  mod.type = 'controller';
  mod.name = 'WeatherCtrl'

  mod.constructor = ['$scope', 'weatherService', 
    function ($scope, weatherService) {
      var config = {locationCode: 75032};

      weatherService.getWeather(config).then(function(data){
        // $.extend($scope, data);
        $scope.current = data.current;
        $scope.currentLong = data.currentLong;
        $scope.forecast = data.forecast;
      });

  }]; // constructor

})();

