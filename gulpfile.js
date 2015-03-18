/* ----------------- DEPENDENCIES -----------------*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var newer = require('gulp-newer');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var notify = require('gulp-notify');
var watchify = require('watchify');
var eslint = require('gulp-eslint');

/* --------------------- PATHS ---------------------*/
var paths = {
  build: './build',
  source: './src'
};

/* -------------------- CONFIG ---------------------*/
var config = {
  port: 8001,
  useLivereload: true,
  jsxDebug: true,
  index: paths.source + '/js/index.jsx'
};

/* ---------------- FILE WATCHER ------------------*/
gulp.task('watcher', function () {
  gulp.watch([paths.source + '/scss/*.scss'], ['compile-sass']);
  gulp.watch([paths.source + '/*.html'], ['copy-html']);
  gulp.watch([paths.source + '/img/**/*'], ['copy-images']);
});

/* ---------------- SOURCE TASKS ------------------*/

var bundler = watchify(browserify({
  entries: config.index,
  debug: config.debug
}, watchify.args));

bundler.on('update', compileJS);
bundler.transform(babelify);

function compileJS () {
  return bundler.bundle()
    .on('error', notify.onError(function (err) {
      return 'Error: ' + err.message;
    }))
    .pipe(source('app.js'))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.build))
}
gulp.task('compile-js', compileJS);

gulp.task('handle-javascript', ['compile-js'], function () {
  return gulp.src(paths.source + '/js/**/*.jsx')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('compile-sass', function () {
  return gulp.src(paths.source + '/scss/**/*.scss')
  .pipe(sass())
  .on('error', function (err) {
    console.log('Error : ' + err.message);
    this.emit('end');
  })
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

gulp.task('run-server', function () {
  connect.server({
    root: paths.build,
    port: config.port,
    livereload: config.useLivereload
  });
});

gulp.task('build',
          ['handle-javascript', 'compile-sass',
           'copy-html', 'copy-images',  'run-server']);

/* -------------------------------------------------*/

gulp.task('default', ['build', 'watcher']);
