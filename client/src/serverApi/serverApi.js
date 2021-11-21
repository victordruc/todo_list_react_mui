import axios from "axios";
import {errorDispatchApp} from "./errorDispatch"

const instance = axios.create({
    baseURL: 'http://192.168.0.3:5000/api/',
  })

  instance.interceptors.request.use(config=>{
    config.headers.Authorization = localStorage.getItem("token")
    return config
  })

  instance.interceptors.response.use(null, error => {
    if (!error.response || !(error.response?.status === 401 || error.response?.status === 400)) {   
        errorDispatchApp(true)
        return Promise.reject(null)
    }
    return Promise.reject(error);
  })

export const tasksApi = {
    getTasks() {
        return instance.get("tasks").then(res=>res.data)
    },
    updateStatus(id) {
        return instance.patch(`tasks/update/${id}`,{status:true}).then(res=>res.data)
    },
    addTask(body) {
        return instance.post(`tasks`,body).then(res=>res.data)
    },
    updateTask(id,body) {
        return instance.patch(`tasks/update/${id}`,body).then(res=>res.data)
    },
    deleteTask(id) {
        return instance.delete(`tasks/delete/${id}`).then(res=>res.data)
    },
    sortTasks(type) {
        return instance.get(`tasks?sort=${type}`).then(res=>res.data)
    },
    searchTasks(string) {
        return instance.get(`tasks?search=${string}`).then(res=>res.data)
    },
}

export const userApi = {
    login(email,password) {
        return instance.post("users/login",{email,password}).then(res=>res.data)
    },
    register(email,password,repeatPassword) {
        return instance.post("users/register",{email,password,repeatPassword}).then(res=>res.data)
    },
    checkUser() {
        return instance.get("users").then(res=>res.data)
    },
    changePassword(password,repeatPassword) {
        return instance.patch("users/change-password",{password,repeatPassword}).then(res=>res.data)
    },
    delete(email,password) {
        return instance.delete(`users/delete`,{data:{email,password}} ).then(res=>res.data)
    }
}