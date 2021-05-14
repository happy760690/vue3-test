import axios from 'axios'
import qs from 'qs'

const ERR_OK = 0
const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_URL : '/'

// console.log('=======>>>====:', process.env.VUE_APP_API_URL)
// const baseURL = process.env.VUE_APP_API_URL // 代理
axios.defaults.baseURL = baseURL

// 响应时间
axios.defaults.timeout = 60000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	// 在发送请求之前做某件事
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}
	/* else if (config.method === 'get') {
	   config.params = {
	     redirect_url: window.location.href.split('#')[1],
	     ...config.params
	   }
	 } */
	return config
}, (error) => {
	console.log('错误的传参', 'fail')
	return Promise.reject(error)
})

export function get(url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const serverData = res.data
    if (serverData.code === ERR_OK) {
      return serverData.result
    }
  }).catch((e) => {
    console.log(e)
  })
}
export function post(url, params) {
    return axios.post(url, {
      ...params
    }).then((res) => {
      const serverData = res.data
      if (serverData.code === ERR_OK) {
        return serverData.result
      }
    }).catch((e) => {
      console.log(e)
    })
  }
