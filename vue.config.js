const registerRouter = require('./backend/router')

module.exports = {
    css: {
        loaderOptions: {
          sass: {
            // 全局引入变量和 mixin
            additionalData: `
              @import "@/assets/scss/variable.scss";
              @import "@/assets/scss/mixin.scss";
            `
          }
        }
    },
    devServer: {
      clientLogLevel: 'debug',

      before(app) {
            registerRouter(app)
        }
    },
    configureWebpack: {
      devtool: 'source-map'
    },
    productionSourceMap: false,
}
