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