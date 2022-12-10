import axios from 'axios';
import { CONFIG } from './untils';

const appAxios = axios.create({
    baseURL: CONFIG.API_URL,
    headers:{
        "Content-Type":"application/json",
    },
});


appAxios.interceptors.request.use(
    function (config){
        const user=localStorage.getItem("user");
        if(user){
            const parseUser = JSON.parse(user);
            config.headers['Authorization']=parseUser.accessToken
        };
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

appAxios.interceptors.request.use(
    function (response){
        return response;
    }, async function(error){

        if(error.response && error.response.status === 403){
            const originalconfig= error.config
            originalconfig.headers = {...originalconfig.headers}
            const user  = localStorage.getItem("user");
            let refreshToken
            let parseUser
            if(user){
                parseUser = JSON.parse(user);
                refreshToken= parseUser.refreshToken;
            }
            if(refreshToken){
                const refreshTokenData = await appAxios.post('auth/refreshToken',{refreshToken})
                originalconfig.headers['Authorization'] =refreshTokenData.data.body.data
                parseUser.accessToken =refreshTokenData.data.body.data
                localStorage.setItem('user',JSON.stringify(parseUser))
            }
        }
        return Promise.reject(error);
    }
)

export default appAxios;

