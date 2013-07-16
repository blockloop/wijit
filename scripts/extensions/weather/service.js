(function(){
  var $ = require('jquery');

  var mod = {};
  exports = module.exports = mod;

  mod.type = 'service';
  mod.name = 'weatherService';
  mod.constructor = ['$http', function ($http, settingsService){

    var urlpart = "http://rss.accuweather.com/rss/liveweather_rss.asp?metric=0&locCode=";

    return {
      update: function (args) {
        var locationCode = args.options.locationCode;
        var url = urlpart + locationCode;

        return $http.jsonp( url + params ).
          then(function(response) {
              // parse data items and format post dates
              var data = response.data;
            });

      }, // function update

    }; // return 

  }]; // constructor

})();
