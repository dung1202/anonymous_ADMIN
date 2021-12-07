import axios from 'axios'

let instantAxios = axios.create({
    timeout: 20000,
    baseURL: 'http://localhost:4000/'
})
instantAxios.interceptors.request.use((request) => {
    let token = localStorage.getItem('accessToken')
    request.headers['Authorization'] = 'Bearer ' + token
    return request
})
export const deleteuser = (id) => {
    return instantAxios.delete("/user/" + id);
}
export const getuser = () => {
    return instantAxios.get('/user/');
}
export const getuserid = (id) => {
    return instantAxios.get('/user/' + id);
}
export const updateuser = (body) => {
    return instantAxios.put('/user', body);
}
export const createuser = (body) => {
    return instantAxios.post('/register/', body)
}
export const createproduct = (formData) => {
    return instantAxios.post('/product', formData)
}
export const getProductid = (id) => {
    return instantAxios.get('/product/' + id)
}
export const getProduct = () => {
    return instantAxios.get('/product')
}
export const updateproduct = (body) => {
    return instantAxios.put('/product', body);
}
export const deleteProduct = (id) => {
    return instantAxios.delete('/product/' + id)
}