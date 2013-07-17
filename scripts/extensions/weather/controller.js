(function(){
  
  var mod = exports = module.exports = {};
  
  mod.type = 'controller';
  mod.name = 'WeatherCtrl'
  mod.constructor = ['$scope', 'weatherService', function ($scope, weatherService) {

    $scope.weather = weatherService.update({ locationCode: 75032 });

    $scope.update = function (args) {
      $scope.weather = weatherService.update(args.config);
    };

  }]; // constructor

})();

