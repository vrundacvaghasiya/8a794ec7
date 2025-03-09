const HtmlWebPackPlugin = require("html-webpack-plugin");
const path=require("path")

module.exports = {
  entry: './src/index.js', // Your main JS entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  performance: {
    maxEntrypointSize: 600000, // Set a higher limit (e.g., 1MB) for the entry point
    maxAssetSize: 600000, // Set a higher limit (e.g., 1MB) for assets
    hints: "warning", // You can set this to 'error' or 'none' if you prefer no warnings or errors
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
};
