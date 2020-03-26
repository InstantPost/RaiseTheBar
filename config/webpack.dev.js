const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const Webpack = require("webpack");
module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-eval-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js"
  },
  devServer: {
    inline: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
});
