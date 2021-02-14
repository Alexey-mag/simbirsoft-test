module.exports = {
    lintOnSave: false,
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.football-data.org/v2',
                secure: false,
                logLevel: 'debug',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
