var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        proxy: "localhost:3000", // local node app address
        port: 5000, // use *different* port than above
        notify: true,
        //browser: "chromium",
        files: "public/**/*"
    });
});

gulp.task('nodemon', ['index'], function(cb) {
    var called = false;
    return nodemon({
            script: './bin/www',
            ignore: [
                'gulpfile.js',
                'node_modules/',
                'public/',
                'db/'
            ]

        })
        .on('start', function() {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function() {
            setTimeout(function() {
                reload({
                    stream: false
                });
            }, 1000);
        });
});

// Ajoute les CSS à index.html
gulp.task('index', function() {
    var target = gulp.src('./public/index.html');
    var css = gulp.src(['./public/css/*.css', './public/css/**/*.css'], {
        read: false
    });
    // Attention : les fichiers doivent avoir un ordre bien particulier! Il faut remapper ensuite
    // var js = gulp.src('./public/lib/*.js', {read: false});
    var ng = gulp.src('./public/src/**/*.js');
    return target.pipe(inject(css, {
            relative: true
        }))
        //	 .pipe(inject(js, {relative: true, name: 'lib'}))
        .pipe(inject(ng.pipe(angularFilesort()), {
            relative: true
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./public/src/**/*.js', ['index']);
});