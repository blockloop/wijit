(function(){
    exports = module.exports = function(args) {
      var _ = args.require('lodash');
      
      args.ngModule.controller('WeatherCtrl', ['$scope', 'weatherService', 'configService', controller]);

      function controller($scope, weatherService, configService) {
          configService.get('something');

          var config = {locationCode: 4723406};
          weatherService.getWeather(config).then(function(data){
            _.extend($scope, data);
          });

      };

    };
})();
