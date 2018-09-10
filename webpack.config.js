const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env, arguments) => {
  const isDevMode = arguments.mode !== 'production';
  console.log('dev mode', isDevMode);

  return {
    target: 'web',
    entry: {
      poly: 'babel-polyfill',
      login: './src/login.js',
      linguini: './src/linguini.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: isDevMode ? undefined : [new UglifyJsPlugin()]
    },
    resolve: {
      extensions: ['.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/assets/template.html',
        filename: 'login/index.html',
        inject: 'body',
        chunks: ['poly', 'login']
      }),
      new HtmlWebpackPlugin({
        template: './src/assets/template.html',
        filename: 'index.html',
        inject: 'body',
        chunks: ['poly', 'linguini']
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(arguments.mode)
        },
        GUSTEAU_URL: isDevMode ? "'http://localhost:3000'" : "'http://www.gusteau.com'"
      }),
      new webpack.optimize.SplitChunksPlugin({
        names: ['login'],
        minChunks: Infinity,
      }),
      new OfflinePlugin({
        relativePaths: false,
        publicPath: '/',
        appShell: '/'
      }),
      new WebpackPwaManifest({
        name: 'Linguini',
        short_name: 'Linguini',
        description: 'A cookbook',
        background_color: '#fafafa',
        theme_color: '#8fa08d'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(s*)css$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {import: true, url: true}
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ],
    },
  }
};
