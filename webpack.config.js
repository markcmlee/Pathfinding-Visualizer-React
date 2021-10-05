const path = require("path");
const webpack = require("webpack");

const mode = process.env.NODE_ENV;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode,
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "http://localhost:8080/build/",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: "/build/",
    port: 8080,
    // proxy: [
    //   {
    //     context: ["/"],
    //     target: "http://localhost:3000",
    //   },
    // ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
