var path = require("path");

var build = "./build";
var source = "./src";
var vendor = "./vendor";

var development = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

var externals = [
    "react",
    "react-router"
];

module.exports = {
    browserify: {
        main: {
            destination: build,
            externals: externals,
            outfile: "main.js",

            bundleOptions: {
                debug: development,
                entries: [path.resolve(source, "main.jsx")],
                extensions: [".jsx"]
            }
        },

        vendor: {
            destination: build,
            outfile: "vendor.js",
            requires: externals,

            bundleOptions: {
                debug: development
            }
        }
    },

    browserSync: {
        files: [path.resolve(build, "**")],
        notify: false,
        server: "."
    },

    less: {
        main: {
            debug: development,
            destination: build,
            entries: [path.resolve(source, "main.less")],
            outfile: "main.css",

            watch: [
                path.resolve(source, "**/*.less")
            ]
        },

        vendor: {
            destination: build,
            entries: [path.resolve(vendor, "vendor.less")],
            outfile: "vendor.css",
            debug: development
        }
    }
};