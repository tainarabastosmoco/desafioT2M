import axios from 'axios'

const api = axios.create({

    baseURL: 'https://localhost:44337'
})

export default api;