var autoprefixer = require("gulp-autoprefixer");
var errorHandler = require("../util/errorHandler");
var gif = require("gulp-if");
var gulp = require("gulp");
var less = require("gulp-less");
var minify = require("gulp-minify-css");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

module.exports = function(options) {
    var maps = options.debug !== false;

    return gulp.src(options.entries)
        .pipe(gif(maps, sourcemaps.init()))
        .pipe(less())
        .pipe(minify())
        .pipe(autoprefixer({cascade: false, browsers: ["last 2 versions"]}))
        .on("error", errorHandler)
        .pipe(gif(maps, sourcemaps.write()))
        .pipe(rename(options.outfile))
        .pipe(gulp.dest(options.destination));
};