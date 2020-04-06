const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dotenv = require("dotenv");
const Webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
function getEnv() {
  console.log(process.env.NODE_ENV);
  const env = dotenv.config({
    path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
  }).parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  console.log("UPDATED");
  return new Webpack.DefinePlugin(envKeys);
}

module.exports = {
  entry: { app: path.resolve(__dirname, "../src/index.js") },
  output: {
    path: path.join(__dirname, "../dist"),
    // .[contentHash].
    filename: `bundle${
      process.env.NODE_ENV != "development" ? ".[contentHash]." : "."
    }js`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
    getEnv(),
    new MiniCssExtractPlugin({
      filename: "css/main.[contentHash].css",
    }),
    new WebpackPwaManifest({
      name: "RaiseTheBar",
      short_name: "RTB",
      description: "Raise the bar placeholder",
      background_color: "#ffffff",
      crossorigin: "use-credentials",
      icons: [
        {
          src: path.resolve("android-chrome-192x192.png"),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
  ],
  mode: "development",
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"]
      // },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // options: {
            //   name: "css/main.[contentHash].css"
            // }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          // options: {
          //   attrs: [":data-src"]
          // }
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
            plugins: [
              "transform-async-to-generator",
              "@babel/plugin-transform-arrow-functions",
              "@babel/plugin-transform-template-literals",
              "@babel/plugin-transform-classes",
            ],
            sourceType: "unambiguous",
          },
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "url-loader",
          {
            loader: "image-webpack-loader",
            options: {
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    // port: 8080,
    // contentBase: ["./src", "./dist"], // both src and output dirs
    inline: true,
    // hot: true
  },
};
