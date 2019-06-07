var path=require("path");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: path.resolve(__dirname, './resource/index.js'),
    output: {
        path: path.resolve(__dirname,"./bale/"),
        filename: "./js/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            outputPath:"img",
                            publicPath: '../img'
                        },
                    }
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./css/styles.css"),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ],
    devServer: {
        contentBase: path.join(__dirname, './bale'),
        compress: true,
        port: 8080
    }
};