var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();
var path    = require('path');
var webpack = require('webpack-stream');

var production = false;
var workingPath = './app';
var paths = {
  outputDist: path.resolve(workingPath, 'assets'),
  sources: {
    scripts: path.resolve(workingPath, 'scripts/**/*.js'),
    styles : path.resolve(workingPath, 'styles/**/*.styl'),
  },
  scripts: {
    entry : path.resolve(workingPath, 'scripts/index.js')
  },
  styles: {
    entry : path.resolve(workingPath, 'styles/index.styl')
  },
}

var handleError = function(e) {
  console.log(e.stack || e.toString());
  return this.emit('end');
};


/*----------------------------------
 *  Task: Minify CSS
 *----------------------------------*/
gulp.task('minify:css', function() {
  var s = plugins.stylus({
    use: require('nib')(),
    compress: true,
    'include css': true
  })
  .on('error', handleError);
  return gulp.src(paths.styles.entry)
    .pipe(plugins.if(!production, plugins.sourcemaps.init()))
    .pipe(s)
    .pipe(plugins.if(!production, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(paths.outputDist));
});


/*----------------------------------
 *  Task: Webpack
 *----------------------------------*/
gulp.task('webpack', function() {
  return gulp.src(paths.scripts.entry)
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', function(){this.emit('end')})
    .pipe(gulp.dest(paths.outputDist));
});


/*----------------------------------
 *  Task: Enable LiveReload
 *----------------------------------*/
gulp.task('livereload:start', function() {
  return plugins.connect.server({
    root: ['.', workingPath],
    port: 9002,
    livereload: true,
    middleware: function() {
      var express = require('express');
      var app = express();
      app.use(express.static(path.join(__dirname, 'app'), { maxAge:3600 }));
      app.use('/', function(req, res, next) {
        res.sendFile(path.resolve(__dirname, 'app/index.html'));
      });
      return [app];
    }
  });
});


/*----------------------------------
 *  Task: For Develop
 *----------------------------------*/
gulp.task('dev', ['webpack', 'minify:css', 'livereload:start'], function() {
  var watched = path.resolve(paths.outputDist, '*.*');
  gulp.watch(paths.sources.scripts, ['webpack']);
  gulp.watch(paths.sources.styles, ['minify:css']);
  gulp.watch(watched, function() {
    return gulp.src(watched)
      .pipe(plugins.connect.reload());
  });
});


/*----------------------------------
 *  Task: For Build
 *----------------------------------*/
gulp.task('build', ['webpack', 'minify:css']);
