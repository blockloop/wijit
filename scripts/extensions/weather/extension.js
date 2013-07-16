(function(){
  // define or load your angular modules
  require('./service');
  require('./controller');

  // expose your extensions public information
  var ext = module.exports = {};

  //  load your local config
  //  this will be loaded into the storageService and provided to your extension upon changes
  ext.config = require('./weather.json');
})();
