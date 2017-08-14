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
		cssmin: {
		  target: {
			files: [{
				expand: true,
				cwd: 'assets/css',
				src: ['*.css', '!*.min.css'],
				dest: 'assets/css',
				ext: '.min.css'
			}]
			}
		},
		uglify: {
			my_target: {
				files: {
					'assets/js/main.min.js': 'assets/js/main.js'
				}
			}
		},
		watch: {
			css: {
				files: ['assets/sass/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['assets/js/*.js'],
				tasks: ['uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);
};