/*jslint node: true */

var gulp        = require('gulp');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var buffer      = require('vinyl-buffer');
var gutil       = require('gulp-util');
var reload      = browserSync.reload;
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');

// Use browserify
gulp.task('browserify', function() {
    return browserify('./scripts/app.js', { debug: true })
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        // Convert it to streaming vinyl file object
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(uglify())
        .pipe(sourcemaps.write('./')) // writes .map file
        // Start piping stream to tasks!
        .pipe(gulp.dest('./app/'));
});


// Compile less
gulp.task('less', function () {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./app/style'))
    .pipe(reload({stream: true}));
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('./less/**/*.less', ['less']);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
    gulp.watch("./scripts/**/*.*", ['browserify']);
    gulp.watch("./app/*.html").on('change', reload);
    gulp.watch("./app/bundle.js").on('change', reload);
});


// Default Task
gulp.task('default', ['browserify','less', 'watch', 'browser-sync']);
gulp.task('build', ['browserify','less']);
