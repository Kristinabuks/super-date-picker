import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { ProgressPlugin } from "webpack"
import webpack from "webpack"
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

const devServer: DevServerConfiguration = {
    port: 6006,
    open: true,
    historyApiFallback: true,
    hot: true
}
const config: webpack.Configuration = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: '[path][name]__local--[hash:base64:5]'
                        } 
                    }
                },
                "sass-loader",
            ],
        },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        mainFiles: ['index'],
        alias: {}
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Output Management',
        template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new ProgressPlugin()
    ],
    devtool: 'inline-source-map',
    devServer
};

export default config