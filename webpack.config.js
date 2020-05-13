const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (env, { mode }) => {
  const inDev = mode === 'development';

  return [
    {
      devtool: 'source-map',
      entry: './src/client.js',
      output: {
        path: `${__dirname}/public`,
        filename: inDev ? '[name].js' : '[name].[contenthash].js',
      },
      module: {
        rules: [
          {
            test: /(\.js|\.jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['*', '.js', '.jsx'],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: inDev ? '[name].css' : '[name].[hash].css',
        }),
        new LiveReloadPlugin({
          delay: 400,
          appendScriptTag: true,
        }),
        new ManifestPlugin(),
      ],
    },
    {
      target: 'node',
      devtool: 'source-map',
      entry: ['source-map-support/register', './src/server.js'],
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            test: /(\.js|\.jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.(sa|sc|c)ss$/,
            loader: 'css-loader',
            options: {
              onlyLocals: true,
            },
          },
        ],
      },
      resolve: {
        extensions: ['*', '.js', '.jsx'],
      },
      plugins: [
        new NodemonPlugin({
          watch: `${__dirname}/dist`,
        }),
      ],
    },
  ];
};

// const common = {
//   devtool: 'cheap-module-source-map',
//   module: {
//     rules: [
//       {
//         test: /(\.js|\.jsx)$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//       {
//         test: /(\.s[ac]ss|\.css)$/i,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx'],
//   },
// };
// module.exports = [
//   {
//     ...common,
//     entry: './src/client',
//     output: {
//       path: `${__dirname}/public`,
//     },
//   },
//   {
//     ...common,
//     target: 'node',
//     entry: './src/server',
//     externals: [nodeExternals()],
//   },
// ];
