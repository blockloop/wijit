(function(){
  
  var mod = exports = module.exports = {};
  
  mod.type = 'controller';
  mod.name = 'WeatherCtrl'
  mod.constructor = ['$scope', 'weatherService', function ($scope, weatherService) {

    $scope.update = function (args) {
      $scope.weather = weatherService.update(args.config);
    };

  }]; // constructor

})();

