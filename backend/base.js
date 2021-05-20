/*
 * 该文件是运行在 Node.js 端的，获取数据的基本的思路就是后端代理，即提供接口路由供前端页面使用，然后在路由内部，我们接收到前端请求后，再发送 HTTP 请求到第三方服务接口，携带相应的请求参数，包括签名的参数字段等等。
 * 对于从第三方接口返回的数据，我们会做一层数据处理，最终提供给前端的数据前端可以直接使用，无需再处理。这样也比较符合真实企业项目的开发规范，即数据的处理放在后端做，前端只做数据渲染和交互。
 */
const axios = require('axios')
const qs = require('qs')

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

let headerInfo = {
    referer: process.env.VUE_APP_API_URL,
    origin: process.env.VUE_APP_API_URL,
    'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8'
}

// 公共参数
const commonParams = {
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    needNewCode: 0,
    format: 'json',
  }
  
  

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
    return axios.post(url, {
        ...data
    }, {
      headers: headerInfo,
      // params: Object.assign({}, commonParams, params)
    }).catch((e) => {
      console.log(e)
    })
  }

  module.exports = { post, get }