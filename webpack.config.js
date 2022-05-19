const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index-bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      enums: path.resolve(__dirname, './src/enums'),
      pages: path.resolve(__dirname, './src/pages'),
      styles: path.resolve(__dirname, './src/styles'),
      assets: path.resolve(__dirname, './src/assets'),
      store: path.resolve(__dirname, './src/store'),
      helpers: path.resolve(__dirname, './src/helpers'),
      types: path.resolve(__dirname, './src/types'),
      hooks: path.resolve(__dirname, './src/hooks'),
      errors: path.resolve(__dirname, './src/errors'),
      logic: path.resolve(__dirname, './src/logic'),
      __mocks__: path.resolve(__dirname, './src/__mocks__'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(wav|mp3)$/,
        use: ['url-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/assets/icons/favicon.ico') },
        {
          from: path.resolve(__dirname, './src/assets/sounds'),
          to: path.resolve(__dirname, './dist/assets/sounds'),
          toType: 'dir',
        },
      ],
    }),
  ],
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    port: 9000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  };
}

module.exports = config;
