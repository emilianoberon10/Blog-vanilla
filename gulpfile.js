// Initialize modules
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create()

// Use dart-sass for @use
//sass.compiler = require('dart-sass');

// Sass Task
function scssTask() {
  return src('scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }))
}

// JavaScript Task
function jsTask() {
  return src('js/script.js', { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }))
}

// Watch Task
function watchTask() {
  watch(['scss/**/*.scss', '/**/*.js'], series(scssTask, jsTask))
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, watchTask)

// Build Gulp Task
exports.build = series(scssTask, jsTask)
