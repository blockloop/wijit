(function(){
  var ext = exports = module.exports = {};

  // version, duh
  ext.version = '0.0.1';

  // Set your controller name
  ext.ctrl = 'OsinfoCtrl';

  // word characters only
  ext.name = "osinfo";

  // this is for display purposes
  // if this isn't provided 'name' will be used
  ext.prettyName = "OS Info";

  // this is where all of your angular code belongs
  // as of 07/26/13 args include angular and require
  ext.load = function(args){
      var ng = args.angular;
      var require = args.require;

  };

})();
