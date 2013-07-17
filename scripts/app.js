(function(ng) {

  var glob = require('glob');
  var _ = require('underscore');

  // the app module
  var mainModule = ng.module('wijit', ['Scope.onReady']);
  // extensions to load
  var extensions = [];
  // read extensions directory
  var files = glob.sync('scripts/extensions/**/extension.js');

  // loop through the extension files and make them available as modules
  files.forEach(function(file) {
    file = './' + file.replace('.js', '');

    // load the extension using node
    var ext = require(file);
    console.log("Loading extension " + ext.name);

    ext.modules.forEach(function(mod){
      console.log('Loading ' + mod.type + ' ' + mod.name + ' of ' + ext.name + ' module');
      mainModule[mod.type](mod.name, mod.constructor);
    });

    // push the item to the internal list
    extensions.push(ext);
  });

  // I don't like loading the service here, but it's the only scope where
  // the extension list is available
  mainModule.
    service('extensionService', function() {
      return {
        all: extensions,
        // active: TODO
        // inactive: TODO
        getExtension: function (extname) {
          return _.findWhere(extensions, {name: extname});
        }
      }; // return

    }); // service

})(angular);
