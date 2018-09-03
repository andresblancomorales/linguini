const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
      new MiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(arguments.mode)
        },
        GUSTEAU_URL: isDevMode ? "'http://localhost:81'" : "'http://www.gusteau.com'"
      }),
      new webpack.optimize.SplitChunksPlugin({
        names: ['login'],
        minChunks: Infinity,
      })
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
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        }
      ],
    },
  }
};
