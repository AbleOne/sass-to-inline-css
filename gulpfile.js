const gulp = require('gulp');
const inlineCss = require('gulp-inline-css');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');

gulp.task('serve', () => {
	browserSync.init({
		server: ''
	})
	gulp.watch('**/**/*.html' ,['inline']).on('change', browserSync.reload)	
})

gulp.task('scss', () => {
	gulp.src('src/scss/**/*.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest('build/css/'))
	.pipe(browserSync.stream())
})


gulp.task('inline', () => {
	gulp.src('./*.html')
	.pipe(inlineCss({
		removeStyleTags: false,
		applyStyleTags: false,
		removeHtmlSelectors: false
	}))
	.pipe(gulp.dest('build/'))
});

// gulp.task('inlineImg', () => {
// 	gulp.src('./*.html')
// 	.pipe(inlineSvg({svg}))
// 	.pipe(gulp.dest('build/'))
// });

gulp.task('default', ['serve', 'scss'], () => {
	gulp.watch('./src/scss/**/*.scss', ['scss','inline'])
});