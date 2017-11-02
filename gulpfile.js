var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector');

//定义css、js文件路径，是本地css,js文件的路径，可自行配置    
var cssUrl = ['../**/**/*.css', '!../gulp/*.css', '!../gulp/node_modules/**/*.css'];
var jsUrl = ['../**/**/*.js','!../gulp/*.js','!../gulp/node_modules/**/*.js'];
var htmlUrl = '../application/views/admin/';
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function () {
  return gulp.src(cssUrl)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function () {
  return gulp.src(jsUrl)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});

//Html替换css、js文件版本
gulp.task('revHtml', function () {
  return gulp.src(['rev/**/*.json', htmlUrl + '*.php'])
      .pipe(revCollector())
      .pipe(gulp.dest(htmlUrl));
});

//开发构建
gulp.task('dev', function (done) {
  condition = false;
  runSequence(
    ['revCss'], ['revJs'], ['revHtml'],
    done);
});

gulp.task('default', ['dev']);