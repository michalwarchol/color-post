const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});

module.exports = {
    entry: "./src/index.tsx",
    output: { 
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [htmlPlugin],
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            loader: "file-loader",
            options: { name: '/static/[name].[ext]' }
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    }
  };