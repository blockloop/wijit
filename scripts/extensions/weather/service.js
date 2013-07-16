(function(){
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
      }, // function update

    }; // return 

  }]; // constructor

})();
