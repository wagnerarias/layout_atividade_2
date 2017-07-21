var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var minifyHTML = require("gulp-minify-html");
var del  = require("del");
var notify = require("gulp-notify");


gulp.task('apagar', function(){
	del('./dist');
});

gulp.task('c-css', function(){  
    gulp.src('./source/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('cpmf-css',['c-css'],function() {
    return gulp.src('./dist/css/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('mini-html', function() {
    var opts = {comments:true,spare:true};
    
  gulp.src('./source/index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist'))
});

gulp.task('background', function(){
	gulp.watch('./source/scss/*.scss',['cpmf-css']);
	gulp.watch('./source/*.html',['mini-html']);
});

