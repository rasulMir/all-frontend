
const { src, dest, watch, parallel, series } = require('gulp');


const scss				= require('gulp-sass') (require('sass'));
const concat			= require('gulp-concat');
const browserSync 	= require('browser-sync');
const uglify			= require('gulp-uglify-es').default;
const autoprefixer 	= require('gulp-autoprefixer');
const del				= require('del');
const pug				= require('gulp-pug');

function pugjade() {
	return src('app/pug/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(dest('app'))
		.pipe(browserSync.stream())
}

function browsersync() {
	browserSync.init({
		server : {
			baseDir: 'app/'
		},
		online: true,
		notify: false
	});
}

function cleanDist() {
	return del('dist')
}

function libs() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/slick-carousel/slick/slick.js',
	])
	.pipe(concat('libs.js'))
	.pipe(uglify())
	.pipe(dest('app/js'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'app/js/script.js'
	])
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js'))
	.pipe(browserSync.stream())
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 versions']
		}))
		.pipe(dest('app/css/'))
		.pipe(browserSync.stream())
}

function build() {
	return src([
		'app/css/**/*.css',
		'app/fonts/**/*',
		'app/js/libs.js',
		'app/js/script.min.js',
		'app/*.html',
		'app/icomoon/**/*',
		'app/pug/**/*',
		'app/images/**/*',
		'app/scss/**/*'
	], {base:'app'})
		.pipe(dest('dist'))
}

function watching() {
	watch(['app/pug/**/*.pug'], pugjade);
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/script.min.js'], scripts);
	watch('app/*.html').on('change', browserSync.reload);
}

exports.styles			= styles;
exports.watching 		= watching;
exports.browsersync 	= browsersync;
exports.scripts 		= scripts;
exports.libs 			= libs;
exports.cleanDist 	= cleanDist;
exports.pugjade		= pugjade;

exports.build 			= series(cleanDist, build);

exports.default 		= parallel(pugjade, styles, browsersync, watching, libs, scripts);