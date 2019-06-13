const gulp = require("gulp")
const stylus = require("gulp-stylus")
const pug = require("gulp-pug")
const plumber = require("gulp-plumber") // エラー時の強制終了を防止
const notify = require("gulp-notify") // エラー発生時にデスクトップ通知する
const browserSync = require("browser-sync").create()

var paths = {
  styles: "./src/stylus/**/*.styl",
  _styles: "!./src/stylus/**/_*.styl",
  views: "./src/views/**/*.pug",
  _views: "!./src/views/**/_*.pug",
  js: "./src/js/**/*.js",
}

// Styles
function styles() {
  return gulp
    .src([paths.styles, paths._styles])
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Stylus Error!", // 任意のタイトルを表示させる
          message: "<%= error.message %>", // エラー内容を表示させる
        }),
      })
    )
    .pipe(
      stylus({
        outputStyle: "compressed",
        "include css": true,
        // outputStyle: 'expanded'
      })
    )
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream())
}

// Views
function views() {
  return gulp
    .src([paths.views, paths._views])
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Pug Error!", // 任意のタイトルを表示させる
          message: "<%= error.message %>", // エラー内容を表示させる
        }),
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream())
}

// JavaScript
function js() {
  return gulp
    .src([paths.js])
    .pipe(gulp.dest("./dist/js/"))
    .pipe(browserSync.stream())
}

// Watch
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  })
  gulp.watch(paths.styles, styles)
  gulp.watch(paths.views, views)
  gulp.watch(paths.js, js)
}

gulp.task("default", gulp.series(gulp.parallel(styles, views, js, watch)))
