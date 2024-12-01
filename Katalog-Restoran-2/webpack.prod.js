const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CssMiniExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 50000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CssMiniExtractPlugin(),
    new WebpackPwaManifest({
      name: 'Hunger app',
      short_name: 'HungerApp',
      description: 'Hunger app is a restaurant app that provides information about restaurants in Indonesia.',
      start_url: '/index.html',
      filename: 'manifest.json',
      display: 'standalone',
      background_color: '#ffffff',
      orientation: 'portrait',
      theme_color: '#2196f3',
      publicPath: '/',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/public/images/logo/restaurant.png'),
          type: 'image/png',
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('images/icons'),
          purpose: 'maskable',
        },
        {
          src: path.resolve('src/public/images/logo/restaurant.png'),
          type: 'image/png',
          size: '144x144',
          destination: path.join('images/icons'),
          purpose: 'any',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/scripts/sw.js',
      swDest: 'sw.js',
      exclude: ['/c', '/j', /.*\.DS_Store/],
    }),
  ],
});
