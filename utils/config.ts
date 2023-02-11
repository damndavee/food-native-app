import axios from "axios";

export const spoonacularAPI = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes',
    headers: {
        "x-api-key": "0948c006d32243be9d70c19501e5221c"
    }
});

spoonacularAPI.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        // there will be an error handled by axios
        return Promise.reject(error);
    }
)