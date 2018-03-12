module.exports = function(grunt) {

    grunt.event.on('qunit.spawn', function (url) {
      grunt.log.ok('Running test: ' + url);
    });

  // 项目配置
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
            //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            banner: '/*!\n' +
            ' * version:<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
            footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */',//添加footer
            beautify: {
              beautify: false
            },
            mangle: false,
           sourceMap: true
        //   mangle: true
        },
        sea: {
            files: {
                src: ['src/seajs-version/ldialog.src'],
                dest: 'dist/seajs-version/ldialog.min.src',
                sourceMap: true
            }
        },
        bulid2: {
            src: ['src/ldialog.src'],
            dest: 'dist/ldialog.min.src',
            sourceMap: true
        }
    },
    jshint: {
        files: ['Grungfile.src', 'public/*.src'],
        options: {
            jshintrc: '.jshintrc'
        },
        ignores: {jshintignore: '.jshintignore'}
    },
    babel: {
      options: {
          sourceMap: false,
          //presets: ['es2015'],
          babelrc: true
      },
      dist: {
          files: {
              'js/demo2.js': 'src/demo.src'
          },
          extends: '.babelrc'
      }
    },
    watch: {
        // files: ['public/*.src'],
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
            files: 'public/*.src',
            tasks: ['jshint']
        },
        babel: {
            files: 'src/demo.src',
            tasks: ['babel']
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
          src: ['public/question.src','public/Answer.src'],
          dest: 'build/concat.src'
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

  // 加载Grunt插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-babel');


  // 注册grunt默认任务
  grunt.registerTask('check', ['jshint']);
  grunt.registerTask('default', 'My "default" task description.', function() {
    //   grunt.task.run('uglify', 'jshint', 'less');
      grunt.log.writeln('Currently running the "default" task.');
    });
};