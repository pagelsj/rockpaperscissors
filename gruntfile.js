module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			pivotal: {
				src: 'assets/js/*.js',
				options: {
					vendor : ['https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'],
					specs: 'testing/*.spec.js'
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Default task(s).
	grunt.registerTask('default', ['jasmine']);

}; 