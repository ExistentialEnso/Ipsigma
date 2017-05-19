var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var babelify = require('babelify');

gulp.task('default', function() {
    var b = browserify({
        entries: ["src/app.js"]
    });
    b.transform('babelify', {presets: ["es2015", "react"]});

    return b.bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("./dist"));
});