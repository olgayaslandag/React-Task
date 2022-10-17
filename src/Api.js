import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'xsrfHeaderName': 'X-XSRF-TOKEN',
    'withCredentials': true
};

export const LoginApi = async (path, data) => {
    try {
        const result = await axios.post(path, JSON.stringify(data));

        return {
            status: true,
            result: result.data,
            message: "Tebrikler, giriş yapıyorsunuz.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }
        if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }
    }
}

export const RegisterApi = async (path, data) => {
    const result = await axios.post(path, JSON.stringify(data));

    return result.data;
}