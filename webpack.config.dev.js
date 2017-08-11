import webpack from 'webpack';
import path from 'path';

module.exports = {
    //follow import tree of index.js (entry point) and prepare app.bundle.js according to settings
    devtool: 'inline-source-map',
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, './src/index.js'),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'app.bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],

    module: {
        rules: [
            {
                //regular expressions - sort of univeral-ish syntax used for search patterns
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {sourcemap: true}
                    }
                ]
            },
            //bootstrap related
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};