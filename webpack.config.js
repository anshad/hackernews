const nodeExternals = require('webpack-node-externals');

const common = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /(\.s[ac]ss|\.css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
module.exports = [
  {
    ...common,
    entry: './src/client',
    output: {
      path: `${__dirname}/public`,
    },
  },
  {
    ...common,
    target: 'node',
    entry: './src/server',
    externals: [nodeExternals()],
  },
];
