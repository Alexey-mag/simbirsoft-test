module.exports = {
    lintOnSave: true,
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
