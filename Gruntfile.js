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
					'src/assets/css/main.css': 'src/assets/sass/main.scss'
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'src/assets/css',
					src: ['*.css', '!*.min.css'],
					dest: 'export/assets/css',
					ext: '.min.css'
				}]
			}
		},
		uglify: {
			my_target: {
				files: {
					'export/assets/js/main.min.js': 'src/assets/js/main.js'
				}
			}
		},
		includes: {
			build: {
				cwd: 'src',
				src: ['*.html'],
				dest: 'export',
				options: {
					flatten: true,
					includePath: 'src/includes'
				}
			}
		},
		tags: {
			buildScriptsSrc: {
				options: {
					scriptTemplate: '<script type="text/javascript" src="assets/js/main.js"></script>',
					openTag: '<!-- start script template tags -->',
					closeTag: '<!-- end script template tags -->'
				},
				src: [
					'src/assets/js/*.js'
				],
				dest: 'src/index.html'
			},
			buildLinksSrc: {
				options: {
					linkTemplate: '<link rel="stylesheet" type="text/css" href="assets/css/main.css">',
					openTag: '<!-- start css template tags -->',
					closeTag: '<!-- end css template tags -->'
				},
				src: [
					'src/assets/css/*.css'
				],
				dest: 'src/index.html'
			},
			buildScriptsExport: {
				options: {
					scriptTemplate: '<script type="text/javascript" src="assets/js/main.min.js"></script>',
					openTag: '<!-- start script template tags -->',
					closeTag: '<!-- end script template tags -->'
				},
				src: [
					'export/assets/js/*.js'
				],
				dest: 'export/index.html'
			},
			buildLinksSrc: {
				options: {
					linkTemplate: '<link rel="stylesheet" type="text/css" href="assets/css/main.min.css">',
					openTag: '<!-- start css template tags -->',
					closeTag: '<!-- end css template tags -->'
				},
				src: [
					'export/assets/css/*.css'
				],
				dest: 'export/index.html'
			}
		},
		connect: {
			server: {
				options: {
					hostname: "localhost",
					port: 3000,
					base: 'src/',
					livereload: true
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['src/assets/sass/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['src/assets/js/*.js'],
				tasks: ['uglify']
			},
			html: {
				files: ['src/index.html'],
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-script-link-tags');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'includes', 'tags', 'connect', 'watch']);
};