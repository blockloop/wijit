(function() {
  // extensions to load
  var extensions = [];
  var glob = require('glob');
  var _ = require('underscore');

  // read extensions directory
  glob('extensions/**/extension.js', function(err,files) {
    if(err) throw err;

    // loop through the extension files and make them available as modules
    files.forEach(function(file) {

      // load the extension using node
      var ext = require(file);

      // push the item to the internal list
      extensions.push(ext);
    });

  }); // glob

  // declare modules
  angular.module('wijit', _.map(extensions, 'name')).
    service('extensionService', function() {
      return {
        all: extensions
        // active: TODO
        // inactive: TODO
      }; // return

    }); // service

})();
