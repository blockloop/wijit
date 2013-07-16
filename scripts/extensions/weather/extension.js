(function(){
  // expose your extensions public information
  var ext = {};
  exports = module.exports = ext;

  var service = require('./service');
  var ctrl = require('./controller');

  // modules that this services uses
  // this is your service, ctrl, directives, etc
  ext.modules = [ service, ctrl ]

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
