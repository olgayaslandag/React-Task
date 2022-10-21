import axios from "axios";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'xsrfHeaderName': 'X-XSRF-TOKEN',
    'withCredentials': true
}




export const LoginApi = async (data) => {
    try {
        const result = await axios.post('/api/auth/login', JSON.stringify(data));

        return {
            status: true,
            result: result.data,
            message: "Tebrikler, giriş yapıyorsunuz.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: error.response.data.errors ?? null,
                message: typeof error.response.data === "string" ? error.response.data : "Giriş yapılamadı!"
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}

export const RegisterApi = async (data) => {
    try {
        const result = await axios.post('api/auth/register', JSON.stringify(data));
        return {
            status: true,
            result: result.data,
            message: "Tebrikler, kaydınız başarıyla gerçekleştirildi.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: error.response.data.errors,
                message: "Kayıt işlemi başarısız!"
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}

export const TasksApi = async (token) => {
    axios.defaults.headers.Authorization = token

    try {
        const result = await axios.get('api/task');
        return {
            status: true,
            result: result.data,
            message: null,
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
    
}

export const NewTasksApi = async (data, token) => {
    axios.defaults.headers.Authorization = token

    try {
        const result = await axios.post("api/task", JSON.stringify(data));
        return {
            status: true,
            result: result.data,
            message: "Task sisteme başarılı bir şekilde eklendi.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
    
}

export const DelTasksApi = async (id, token) => {
    axios.defaults.headers.Authorization = token

    try {
        const result = await axios.delete('api/task/' + id);
        return {
            status: true,
            result: result.data,
            message: "Task sistemden başarılı bir şekilde silindi.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}

export const getTaskApi = async (id, token) => {
    axios.defaults.headers.Authorization = token;
    try {
        const result = await axios.get("api/task/" + id);
        return {
            status: true,
            result: result.data,
            message: null,
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}

export const EditTasksApi = async (id, data, token) => {
    axios.defaults.headers.Authorization = token

    try {
        const result = await axios.put("api/task/" + id, JSON.stringify(data));
        return {
            status: true,
            result: result.data,
            message: "Task sisteme başarılı bir şekilde eklendi.",
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
    
}

export const UsersApi = async (token) => {
    axios.defaults.headers.Authorization = token;
    try {
        const result = await axios.get("api/user");
        return {
            status: true,
            result: result.data,
            message: null,
        };
    } catch(error){
        if(error.response){
            return {
                status: false,
                result: null,
                message: error.response.data
            }
        }else if(error.request){
            return {
                status: false,
                result: null,
                message: error.message
            }
        }else{
            return {
                status: false,
                result: null,
                message: "Bir sorun oluştu!"
            }
        }
    }
}