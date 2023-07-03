"use strict"

const { src, dest } = require('gulp')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssBeautify = require('gulp-cssbeautify')
const removeComments = require('gulp-strip-css-comments')
const del = require('del')
const cssNano = require('gulp-cssnano')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const rigger = require('gulp-rigger')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const panini = require('panini')
const browserSync = require('browser-sync').create()
const notify = require('gulp-notify')

const isBuild = process.argv.includes("--build");
const srcPath = 'src/'
const publicPath = 'public/'

const paths = {

    build: {
        html: publicPath,
        css: `${ publicPath }assets/css/`,
        js: `${ publicPath }assets/js/`,
        images: `${ publicPath }/assets/images/`,
        fonts: `${ publicPath }/assets/fonts/`
    },
    src: {
        html: `${ srcPath }*.html`,
        css: `${ srcPath }assets/scss/*.scss`,
        js: `${ srcPath }assets/js/*.js`,
        images: `${ srcPath }/assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
        fonts: `${ srcPath }/assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`
    },
    watch: {
        html: `${ srcPath }**/*.html`,
        css: `${ srcPath }assets/scss/**/*.scss`,
        js: `${ srcPath }assets/js/**/*.js`,
        images: `${ srcPath }/assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
        fonts: `${ srcPath }/assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`
    },
    clean: `./${ publicPath }`

}

const html = () => {
    return src(paths.src.html, { base: srcPath })
        .pipe(plumber(
            notify.onError({
                title: "HTML",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(dest(paths.build.html))
}

const css = () => {
    return src(paths.src.css, { base: `${ srcPath }assets/scss/`, sourcemaps: !isBuild })
        .pipe(plumber(
            notify.onError({
                title: "SCSS",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(cssBeautify())
        .pipe(dest(paths.build.css))
        .pipe(cssNano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(paths.build.css))
}

const js = () => {
    return src(paths.src.js, { base: `${ srcPath }assets/js/`, sourcemaps: !isBuild })
        .pipe(plumber(
            notify.onError({
                title: "JS",
                message: "Error <%= error.message %>",
            })
        ))
        .pipe(rigger())
        .pipe(dest(paths.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(paths.build.js))
}

const images = () => {
    return src(paths.src.images, { base: `${ srcPath }assets/images/` })
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(paths.build.images))
}

const clean = () => {
    return del(paths.clean)
}


exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.clean = clean