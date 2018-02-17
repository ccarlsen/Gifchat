var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {

  browserSync.init({
    server: '../',
    notify: false,
    open: false
  });

  gulp.watch('../assets/scss/*.scss', ['sass']);
  gulp.watch('../*.html').on('change', browserSync.reload);

});

gulp.task('sass', function() {
  return sass('../assets/scss/style.scss')
    .pipe(gulp.dest('../assets'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
