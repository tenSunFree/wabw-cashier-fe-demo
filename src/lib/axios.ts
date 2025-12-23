import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Print full request info
    const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`
    console.groupCollapsed(
      `%c[HTTP Request] ${String(config.method).toUpperCase()} ${fullUrl}`,
      'font-weight:bold;',
    )
    console.log('apiClient, request, method:', config.method)
    console.log('apiClient, request, url:', fullUrl)
    console.log('apiClient, request, params:', config.params)
    console.log('apiClient, request, headers:', config.headers)
    console.log('apiClient, request, data(body):', config.data)
    console.groupEnd()
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    const { config } = response
    const fullUrl = `${config.baseURL ?? ''}${config.url ?? ''}`
    console.groupCollapsed(
      `apiClient, response, %c[HTTP Response] ${response.status} ${String(config.method).toUpperCase()} ${fullUrl}`,
      'font-weight:bold;',
    )
    console.log('apiClient, response, status:', response.status)
    console.log('apiClient, response, headers:', response.headers)
    console.log('apiClient, response, data(body):', response.data)
    console.groupEnd()
    return response
  },
  (error) => {
    // ✅ Print full error info
    if (axios.isAxiosError(error)) {
      const config = error.config
      const fullUrl = config
        ? `${config.baseURL ?? ''}${config.url ?? ''}`
        : '(no config)'

      console.groupCollapsed(
        `apiClient, response, error, %c[HTTP Error] ${String(config?.method).toUpperCase()} ${fullUrl}`,
        'font-weight:bold;color:#b91c1c;',
      )
      console.log('apiClient, response, error, message:', error.message)
      console.log('apiClient, response, error, code:', error.code)
      console.log('apiClient, response, error, request headers:', config?.headers)
      console.log('apiClient, response, error, request data(body):', config?.data)
      console.log('apiClient, response, error, response status:', error.response?.status)
      console.log('apiClient, response, error, response headers:', error.response?.headers)
      console.log('apiClient, response, error, response data(body):', error.response?.data)
      console.groupEnd()
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      setTimeout(() => {
        window.location.href = '/auth/sign-in'
      }, 1300)
    }
    return Promise.reject(error)
  },
)

export default apiClient
