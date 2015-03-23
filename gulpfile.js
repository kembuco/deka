// Utilities
var gulp = require("gulp");
var sync = require("browser-sync");

// Task Definitions
var browserify = require("./gulp/tasks/browserify");
var less = require("./gulp/tasks/less");

// Config
var config = require("./gulp/config");

// Task Registration
gulp.task("browserify", function () {
    return browserify.bundle(config.browserify.main);
});

gulp.task("browserify:vendor", function() {
    return browserify.bundle(config.browserify.vendor);
});

gulp.task("build", ["browserify:vendor", "browserify", "less:vendor", "less"]);

gulp.task("less", function() {
    return less(config.less.main);
});

gulp.task("less:vendor", function() {
    return less(config.less.vendor);
});

gulp.task("serve", ["watch"], function () {
    sync(config.browserSync);
});

gulp.task("watch", ["build"], function () {
    gulp.watch(config.less.main.watch, ["less"]);

    return browserify.watch(config.browserify.main);
});