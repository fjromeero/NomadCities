import axios from "axios"

const backendBaseUrl = `http://backend:${process.env.BACKEND_PORT}`;

export async function createUser(data) {
    try {
        const result = await axios.post(`${backendBaseUrl}/signup`, data);
        return result.data;
    } catch (error) {
        return error.response.data.detail;
    }
}

export async function login(credentials) {

    const data = new FormData();
    data.append('username', credentials.username);
    data.append('password', credentials.password);

    try {
        const result = await axios.post(`${backendBaseUrl}/login`, data);
        return {
            status: result.status,
            data: result.data
        };

    }catch (error){
        return {
            status: error.response.status,
            data: "Incorrect username or password.",
        };
    }
}

export async function getCurrentUser(user_token){
    try{
        const result = await axios.get("http://localhost:80/me", {
            headers: {
                "Authorization": `Bearer ${user_token}`
            }
        });

        return {
            status: result.status,
            data: result.data,
        }

    }catch (error){
        return {
            status: error.response.status,
            data: error.response.data.detail,
        }
    }
}