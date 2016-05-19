module.exports = function(grunt) {

    grunt.event.on('qunit.spawn', function (url) {
      grunt.log.ok('Running test: ' + url);
    });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * version:<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
    uglify: {
        options: {
            stripBanners: true,
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            beautify: {
              beautify: false
            },
            mangle: false,
           sourceMap: true
        //   mangle: true
        },
        files: {
            src: ['js/sea-ldialog/ldialog.js'],
            dest: 'js/sea-ldialog/ldialog.min.js',
            sourceMap: true
        }
    },
    jshint: {
        files: ['Grungfile.js', 'public/*.js'],
        options: {
            jshintrc: '.jshintrc'
        },
        ignores: {jshintignore: '.jshintignore'}
    },
    watch: {
        // files: ['public/*.js'],
        // tasks: ['jshint'],
        options: {
           livereload: true
        },
        less: {
             files: ["./public/less/*"],
             tasks: ["less", "autoprefixer:development"],
             options: {
               livereload: true
           }
        },
        jshint: {
            files: 'public/*.js',
            tasks: ['jshint']
        }
    },
    concat:{
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
        //定义一个字符串插入没个文件之间用于连接输出
        separator: ';'
      },
      dist: {
          src: ['public/question.js','public/Answer.js'],
          dest: 'build/concat.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['public/css'],
          yuicompress: false
        },
        files: {
          './public/css/test.css': './public/less/style.less'
        }
      }
    },
    cssmin: {
        options: {
          sourceMap: true,
          compatibility: 'ie8',
          keepSpecialComments: '*'
        },
        files: {
            src: 'css/ldialog.css',
            dest: 'css/ldialog.min.css'
        }
    },
    autoprefixer: {
        development: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9'],
                expand: true,
                flatten: true,
                src: 'public/css/*.css',
                dest: 'public/css',
                watch : {
                         styles : {
                              files : ['public/*.css' ],
                              tasks : ['autoprefixer' ]
                         }
                    }
              }
    },
    csscomb: {
        options: {
                config: 'public/css/sort.json'
            },
        main: {
               files: {
                   './public/css/aaa.css': './public/css/aa.css'
               }
           }
    },
    qunit: {
      files: ['views/test.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('check', ['jshint']);
  grunt.registerTask('default', 'My "default" task description.', function() {
    //   grunt.task.run('uglify', 'jshint', 'less');
      grunt.log.writeln('Currently running the "default" task.');
    });
};