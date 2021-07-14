const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {

  const backend_url = argv.mode === 'production'
    ? ''
    : 'http://localhost:3001'

  return {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    // Where files should be sent once they are bundled
    output: {
      path: path.resolve(__dirname, '/dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
      port: 3000,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      open: true,
      clientLogLevel: 'silent',
      hot: true,
      historyApiFallback: true
    },
    devtool: 'source-map',
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
          }]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            }
          ]
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        title: 'Favorite Blogs',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          BACKEND_URL: JSON.stringify(backend_url),
        },
      }),
    ],
  }
}

module.exports = config
