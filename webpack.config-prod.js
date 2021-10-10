const dotenv = require('dotenv')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/build"),
    publicPath: "/",
    filename: '[name].[contenthash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  target: 'web',
  devtool: false,
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
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|gif|pdf|ico)$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|i18next|i18next-browser-languagedetector|react-i18next)[\\/]/,
          name: "reactvendor"
        },
        utilityVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: "utilityVendor"
        },
        antdVendor: {
          test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
          name: "antdVendor"
        },
        cssVendor: {
          test: /[\\/]node_modules[\\/](classnames)[\\/]/,
          name: "cssVendor"
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!lodash)(!lodash-es)(!moment)(!moment-timezone)(!node-sass)(!antd)(!@ant-design)(!classnames)[\\/]/,
          name: "vendor"
        },
      }
    },
  },
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/common/icons.js")
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
        path: '.env.prod'
      }).parsed)
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/favicon.ico', to: 'favicon.ico' },
        { from: './public/logo192.png', to: 'logo192.png' },
        { from: './public/logo512.png', to: 'logo512.png' },
        { from: './public/manifest.json', to: 'manifest.json' }
      ]
    }),
    new CompressionPlugin(),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/)
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  }
};
