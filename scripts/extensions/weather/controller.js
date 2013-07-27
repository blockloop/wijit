(function(){
    var mod = exports = module.exports = {};

    mod.load = function(args) {
        var require = args.require;
        var ng = args.angular;
        var _ = require('lodash');

        ng.module('weather').controller('WeatherCtrl', ['$scope', 'weatherService', 'configService', controller]);

        function controller($scope, weatherService, configService) {
            configService.get('something');

            var config = {locationCode: 4723406};
            weatherService.getWeather(config).then(function(data){
                _.extend($scope, data);
            });

        };

    };
})();
