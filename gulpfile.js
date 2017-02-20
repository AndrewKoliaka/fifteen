const gulp = require('gulp');
const connect = require('gulp-connect');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const useref = require('gulp-useref');
const del = require('del');

gulp.task('connect', () => {
    connect.server({
        port: 3000,
        root: './',
        livereload: true
    });
});

gulp.task('js', () => {
    browserify('./src/js/main.js')
        .transform(babelify, { presets: ["es2015"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});

gulp.task('assets', () => {
    gulp.src('src/assets/libs/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', () => {
    gulp.src('./src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('css', () => {
    gulp.src('src/assets/styles.css')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/assets/*.css', ['css']);
});

gulp.task('del', () => {
    del(['dist', 'index.html']);
});

gulp.task('build', ['assets', 'js', 'css', 'html']);
gulp.task('default', ['build', 'connect', 'watch']);
