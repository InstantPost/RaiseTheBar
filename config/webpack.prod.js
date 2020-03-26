const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const Webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",

  bail: true,
  plugins: [
    // new Webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production")
    // }),
    new Webpack.optimize.ModuleConcatenationPlugin()
  ]
});
