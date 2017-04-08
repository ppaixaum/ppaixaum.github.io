var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');

// var messages = {
//     jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
// };

// /**
//  * Build the Jekyll Site
//  */
// gulp.task('jekyll-build', function (done) {
//   browserSync.notify(messages.jekyllBuild);
//   return cp.spawn('bundle', ['exec', 'jekyll build'], {stdio: 'inherit'})
//     .on('close', done);
// });

// /**
//  * Rebuild Jekyll & do page reload
//  */
// gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
//   browserSync.reload();
// });

// /**
//  * Wait for jekyll-build, then launch the Server
//  */
// gulp.task('browser-sync', ['jekyll-build'], function() {
//   browserSync({
//     server: {
//       baseDir: '_site'
//     }
//   });
// });

gulp.task('sass', function () {
  return gulp.src('src/sass/bulma.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('cp-icons', function() {
    return gulp.src('src/icons/*.*')
        .pipe(gulp.dest('assets/icons/'));
});

gulp.task('cp-fonts', function() {
    return gulp.src('src/font/*.*')
        .pipe(gulp.dest('assets/font/'));
});

gulp.task('watch', function() {
    return gulp.watch('src/sass/bulma.sass', ['sass']);
    return gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', function(cb) {
    return runSequence(['sass', 'js', 'cp-icons', 'cp-fonts', 'watch'], cb);
});