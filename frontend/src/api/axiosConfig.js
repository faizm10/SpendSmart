import axios from "axios";
import {AppActions, AppStore} from "./AppActions";

const axiosInstance = axios.create({
    //baseURL: "http://localhost:8080", // Change to the actual API URL when deploying
    //baseURL:'http://52.14.50.30:8080',
    baseURL: 'https://zs9abnuh59.execute-api.us-east-2.amazonaws.com'
});

// **Request Interceptor**: Attach Authorization token before requests
axiosInstance.interceptors.request.use(
    async (config) => {
        // Ensure token is fetched from localStorage
        const authToken= localStorage.getItem("token");

        config.url.contains
        console.log(config)
        console.log(authToken)

        
        // ======================WARNING==================================
        // Bug: this still sets the token despite the token being null. Causing 401 errors when public apis are called
        if (authToken) {
            console.log('token is valid: ' + authToken)
            config.headers.Authorization = `Bearer ${authToken}`;
        } else {
            delete config.headers.Authorization;
            console.log(config.headers)
            console.log('token is invalid: ' + authToken)

        }
        // Hotfix: removing token when calling movies and auth api, will do for now. 
        if (config.url.startsWith("/api/v1/movies")) {
            delete config.headers.Authorization;
            console.log("Skipping Authorization for Movies API:", config.url);
        }
        if (config.url.startsWith("/auth")) {
            delete config.headers.Authorization;
            console.log("Skipping Authorization for auth API:", config.url);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// **Response Interceptor** (Optional: Handle 401 Unauthorized errors)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized! Redirecting to login...");
            
            // Handle logout or redirection logic here (e.g., clear token, redirect to login page)

          

            // Redirect user to login page

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;


