(function(){
  
  var mod = exports = module.exports = {};
  
  mod.type = 'controller';
  mod.name = 'WeatherCtrl'
  mod.constructor = ['$scope', 'weatherService', 

    function ($scope, weatherService) {
      var config = {locationCode: 75032};

      weatherService.getWeather(config).then(function(data){
        $scope.weather = data;
      });

  }]; // constructor

})();

