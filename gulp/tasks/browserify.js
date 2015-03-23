var babelify = require("babelify");
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var defaults = require("lodash.defaults");
var gif = require("gulp-if");
var gulp = require("gulp");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var watchify = require("watchify");

var browserifyError = gutil.log.bind(gutil, "Browserify Error");

function createBundler(options) {
    var bundler = browserify(options.watch ? defaults(options.bundleOptions, watchify.args) : options.bundleOptions);

    if (options.externals) {
        bundler.external(options.externals);
    }

    if (options.requires) {
        bundler.require(options.requires);
    }

    if (options.watch) {
        bundler = watchify(bundler).on("update", bundle.bind(this, bundler, options));
    }

    return bundler.transform(babelify).on("log", gutil.log);
}

function bundle(bundler, options) {
    return bundler.bundle()
        .on("error", browserifyError)
        .pipe(source(options.outfile))
        .pipe(buffer())
        .pipe(gif(options.bundleOptions.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gif(options.bundleOptions.debug, sourcemaps.write("./")))
        .pipe(gif(!options.bundleOptions.debug, uglify()))
        .pipe(gulp.dest(options.destination));
}

var bundler = {
    bundle: function(options) {
        return bundle(createBundler(defaults(options, {watch: false})), options);
    },

    watch: function(options) {
        return bundler.bundle(defaults({watch: true}, options));
    }
};

module.exports = bundler;