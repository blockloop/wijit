(function(){
  // expose your extensions public information
  var ext = {};
  exports = module.exports = ext;

  var service = require('./service');
  var ctrl = require('./controller');
  ext.modules = [ service, ctrl ]

  ext.name = "Weather!";

  //  load your local config
  //  this will be loaded into the storageService and provided to your extension upon changes
  ext.config = require('./weather.json');
})();
