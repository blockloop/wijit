(function(){
    var mod = module.exports = {};

    mod.load = function(args) {
        var _ = args.require('lodash');
        var ng = args.angular;

        ng.module('Weather').service('weatherService', ['$http', '$q', service]);

        function service($http, $q) {
            // possibly use this to search for the city
            // http://api.openweathermap.org/data/2.5/find?q=rockwall&units=imperial
            var weatherUrlPart = "http://api.openweathermap.org/data/2.5/weather?id=$$loc$$&units=imperial";
            var forecastUrlPart = "http://api.openweathermap.org/data/2.5/forecast/daily?id=$$loc$$&units=imperial&cnt=4";

            this.getWeather = function (args) {
                var locationCode = args.locationCode;
                var weatherUrl = weatherUrlPart.replace('$$loc$$', locationCode);
                var forecastUrl = forecastUrlPart.replace('$$loc$$', locationCode);
                var weather = $http.get(weatherUrl, {cache: false});
                var forecast = $http.get(forecastUrl, {cache: false});

                return $q.all([weather, forecast]).then(function(values) {
                    var parsed = buildResponse(values[0].data, values[1].data);
                    return parsed;
                });

            } // getWeather


            function buildResponse(weatherData, forecastData) {
                var nextDay = new Date();
                return {
                    weather: {
                        location: weatherData.name,
                        temp: Math.round(weatherData.main.temp),
                        condition: weatherData.weather[0].main,
                        low: Math.round(weatherData.main.temp_min),
                        high: Math.round(weatherData.main.temp_max)
                    },
                    forecast: _.map(forecastData.list, function (item) {
                        nextDay.setDate(nextDay.getDate()+1);
                        return {
                            day: nextDay.getTime(),
                            high: Math.round(item.temp.max),
                            low: Math.round(item.temp.min),
                            condition: item.weather[0].main
                        };
                    }) // _.map

                }; // return

            } // buildResponse 

        } // service

    } // load


})();
