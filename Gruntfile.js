module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'assets/css/main.css': 'assets/sass/main.scss'
				}
			}
		},
		watch: {
			css: {
				files: ['assets/sass/*.scss'],
				tasks: ['sass']
			},
			/*js: {
				files: ['src/js/*.js'],
				tasks: ['uglify:dev']
			}*/
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['sass']);
};