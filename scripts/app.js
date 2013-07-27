(function(ng) {
	var fs = require('fs');
	var glob = require('glob');
	var path = require('path');
	var _ = require('lodash');

	// extensions to load
	var extensions = [];

	// read extensions directory
	var extDirs = glob.sync('scripts/extensions/*/');

	// loop through the extension files and make them 
	// available as angular modules catching any exceptions
	extDirs.forEach(function(dir) {
		try {
            console.log('Loading ' + path.basename(dir));
			var extension = loadExtension(dir);
			extensions.push(extension);
		} catch (ex) {
			var extname = path.basename(dir);
			console.error('ERROR loading extension ' + extname + "\n" + ex.stack);
		}
	});

    var extensionNames = _.map(extensions, 'name');

    // main module dependencies
    var dependencies = _.union(['Scope.onReady'], extensionNames);

	// the app module
	ng.module('wijit', dependencies);

    ng.module('wijit').value('extensions', extensions);

	//
	// private functions
	//

	function loadExtension(dir) {
        var opts = {
            angular: angular, 
            require: require
        };

        var extensionFile = './' + dir + 'extension';

        var extension = require(extensionFile);

        extension.dir = dir;

        extension.load(opts);

        var extensionFiles = glob.sync(dir + '/*.js');

        // remove the extension file that was loaded already
        extensionFiles = _.reject(extensionFiles, function(f){
            return f.match(/extension.js/);
        });

        // remove the .js and preceed with './'
        extensionFiles = _.map(extensionFiles, function(f){
            return './' + f.replace('.js', '');
        });

        extensionFiles.forEach(function(file){
            console.log('Loading dependency ' + path.basename(file));
            require(file).load(opts);
        });

        extension.guid = createGuid(10);

        extension.styles = loadStyles(extension);

        var extConfigFile = path.join(extension.dir, 'config.json');

        if (fs.exists(extConfigFile)) {
            extension.config = require(extConfigFile);
        }

        if (!extension.template) {
            var templateFilePath = './' + extension.dir + 'template.html';
            if (!fs.existsSync(templateFilePath)) {
                throw new Error('Missing template file for ' + extension.name);
            }
            extension.template = fs.readFileSync(templateFilePath);
        }

        return extension;

    } // loadExtension


    //
    // private
    //
    
    function createGuid(len) {
        var range = _.range(97,122);
        var guid = '';
        for (var i = 0; i < 8; i++) {
            guid += String.fromCharCode(range[Math.floor(Math.random()*range.length)]);
        }
        return guid;
    }

    function loadStyles(extension) {
        if (extension.styles) return;
        var styleFile = path.join(extension.dir, 'styles.less');
        if (fs.existsSync(styleFile)) {
            return '.' + extension.guid + ' { ' + fs.readFileSync(styleFile) + ' }';
        }
        return '';
    }

})(angular);
