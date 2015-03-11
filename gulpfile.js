/* ----------------- DEPENDENCIES -----------------*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var newer = require('gulp-newer');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');


/* --------------------- PATHS ---------------------*/
var paths = {
  build: './build',
  source: './src',
  libs: ['./lib/react/react.js']
};

/* ---------------- FILE WATCHER ------------------*/
gulp.task('watcher', function () {
  gulp.watch([paths.source + '/scss/*.scss'], ['compile-sass']);
  gulp.watch([paths.source + '/*.html'], ['copy-html']);
  gulp.watch([paths.source + '/js/*.jsx'], ['handle-javascript']);
  gulp.watch([paths.source + '/img/**/*'], ['copy-images']);
});

/* ---------------- SOURCE TASKS ------------------*/

gulp.task('handle-javascript', function () {
  return browserify({
    entries: paths.source + '/js/index.jsx',
    extensions: ['.jsx'],
    debug: true
    })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(connect.reload())
  .pipe(gulp.dest(paths.build + '/js'));
});

gulp.task('compile-sass', function () {
  return gulp.src(paths.source + '/scss/**/*.scss')
    .pipe(sass())
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.build + '/css'));
});

gulp.task('copy-html', function () {
  return gulp.src(paths.source + '/*.html')
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy-images', function () {
  return gulp.src(paths.source + '/img/**/*')
    .pipe(newer(paths.build + '/img'))
    .pipe(gulp.dest(paths.build + '/img'));
});

gulp.task('copy-libs', function () {
  return gulp.src(paths.libs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(paths.build + '/js'));
});

gulp.task('run-server', function () {
  connect.server({
    root: paths.build,
    port: 8001,
    livereload: true
  });
});

gulp.task('build',
  ['handle-javascript', 'compile-sass', 'copy-html', 'copy-images', 'copy-libs', 'run-server']);

/* -------------------------------------------------*/

gulp.task('default', ['build', 'watcher']);
