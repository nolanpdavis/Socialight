var webpack = require('webpack')
var path = require('path')


module.exports = {
    entry: path.resolve('./src/app.js'),
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js?$/,
                exclude: /(node_modules)/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
				test: /\.(jpg|png|svg|jpeg)$/,
				loader: 'url-loader'
			},
            {
                test: /\.(scss|css)$/,
                loader: 'style-loader!css-loader'
            },
        ]
    }
}
