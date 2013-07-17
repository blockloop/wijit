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

  // if you have any npm_modules you need then you have to put them here
  // otherwise they will not be available in your extension
  ext.npm_modules = ['xml2js'];

  // Set your controller name
  ext.ctrl = 'WeatherCtrl';

  // Set your template
  ext.template = __dirname + '/index.html';

  // Start with uppercase
  // word characters only
  ext.name = "Weather";

  // this is for display purposes
  // if this isn't provided name will be used
  ext.prettyName = "Weather!";

  //  load your local config
  //  this will be provided to your extension upon changes
  ext.config = require('./weather.json');
})();
