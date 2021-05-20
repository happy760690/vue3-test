/*
 * 该文件是运行在 Node.js 端的，获取数据的基本的思路就是后端代理，即提供接口路由供前端页面使用，然后在路由内部，我们接收到前端请求后，再发送 HTTP 请求到第三方服务接口，携带相应的请求参数，包括签名的参数字段等等。
 * 对于从第三方接口返回的数据，我们会做一层数据处理，最终提供给前端的数据前端可以直接使用，无需再处理。这样也比较符合真实企业项目的开发规范，即数据的处理放在后端做，前端只做数据渲染和交互。
 */

// todo: 转发php请求后session貌似没生效诶。应该得传过去才行
const customHttp = require('./base')
const Formidable = require('formidable') // 处理form data
const ERR_OK = 0

const baseUrl = process.env.VUE_APP_API_URL
const form = new Formidable.IncomingForm()


// 注册后端路由
function registerRouter(app) {
  registerLogin(app)
  registerGetOthers(app)
  registerPostOthers(app)
}

function registerLogin(app){
    app.post('/api/dsp-user/login', (req, res) => {
        form.parse(req, function(err,fields,files){
            // console.log(req.url, 'path==')
            customHttp.post(baseUrl + req.url, fields).then((response) => {
                const data = response.data
                // console.log(response.data)
                if (data.code === ERR_OK) {
                    // 往前端发送一个标准格式的响应数据，包括成功错误码和数据
                    res.json(response.data || {})
                } else {
                    res.json(response.data || {})
                }
            })
        })
    
    })
}

/**
 * 所有的post请求
 * @param {*} app 
 */
function registerGetOthers(app){
    app.get('/api/*', (req, res) => {
        console.log('------进了--------------', req.url)
        console.log('===:', req.query)
        form.parse(req, function(err,fields,files){
            customHttp.get(baseUrl + req.url, fields).then((response) => {
                const data = response.data
                console.log(response.data)
                if (data.code === ERR_OK) {
                    // 往前端发送一个标准格式的响应数据，包括成功错误码和数据
                    res.json(response.data || {})
                } else {
                    res.json(response.data || {})
                }
            })
        })
    
    })
}

/**
 * 所有的post请求
 * @param {*} app 
 */
 function registerPostOthers(app){
    app.post('/api/*', (req, res) => {
        console.log('------进了--------------', req.url)
        console.log('===:', req.query)
        form.parse(req, function(err,fields,files){
            customHttp.post(baseUrl + req.url, fields).then((response) => {
                const data = response.data
                console.log(response.data)
                if (data.code === ERR_OK) {
                    // 往前端发送一个标准格式的响应数据，包括成功错误码和数据
                    res.json(response.data || {})
                } else {
                    res.json(response.data || {})
                }
            })
        })
    
    })
}

module.exports = registerRouter
