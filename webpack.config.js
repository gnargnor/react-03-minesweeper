const path = require('path');

module.exports = {
    //follow import tree of index.js (entry point) and prepare app.bundle.js according to settings
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.bundle.js',
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                //regular expressions - sort of univeral-ish syntax used for search patterns
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        //the env package installed via npm will transpile es2015, es2016, and es2017 to es5
                        presets: ['react', 'env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};