import axios, {AxiosRequestConfig} from 'axios';
import Router from 'next/router';


const api = axios.create({
  baseURL: 'http://localhost:3333',

});

api.interceptors.request.use(response => {
  console.log(response);

  if(response.url == '/usuario/login' || 
     response.url == 'usuario'){
    return response;
  }

  if(!localStorage.getItem("id_usuario")){

    alert('É preciso estar logado no sistema!');

    Router.push('/');
    
  }

  return response;
});


export default api;