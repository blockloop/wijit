(function(ng) {

	var fs = require('fs');
	var glob = require('glob');
	var path = require('path');
	var _ = require('lodash');

	// the app module
	var mainModule = ng.module('wijit', ['Scope.onReady']);

	// extensions to load
	var extensions = [];

	// read extensions directory
	var files = glob.sync('scripts/extensions/**/extension.js');

	// loop through the extension files and make them 
	// available as angular modules catching any exceptions
	files.forEach(function(file) {
		try {
			var extension = loadExtension(file);
			extensions.push(extension);
		} catch (ex) {
			var extname = file.match(/extensions\/(\w+)/)[1];
			console.error('ERROR loading extension ' + extname + "\n" + ex.stack);
		}
	});

	// provide extensions where requested
	mainModule.value('extensions', extensions);


	//
	// private functions
	//

	function loadExtension(file) {
		// make the file usable by require
		file = './' + file.replace('.js', '');

		var moduleArgs = {
			ng: angular,
			ngModule: mainModule,
			require: require
		};

		// load the extension using node
		var ext = require(file);

		// base directory of the extension
		ext.dir = path.dirname(file);

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
            console.log(extFile);
            var req = require(extFile);
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
