const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  // devtool: 'source-map', // this is slow
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "client", "dist"),
    compress: true,
    port: 9000
  }
};
