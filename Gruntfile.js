module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/team_gen.js',
                dest: 'server/public/assets/scripts/team_gen.min.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    cleancss:false,
                    strictUnits:false,
                    strictMath: true,
                    strictImports: true,
                    ieCompat: false
                },
                files: {
                    "server/public/assets/styles/stylesheet.css": "client/styles/less/main.less" // destination file and source file
                }
            }
        },
        copy: {
            bootstrap: {
                expand: true,
                cwd: "node_modules",
                src: [
                    "bootstrap/dist/css/bootstrap.min.css"
                ],
                dest: "server/public/vendors/"
            },
            jquery: {
                expand: true,
                cwd: "node_modules",
                src: [
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map"
                ],
                dest: "server/public/vendors/"
            },
            jqueryui: {
                expand: true,
                cwd: "node_modules",
                src: [
                    "jquery-ui/jquery-ui.js"
                ],
                dest: "server/public/vendors/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify', 'less']);
};
