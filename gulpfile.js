/**
 * 
 */
'use strict';
const { src, dest, parallel, series, watch} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const del = require('delete');

// const gulpif = require('gulp-if');
// const uglify = require('gulp-uglify');
// const noop = require("gulp-noop");

function cleanTask(cb) {
    
    // Use the `delete` module directly, instead of using gulp-rimraf
        del(['./dest/**/*.*'], cb);
  }

function htmlTask() {
    return src('src/**/*.html')
    .pipe(dest('./dest'));
}

function pugTask() {
  return src('src/templates/**/*.pug')
    .pipe(pug())
    .pipe(dest('./dest'))
}

function cssTask() {
    return src('./css/**/*.css')
    .pipe(minifyCSS())
    .pipe(dest('./dest/build/css'))
}

function sassTask() {
  return src('./src/css/**/*.scss')
    .pipe(sass()).on('error', sass.logError)
    //.pipe(minifyCSS())
    .pipe(dest('./dest/build/css'))
}

function jsTask() {
  return src('src/javascript/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('./dest/build/js', { sourcemaps: true }))
}

function sassWatch() {
    watch('./css/**/*.scss', sass);
}

exports.clean = cleanTask;
exports.js = jsTask;
exports.css = cssTask;
exports.sass = sassTask;
exports.html = htmlTask;
exports.pug = pugTask;
exports.default = parallel(htmlTask, pugTask, jsTask, sassTask, cssTask);