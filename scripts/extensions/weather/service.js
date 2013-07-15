(function(){
  angular.module('wijit', ['http', 'weatherSettings']).service('weatherService', function(){

    var url = "http://rss.accuweather.com/rss/liveweather_rss.asp?metric=0&locCode=75032";

    return {
      update: function (args) {
        var locationCode = args.options.locationCode;
      }, // update


    }; // return

  }); // module

})();
