const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();


const cssFiles = [
   './assets/css/subscribe.css',
   './assets/css/section.css',
    './assets/css/social.css',
    './assets/css/services.css',
    './assets/css/navigation.css',
    './assets/css/nav_toggle.css',
    './assets/css/intro.css',
    './assets/css/header.css',
    './assets/css/copyright.css',
    './assets/css/card.css',
    './assets/css/button.css',
    './assets/css/adaptability.css'
]



function styles() {

   return gulp.src(cssFiles)

   .pipe(concat('m_style.css'))

   .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
   }))

   .pipe(cleanCSS({
      level: 2
   }))

   .pipe(gulp.dest('./build/css'))
   .pipe(browserSync.stream());
}


function clean() {
   return del(['build/*'])
}

function watch() {
   browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch('./assets/css/**/*.css', styles)

  gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));
gulp.task('dev', gulp.series('build','watch'));