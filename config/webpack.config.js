const path = require('path');

const isProdBuild = process.env.production || process.env.PRODUCTION;
const PUBLIC_PATH = process.env.PUBLIC_PATH;

if (isProdBuild) {
    console.log('JS Production build');
} else {
    console.log('JS Development build');
}

let staticPath = PUBLIC_PATH + '/static/build/';
console.log('Setting JS Static Path to:', staticPath);

const config = {
    mode: isProdBuild ? 'production' : 'development',

    entry: isProdBuild
        ? [path.join(__dirname, '../src/index.js')]
        : ['react-hot-loader/patch', path.join(__dirname, '../src/index.js')],

    output: {
        path: path.resolve(__dirname, '../static', 'build'),
        publicPath: staticPath,
        filename: 'index.js',
    },

    resolve: {
        modules: [path.resolve('./src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
    },

    watchOptions: {
        ignored: /node_modules/,
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: { loader: 'eslint-loader' },
                enforce: 'pre',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.cssm$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isProdBuild ? false : true,
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isProdBuild ? false : true,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'raw-loader',
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    limit: 100000,
                },
            },
        ],
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname, '../static'),
        compress: true,
        port: 9000,
        host: '0.0.0.0',
        index: 'index.html',
    },
};

module.exports = config;
