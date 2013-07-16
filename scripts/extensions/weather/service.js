(function(){
  angular.module('wijit').service('weatherService', ['$http', function($http, settingsService){

    var urlpart = "http://rss.accuweather.com/rss/liveweather_rss.asp?metric=0&locCode=";

    return {
      update: function (args) {
        var locationCode = args.options.locationCode;
        var url = urlpart + locationCode;
      }, // function update

    }; // return 

  }]); // angular.module.service

})();
