const dotenv = require('dotenv')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              url: false
            },
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|pdf|ico)$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader"
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/common/icons.js")
    }
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port: 3000,
    contentBase: ['/src/', './public'],
    inline: true,
    hot: true,
    liveReload: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.config({
        path: '.env'
      }).parsed)
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/favicon.ico', to: 'favicon.ico' },
        { from: './public/logo192.png', to: 'logo192.png' },
        { from: './public/logo512.png', to: 'logo512.png' },
        { from: './public/manifest.json', to: 'manifest.json' },
      ]
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin(),
  ]
};
