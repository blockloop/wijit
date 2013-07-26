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
			var extension = loadExtension(dir);
			extensions.push(extension);
		} catch (ex) {
			var extname = path.basename(dir);
			console.error('ERROR loading extension ' + extname + "\n" + ex.stack);
		}
	});

    var extensionNames = _.select(extensions, 'name');

    // main module dependencies
    var dependencies = _.union(['Scope.onReady'], extensionNames);

	// the app module
	var mainModule = ng.module('wijit', dependencies);

	// provide extensions where requested
	mainModule.value('extensions', extensions);


	//
	// private functions
	//


	function loadExtension(dir) {
        var extensionFile = glob.sync(path.join(dir, 'extension.js'))[0];
        var extension = require(extensionFile);
        extension.load({angular: angular, require: require});
    }



	function loadExtension(dir) {
        // relative path to extension.js
		var extFile = './' + path.join(dir, 'extension.js');

		var moduleArgs = {
			ngModule: mainModule,
			require: require
		};

		// load the extension using node
		var ext = require(extFile);

		// base directory of the extension
		ext.dir = dir;

		if (typeof(ext) == "function") {
			ext = ext(moduleArgs);
		}

		console.log("Loading extension " + ext.name);

        loadExtensionDeps(ext, moduleArgs);

		// if the extension doesn't have the template 
		// then it's in a file next to the extension file
		if (!path.template) {
			ext.template = path.join(ext.dir, 'template.html');
		}

		ext.config = path.join(ext.dir, 'config.json');

        ext.guid = createGuid(10);

        ext.styles = loadStyles(ext);


		return ext;
	}


    function loadExtensionDeps(ext, moduleArgs) {
        var extFiles = glob.sync(ext.dir + '/*.js');

        extFiles.forEach(function(extFile){
            if (extFile.match(/extension.js/)) return;
            var fullPath = './' + extFile;
            var req = require(fullPath);
            req(moduleArgs);
        });
    }

    function createGuid(len) {
        var range = _.range(65,90);
        var guid = '';
        for (var i = 0; i < 8; i++) {
            guid += String.fromCharCode(range[Math.floor(Math.random()*range.length)]);
        }
        return guid;
    }

    function loadStyles(ext) {
        if (ext.styles) return;
        var styleFile = path.join(ext.dir, 'styles.less');
        if (fs.existsSync(styleFile)) {
            return '.' + ext.guid + ' { ' + fs.readFileSync(styleFile) + ' }';
        }
        return '';
    }

})(angular);
