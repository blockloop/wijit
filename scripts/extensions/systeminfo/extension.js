(function(){
  var ext = module.exports = {};

  // version, duh
  ext.version = '0.0.1';

  // word characters only
  ext.name = "SystemInfo";

  // this is for display purposes
  // if this isn't provided 'name' will be used
  ext.prettyName = "System Info";

  // this is where all of your angular code belongs
  // as of 07/26/13 args include angular and node require
  ext.load = function(args){
      var ng = args.angular;
      var require = args.require;

      ng.module('systeminfo', []);
  };

})();
