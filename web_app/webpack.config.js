"use strict";

const path = require("path");

const buildRules = [
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["babel-preset-env"]
            }
        }
    }
];

module.exports = {
    entry: "./js/main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: buildRules
    }
};
