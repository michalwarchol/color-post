import HtmlWebPackPlugin from "html-webpack-plugin";
import path from 'path';
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});

export = {
  entry: "./src/index.tsx",
    output: { 
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
  watch: true,
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
    contentBase: path.join(__dirname, '/dist'),
    watchContentBase: true,
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api', '/auth'],  // can have multiple
        target: 'http://localhost:8080', // server and port to redirect to
        secure: false,
      },
    ],
    port: 3000,
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
  }
}