const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), //utilizamos esse tipo de caminho para facilitar a leitura em diferentes sistemas
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/, //todos terminados em js
        exclude: /node_modules/, //excluindo do babel
        use: {
          loader: 'babel-loader' //ferramenta para converter os arquivos js
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:[
          { loader: 'style-loader'},
          { loader: 'css-loader'},
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}