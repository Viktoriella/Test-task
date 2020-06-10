var gulp = require("gulp");
var server = require("browser-sync").create();
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
// var webp = require("gulp-webp");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var babel = require('gulp-babel');

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/*.{woff,woff2,svg,eot}",
    // "source/img/**"
    // "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("js", function(){
  return gulp.src("source/js/**/*.js")
  .pipe(babel({
            presets: ['@babel/env']
        }))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest("build/js"));
});

gulp.task("images", function() {
  return gulp.src("source/img/**")
  .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.svgo()
    ]))
  .pipe(gulp.dest("build/img"));
});

// gulp.task("webp", function() {
//  return gulp.src("source/img/*.{png,jpg,jpeg}")
//  .pipe(webp({quality: 75}))
//  .pipe(gulp.dest("build/img"));
// });

gulp.task("style", function() {
  return gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
        autoprefixer()
    ]))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.parallel("style"));
  gulp.watch("source/*.html", gulp.parallel("html"))
    .on("change", server.reload);
  gulp.watch("source/js/**", gulp.parallel("js"))
    .on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "copy", "images", "sprite", "style", "js", "html", "serve"));