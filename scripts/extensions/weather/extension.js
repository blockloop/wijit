(function(){
  var ext = exports = module.exports = {};
  var service = require('./service');
  var ctrl = require('./controller');

  // version, duh
  ext.version = '0.0.1';

  // angular modules that this services uses
  // this is your service, ctrl, directives, etc
  // they must be in this list to get loaded
  ext.modules = [ service, ctrl ]

  // Set your controller name
  ext.ctrl = 'WeatherCtrl';

  // word characters only
  ext.name = "Weather";

  // this is for display purposes
  // if this isn't provided 'name' will be used
  ext.prettyName = "Weather!";
})();
