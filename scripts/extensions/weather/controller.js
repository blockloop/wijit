(function(){
  
  var mod = exports = module.exports = {};
  
  mod.type = 'controller';
  mod.name = 'WeatherCtrl'
  mod.constructor = ['$scope', 'weatherService', 

    function ($scope, weatherService) {
      console.log('Weather Controller is running!');
      $scope.weather = weatherService.update({locationCode: 75032});

  }]; // constructor

})();

