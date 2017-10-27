const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    './src/ClientApp.jsx'
  ],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {enforce: 'pre', test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/},
      {test: /\.jsx?$/, loader: 'babel-loader'},
      {test: /\.scss$/, use: [
        {loader: 'style-loader'},
        {loader: 'css-loader', options: {sourceMap: true}},
        {loader: 'sass-loader', options: {sourceMap: true}},
      ]}
    ],
  },
  devServer: {
    hot: true,
    publicPath: '/public/',
    historyApiFallback: true, // let react router handle all the routes
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
//    new ExtractTextPlugin({ // define where to save the file
//      filename: '/public/[name].bundle.css',
//      allChunks: true,
//    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.entry = './src/ClientApp.jsx';
  delete config.devtool;
  delete config.plugins;
}

module.exports = config;
