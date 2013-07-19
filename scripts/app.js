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

		// base directory of the extension
		var extDir = path.dirname(file);

		var moduleArgs = {
			ng: angular,
			ngModule: mainModule,
			require: require
		};

		// load the extension using node
		var ext = require(file);

		if (typeof(ext) == "function") {
			ext = ext(moduleArgs);
		}

		console.log("Loading extension " + ext.name);

		//
		// load extension dependencies
		//
		(function(){
			var extFiles = glob.sync(extDir + '/*.js');

			extFiles.forEach(function(extFile){
                if (extFile.match(/extension.js/)) return;
				console.log(extFile);
				var req = require(extFile);
				req(moduleArgs);
			});
		})();

		// if the extension doesn't have the template 
		// then it's in a file next to the extension file
		if (!path.template) {
			ext.template = path.join(extDir, 'index.html');
		}

		ext.config = path.join(extDir, 'config.json');

		//
		// set the guid
		//
		(function(){
			var range = _.range(65,90);
			var prefix = '';
			for (var i = 0; i < 8; i++) {
				prefix += String.fromCharCode(range[Math.floor(Math.random()*range.length)]);
			}
			ext.guid = prefix;
		})();

		// 
		// load the stylesheet
		//
		(function(){
			if (ext.styles) return;
			var styleFile = path.join(extDir, 'styles.less');
			if (!fs.existsSync(styleFile)) {
				throw new Error('No styles provided');
			}
			ext.styles = '.' + ext.guid + ' { ' + fs.readFileSync(styleFile) + ' }';
		})();



		return ext;
	}

})(angular);
