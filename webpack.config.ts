import HtmlWebPackPlugin from "html-webpack-plugin";
import path from 'path';
import nodeExternals from "webpack-node-externals"
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});

const common = {
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

const frontend = {
    entry: "./src/index.tsx",
    output: { 
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
  };

  const backend = {
    entry: "./server/index.ts",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "backend-output.js"
    },
    target: 'node',
    externals: [nodeExternals()]
  }

  export = [
    Object.assign({}, common, frontend),
    Object.assign({}, common, backend)
  ];