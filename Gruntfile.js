module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'client/css/production/production.css': ['client/css/*.css']
        }
      }
    },
    
    uglify: {
        my_target: {
          files: {
            'client/js/production/production.min.js': ['client/js/jquery.min.js', 'client/js/*.js', 'client/js/master.js']
          }
        }
      },
      
    sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded'
          },
          files: {                         // Dictionary of files
            'client/css/main.css': 'client/css/*.scss'      // 'destination': 'source'
          }
        }
    },
    
    watch: {
      scripts: {
        files: ['client/js/*.js', 'client/css/*.css', 'client/css/*.scss'],
        tasks: ['uglify', 'sass', 'cssmin'],
        options: {
          interrupt: true,
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};