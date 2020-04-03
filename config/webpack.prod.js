const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const Webpack = require("webpack");
const workboxPlugin = require("workbox-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  plugins: [
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new workboxPlugin.InjectManifest({
      swSrc: "./src/sw.js"
    })
  ]
});
