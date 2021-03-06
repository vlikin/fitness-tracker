var paths = {
  lib: ['src/init.js', 'src/lib/**/*.js', 'src/end.js'],
  sass: {
    compile: './build/css/',
    watch: './src/sass/**/*.sass'
  },
  jade: {
    compile: './build/html/',
    watch: './src/jade/**/*.jade'
  },
  coffee: {
    ui: {
      watch: ['./src/coffee/ui/init.coffee', './src/coffee/ui/lib/**/*.coffee', './src/coffee/ui/end.coffee'],
      compile: ''
    }
  }
};


var gulp = require('gulp'),
    concat = require('gulp-concat'), // It concats files to a single file.
    sourcemaps = require('gulp-sourcemaps'), // Inline maps are embedded in the source file.
    uglify = require('gulp-uglify'), // Minify JavaScript with UglifyJS2.
    ngAnnotate = require('gulp-ng-annotate'), // Add angularjs dependency injection annotations with ng-annotate.
    plumber = require('gulp-plumber'), // Prevent pipe breaking caused by errors from gulp plugins.
    watch = require('gulp-watch'), // Watch, that actually is an endless stream.
    sass = require('gulp-sass'), // Sass.
    coffee = require('gulp-coffee'), // CoffeeScript.
    jade = require('gulp-jade'); // Jade template engine.


gulp.task('coffee', function() {
  gulp.src(paths.coffee.ui.watch)
    .pipe(coffee())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js/'))
});

gulp.task('compile_app', function () {
  // It does not work as designed yet. @todo.resolve
  return gulp.src(paths.lib)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    //.pipe(ngAnnotate())
    //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function () {
  gulp.src(paths.sass.watch)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.sass.compile));
});

gulp.task('compile_3pjs', function () {
  gulp.src([
      './bower_components/underscore/underscore.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-aria/angular-aria.js',
      './bower_components/angular-messages/angular-messages.js',
      './bower_components/angular-translate/angular-translate.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-material/angular-material.js',

      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/jquery/dist/jquery.js',
      './bower_components/d3/d3.js',
      // @todo resolve moment
      './bower_components/n3-line-chart/build/line-chart.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('./build/js/3p.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(paths.jade.watch)
    .pipe(plumber())
    .pipe(jade({
      pretty: true,
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(paths.jade.compile));
});

gulp.task('compile_3pcss', function () {
  gulp.src([
    './bower_components/angular-material/angular-material.css'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('./build/css/3p.css'))
    //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  //gulp.watch(paths.lib, ['compile_app']);
  gulp.watch(paths.jade.watch, ['jade']);
  //gulp.watch(paths.sass.watch, ['compass']);
  gulp.watch(paths.sass.watch, ['sass']);
  gulp.watch(paths.coffee.ui.watch, ['coffee']);
});
