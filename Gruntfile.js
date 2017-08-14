module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass_import: {
			options: {},
			dist: {
				files: {
					'main.scss': ['imports/*']
				}
			}
		},
		sass: {
			dist: {
				files: {
					'export/assets/css/main.css': 'assets/sass/main.scss'
				}
			}
		},
		cssmin: {
		  target: {
			files: [{
				expand: true,
				cwd: 'export/assets/css',
				src: ['*.css', '!*.min.css'],
				dest: 'export/assets/css',
				ext: '.min.css'
			}]
			}
		},
		uglify: {
			my_target: {
				files: {
					'export/assets/js/main.min.js': 'assets/js/main.js'
				}
			}
		},
		includes: {
			build: {
				cwd: 'site',
				src: ['*.html'],
				dest: 'export',
				options: {
					flatten: true,
					includePath: 'assets/includes'
				}
			}
		},
		connect: {
			server: {
				options: {
					hostname: "localhost",
					port: 3000,
					base: 'site/',
					livereload: true
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['assets/sass/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['assets/js/*.js'],
				tasks: ['uglify']
			},
			html: {
				files: ['site/index.html'],
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'includes', 'connect', 'watch']);
};