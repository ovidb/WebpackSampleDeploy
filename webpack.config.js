var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom',
  'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // look at the sum of dependencies and stash them into vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      // avoid clearing cached vendor bundle
      names: ['vendor','manifest']
    }),
    // generate dist html based on our template
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // make sure react doesn't take all the error checking in the consideration
    // while in production
    // use defineplugin to define variables on the window scope variable
    new webpack.DefinePlugin({
      'proces.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
