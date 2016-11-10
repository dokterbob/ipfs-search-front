var gulp        = require('gulp');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var transform   = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var reload      = browserSync.reload;

// Use browserify
gulp.task('browserify', function() {
    return browserify('./scripts/app.js')
        .bundle()
        // Convert it to streaming vinyl file object
        .pipe(transform('bundle.js'))
        // Convert it to a buffered vinyl file object
        .pipe(buffer())
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
