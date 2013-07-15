module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			allFiles: [
				'Gruntfile.js',
				'scripts/controllers/*js',
				'scripts/services/*js',
				'scripts/*js',
			]
		},
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "Project Name" // defaults to the name in package.json, or uses project's directory name, you can change to the name of your project
			}
		},
		less: {
			development: {
				options: {
					paths: ["./styles/less"],
					yuicompress: true
				},
				files: [{
					expand: true,        // Enable dynamic expansion.
					cwd: './styles/less',  // Src matches are relative to this path.
					src: ['*.less'],     // Actual pattern(s) to match.
					dest: './styles/css',  // Destination path prefix.
					ext: '.css',         // Dest filepaths will have this extension.
				}]
			}
		},
		watch: {
			less: {
				files: "./styles/less/*",
				tasks: ["less"]
			},
			scripts: {
				files : [
					'./**/*.js',
					'!node_modules/**/*.js'
				],
				tasks: ['jshint'],
				options: {
					interrupt: true,
				},
			},
		}
	});

	// Default task.
	grunt.registerTask('default', 'watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-notify');
 
};

