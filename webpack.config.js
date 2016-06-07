var webpack = require('webpack');

module.exports = {
  //entry: "index.js",
  output: {
    filename: "app.js" //./app-[hash].js
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ],
  node: {
    fs: "empty"
  },
  devtool: 'source-map'
};
