/*
 * 该文件是运行在 Node.js 端的，获取数据的基本的思路就是后端代理，即提供接口路由供前端页面使用，然后在路由内部，我们接收到前端请求后，再发送 HTTP 请求到第三方服务接口，携带相应的请求参数，包括签名的参数字段等等。
 * 对于从第三方接口返回的数据，我们会做一层数据处理，最终提供给前端的数据前端可以直接使用，无需再处理。这样也比较符合真实企业项目的开发规范，即数据的处理放在后端做，前端只做数据渲染和交互。
 */
const axios = require('axios')
const qs = require('qs')
const Formidable = require('formidable') // 处理form data
const ERR_OK = 0

const url = process.env.VUE_APP_API_URL
const form = new Formidable.IncomingForm()


// 公共参数
const commonParams = {
  loginUin: 0,
  hostUin: 0,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  needNewCode: 0,
  format: 'json',
  platform: 'yqq.json'
}

let headerInfo = {
    referer: process.env.VUE_APP_API_URL,
    origin: process.env.VUE_APP_API_URL,
    'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8'
}
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	// 在发送请求之前做某件事
	if (config.method === 'post') {
        console.log(qs.stringify(config.data), 'qs后的')
		config.data = qs.stringify(config.data)
	}
	return config
}, (error) => {
	console.log('错误的传参', 'fail')
	return Promise.reject(error)
})

// 对 axios get 请求的封装
// 修改请求的 headers 值，合并公共请求参数
function get(url, params) {
  return axios.get(url, {
    headers: headerInfo,
    params: Object.assign({}, commonParams, params)
  })
}

// 对 axios post 请求的封装
// 修改请求的 headers 值
function post(url, data) {
    console.log(data, '请求参数====')
  return axios.post(url, {
      ...data
  }, {
    headers: headerInfo,
    // params: Object.assign({}, commonParams, params)
  }).catch((e) => {
    console.log(e)
  })
}

// 注册后端路由
function registerRouter(app) {
  registerLogin(app)
//   registerGetOthers(app)
}

function registerLogin(app){
    app.post('/api/dsp-user/login', (req, res) => {
        form.parse(req, function(err,fields,files){
            console.log(req.url, 'path==')
            post(url + req.url, fields).then((response) => {
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

// function registerGetOthers(app){
//     app.get('/api/dsp-user/login', (req, res) => {
//         form.parse(req, function(err,fields,files){
//             get(url + 'api/dsp-user/login', fields).then((response) => {
//                 const data = response.data
//                 console.log(response.data)
//                 if (data.code === ERR_OK) {
//                     // 往前端发送一个标准格式的响应数据，包括成功错误码和数据
//                     res.json(response.data || {})
//                 } else {
//                     res.json(response.data || {})
//                 }
//             })
//         })
    
//     })
// }

module.exports = registerRouter
