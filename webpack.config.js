var webpack                   = require("webpack");
const path                    = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const TerserPlugin            = require('terser-webpack-plugin');
const buildPath               = path.resolve(__dirname, 'dist');
const CopyPlugin              = require("copy-webpack-plugin");
const fs                      = require('fs');
// const headerMarkup            = fs.readFileSync('./src/config/header.html').toString();
// const footerMarkup            = fs.readFileSync('./src/config/footer.html').toString();

module.exports = {
  //devtool: 'source-map',
  

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index:          './src/js/index.js', // Homepage
  },

  output: {
    filename: 'js/[name].js',
    path: buildPath
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
      watch: true
    },
    port: 9001,
    compress: true,
  },
  
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                math: 'always',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || 'http://localhost:8080'),
    }),
    new CopyPlugin({
      patterns: [
        // { from: "src/img/", to: "img/" },
        { from: "src/robots.txt", to: "robots.txt" },
        // { from: "src/font/", to: "font/" },
        // { from: "src/config/", to: "config/" },
      ],
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      title: 'In Defense of Human Made Art',
      // footerMarkup: footerMarkup,
      // headerMarkup: headerMarkup,
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  optimization: {
    minimize: true//,
    // minimizer: [
    //   new TerserPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true
    //   }),
    // ]
  }
};
