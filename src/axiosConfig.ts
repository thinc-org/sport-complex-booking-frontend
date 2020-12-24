import Axios from 'axios'
import { getCookie } from './core/contexts/cookieHandler'


export const client = Axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
client.interceptors.request.use((req) => {
    if (!req.headers.Authorization) {
        const token = getCookie('token')
        req.headers.Authorization = `Bearer ${token}`
        return req
    }
    else return req
}, error => Promise.reject(error))
