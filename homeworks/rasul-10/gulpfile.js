
const {src, dest, parallel, watch} = pkg;
import pkg from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import server from 'browser-sync';
import sass from 'gulp-dart-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import minify from 'gulp-jsmin';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import imagemin from 'gulp-imagemin';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import fs from 'fs-extra';


const pugfiles = () => {
	return src('app/*.pug')
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	}))
	.pipe(dest('./app'))
};

const serve = () => {
	server.init({
		server: { baseDir: 'app/' }
	});
};

const styles = () => {
	return src('app/scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 10 version'],
		grid: true
	}))
	.pipe(concat('style.min.css'))
	.pipe(sourcemaps.write('../maps'))
	.pipe(dest('./app/css'))
	.pipe(server.stream({match: '**/*.css'}));
};

const styleLibs = () => {
	return src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/wowjs/css/libs/animate.css'
	])
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(concat('libs.css'))
	.pipe(dest('./app/libs'))
};

const scripts = () => {
	return src('app/js/*.js')
	.pipe(plumber())
	.pipe(minify())
	.pipe(dest('app/js/min-js/'))
};

const libMasonry = () => {
	return src('node_modules/masonry-layout/dist/masonry.pkgd.js')
	.pipe(concat('libs-masonry.js'))
	.pipe(plumber())
	.pipe(minify())
	.pipe(dest('app/libs'))
};

const libs = () => {
	return src('node_modules/slick-carousel/slick/slick.js')
	.pipe(concat('libs-slick.js'))
	.pipe(plumber())
	.pipe(minify())
	.pipe(dest('app/libs'))
};

const libsSecond = () => {
	return src([
		'node_modules/jquery/dist/jquery.js',
	])
	.pipe(concat('libs-jquery.js'))
	.pipe(plumber())
	.pipe(minify())
	.pipe(dest('app/libs'))
};

const libsThird = () => {
	return src([
		'node_modules/imagesloaded/imagesloaded.pkgd.js',
	])
	.pipe(concat('libs-im-loaded.js'))
	.pipe(plumber())
	.pipe(minify())
	.pipe(dest('app/libs'))
};

const fontsStyle = () => {
	let file_content = fs.readFileSync('app/scss/_fonts.scss');
	if (file_content == '') {
		fs.writeFile('app/scss/_fonts.scss', '', cb);
		return fs.readdir('dist/fonts/', function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
					fs.appendFile('app/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
				c_fontname = fontname;
				}
			}
		})
	}
};

const cb = () => {};

const watcher = () => {
	watch('app/**/*.pug', pugfiles).on('change', server.reload);
	watch('app/**/*.scss', styles).on('change', server.reload);
	watch(['app/js/**/*.js','!app/js/min-js/*.js'], scripts).on('change', server.reload);
};

const cleanDist = () => {
	return del('dist')
};

const imgCompr = () => {
	return src('app/images/**')
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(dest('./dist/images/'))
};

const fonts = () => {
	src('app/fonts/*.ttf')
	.pipe(ttf2woff())
	.pipe(dest('./dist/fonts'));
	return src('app/fonts/*.ttf')
	.pipe(ttf2woff2())
	.pipe(dest('./dist/fonts/'));
};

const build = () => {
	return src([
		'app/css/**/*.css',
		'app/scss/**/*.scss',
		'app/fonts/**/*',
		'app/js/**/*',
		'app/*.html',
		'app/icomoon/**/*',
		'app/libs/**/*',
		'app/pug/**/*',
		'app/*.pug'
	], {base:'app'})
		.pipe(dest('dist'))
};

export {cleanDist};
export {imgCompr};
export {build};

export default parallel(
	watcher,
	pugfiles,
	styleLibs,
	styles,
	libs,
	libsSecond,
	scripts,
	serve,
	fonts,
	fontsStyle,
	libMasonry,
	libsThird
);