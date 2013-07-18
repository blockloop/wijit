(function(ng) {

  var glob = require('glob');
  var path = require('path');
  var _ = require('lodash');

  // the app module
  var mainModule = ng.module('wijit', ['Scope.onReady']);
  // extensions to load
  var extensions = [];
  // read extensions directory
  var files = glob.sync('scripts/extensions/**/extension.js');

  // loop through the extension files and make them available as modules
  files.forEach(function(file) {
    file = './' + file.replace('.js', '');

    // base directory of the extension
    var extDir = path.dirname(file);

    // load the extension using node
    var ext = require(file);
    console.log("Loading extension " + ext.name);

    ext.modules.forEach(function(mod){
      console.log('Loading ' + mod.type + ' ' + mod.name + ' of ' + ext.name + ' module');
      mainModule[mod.type](mod.name, mod.constructor);
    });

    ext.template = path.join(extDir, 'index.html');
    ext.config = path.join(extDir, 'config.json');

    // generate a random class to stick on the extension to 
    // seclude it's css to it's own section
    var range = _.range(65,90).concat(_.range(97,122));
    var prefix = '';
    for (var i = 0; i < 8; i++) {
      prefix += String.fromCharCode(range[Math.floor(Math.random()*range.length)]);
    };
    ext.classPrefix = prefix;

    // push the item to the internal list
    extensions.push(ext);
  });

  mainModule.value('extensions', extensions);

})(angular);
