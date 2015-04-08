module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: [
                '**/*.js',
                '!**/client/bower_components/**',
                '!**/node_modules/**'
            ],
            options: {
                globals: {
                    define: true
                }
            }
        },
        shell: {
            bower_install: {
                command: 'node ./node_modules/.bin/bower install'
            },
            npm_install: {
                command: 'npm install'
            }
        },
        copy: {
            common: {
                expand: true,
                cwd: 'client/bower_components',
                src: 'physicsjs/**',
                dest: 'common/libs/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['shell:bower_install', 'shell:npm_install', 'copy:common']);

};