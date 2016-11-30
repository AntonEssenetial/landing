var gulp = require ('gulp');
  // connect = require ('gulp-connect');
  // jade = require ('gulp-jade');
  pug = require ('gulp-pug');
  stylus = require ('gulp-stylus');
  csso = require('gulp-csso');
  csscomb = require('gulp-csscomb');
  nib = require('nib');
  spritesmith = require('gulp.spritesmith');
  htmlPrettify = require('gulp-prettify');
  rename = require('gulp-rename');
  runSequence = require('run-sequence');
  gulpZip = require('gulp-zip');
  browserSync = require('browser-sync').create();
  watch = require ('gulp-watch');
  concat = require('gulp-concat');
  gcmq = require('gulp-combine-mq');
  // uglify = require('gulp-uglify');
  include = require('gulp-include');
  reload = browserSync.reload;


// Custom variables  
var options = {
  htmlPrettify: {
    'unformatted': ['pre', 'code'],
    'indent_with_tabs': false,
    'preserve_newlines': false,
    'brace_style': 'expand',
    'end_with_newline': false
  },
  browserSync: {
    server: {
      baseDir: './dist'
    },
    notify: false
  }
}


// Browser sync 
gulp.task('browser-sync', function() {
  return browserSync.init(options.browserSync);
});
gulp.task('bs-reload', function (cb) {
  browserSync.reload();
});


// Sprite generator
gulp.task('sprite', function() {
  var spriteData = 
    gulp.src('assets/images/sprite/*.png') 
      .pipe(spritesmith({
          imgName: 'sprite.png',
          cssName: '_sprite.styl',
          cssFormat: 'stylus',
          algorithm: 'binary-tree',
          padding: 10,
          cssTemplate: 'stylus-single.template.mustache',
          cssVarMap: function(sprite) {
              sprite.name = 'sprite-' + sprite.name
          }
      }));
  spriteData.img.pipe(gulp.dest('dist/images/')); 
  spriteData.css.pipe(gulp.dest('stylus/components/')); 
});


// Retina sprite
gulp.task('retinaSprite', function() {
  var spriteData = 
    gulp.src('assets/images/retinaSprite/*.png') 
      .pipe(spritesmith({
          retinaSrcFilter: 'assets/images/retinaSprite/*2x.png',
          imgName: 'retinaSprite.png',
          retinaImgName: 'retinaSprite2x.png',
          cssName: '_retinaSprite.styl',
          cssFormat: 'stylus',
          algorithm: 'binary-tree',
          padding: 10,
          cssTemplate: 'stylus-retina.template.mustache',
          cssVarMap: function(sprite) {
              sprite.name = 'sprite-' + sprite.name
          }
      }));
  spriteData.img.pipe(gulp.dest('dist/images/')); 
  spriteData.css.pipe(gulp.dest('stylus/components/')); 
});


// Gulp pug
gulp.task('pug', function buildHTML(cb) {
  return gulp.src('pug/*.pug')
  .pipe(pug())
  .pipe(htmlPrettify(options.htmlPrettify))
  .pipe(gulp.dest('./dist/'))
});


// Gulp stylus
gulp.task('stylus', function(cb){
  return gulp.src(['*.styl', '!_*.styl'], {cwd: 'stylus'})
    .pipe(stylus({
      use: nib()
      }))
    .pipe(gcmq({beautify: true}))
    .pipe(csscomb())
    .pipe(gulp.dest('dist/css'))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
  });


var correctNumber = function correctNumber(number) {
  return number < 10 ? '0' + number : number;
};


// Return timestamp
var getDateTime = function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = correctNumber(now.getMonth() + 1);
  var day = correctNumber(now.getDate());
  var hours = correctNumber(now.getHours());
  var minutes = correctNumber(now.getMinutes());
  return year + '-' + month + '-' + day + '-' + hours + minutes;
};


// Build zip
gulp.task('build-zip', function() {
  var datetime = '-' + getDateTime();
  var zipName = 'dist' + datetime + '.zip';

  return gulp.src('dist/**/*')
    .pipe(gulpZip(zipName))
    .pipe(gulp.dest('zip'));
});


// Zip task
gulp.task('zip', function (cb) {
  return runSequence(
    'build',
    'build-zip',
    cb
  );
});


// Buid task
gulp.task('build', function (cb) {
  return runSequence(
    'build-js',
    'pug',
    'sprite',
    'retinaSprite',
    'stylus',
    cb
  );
});


// Js combine
gulp.task('combine-modules-scripts', function (cb) {
  return gulp.src(['*.js'], {cwd: 'js/plugins'})
    .pipe(concat('plugins.js', { newLine: '\n\n' }))
    .pipe(gulp.dest('dist/js/plugins/'));
});


gulp.task('combine-scripts', function (cb) {
  return gulp.src(['*.js'], {cwd: 'js'})
    .pipe(include())
    .pipe(gulp.dest('dist/js'))
    // .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    // .pipe(gulp.dest('dist/js'));
});


gulp.task('build-js', function (cb) {
  return runSequence(
    'combine-modules-scripts',
    'combine-scripts',
    cb
  );
});


// Glup Development task
gulp.task('watch',function(){
  global.isWatching = true;


  // gulp.watch('stylus/*.styl',['stylus']).on("change", reload);
  // Modules pug
  watch('pug/*.pug', function() {
    return runSequence('pug', browserSync.reload);
  });


  // Modules stylus
  watch('stylus/**/*.styl', function() {
    return runSequence('stylus', browserSync.reload);
  });


  // Modules retinaSprite
  // watch('assets/images/retinaSprite/*.*', function() {
  //   return runSequence('retinaSprite', browserSync.reload);
  // });


  // Modules sprite
  watch('assets/images/sprite/*.*', function() {
    return runSequence('sprite', browserSync.reload);
  });


  // Modules scripts
  watch('js/**/*.js', function() {
    return runSequence('build-js', browserSync.reload);
  });
});


gulp.task('default',['watch','browser-sync','pug', 'sprite', 'retinaSprite', 'stylus', 'build-js']); 