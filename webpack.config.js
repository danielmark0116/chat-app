const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const envValue = env || 'production';

  let optimizationObject = {
    minimize: envValue === 'development' ? false : true
  };

  let pluginsArray = [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ];

  const babelPlugins = ['@babel/plugin-proposal-class-properties'];

  return {
    mode: envValue,
    entry: './client/index.tsx',
    optimization: optimizationObject,
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'app.bundle.js'
    },
    devServer: {
      port: 3000,
      proxy: {
        '/socket.io': {
          target: 'http://localhost:8000',
          ws: true
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }], // other loader configuration goes in the array
          resolve: { extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'] }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            plugins:
              envValue === 'development'
                ? [...babelPlugins, 'react-hot-loader/babel']
                : babelPlugins
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            { loader: 'css-modules-typescript-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: pluginsArray
  };
};
