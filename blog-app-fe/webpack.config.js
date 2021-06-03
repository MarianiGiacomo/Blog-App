const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {

  const backend_url = argv.mode === 'production'
  ? ''
  : ''

  return {
    // Where files should be sent once they are bundled
   output: {
     path: path.join(__dirname, '/dist'),
     filename: 'index.bundle.js'
   },
    // webpack 5 comes with devServer which loads in development mode
   devServer: {
     port: 3000,
     watchContentBase: true
   },
    // Rules of how webpack will take our files, complie & bundle them for the browser 
   module: {
     rules: [
       {
         test: /\.(js|jsx)$/,
         exclude: /nodeModules/,
         use: {
           loader: 'babel-loader'
         }
       },
       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
       }
     ]
   },
   plugins: [
     new HtmlWebpackPlugin({ template: './src/index.html' }),
     new webpack.DefinePlugin({
      'process.env': {
        BACKEND_URL: JSON.stringify(backend_url),
      },
    }),
    ],
  }
}

module.exports = config
