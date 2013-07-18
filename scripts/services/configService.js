(function(ng){
  ng.module('wijit').service('configService', [function(){
    var service = {};
    var store = localStorage;

    service.get = function(setting) {
      if (!setting) throw 'setting not provided';
    };

    service.set = function(setting) {
      if (!setting) throw 'setting not provided';
    };

    service.destroy = function(setting) {
      if (!setting) throw 'setting not provided';
    };

    return service;
  }]);
})(angular);
