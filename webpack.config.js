const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/index.js'),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
};
