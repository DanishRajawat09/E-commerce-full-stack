import axios from "axios"

const instance = axios.create({
    baseURL : "http://localhost:5500"
})

export const logIn = async(path , data) => { 
   return await instance.post(path , data , {
    withCredentials : true
   })
 }