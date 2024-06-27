import axios from "axios"

const backendBaseUrl = `http://backend:${process.env.INTERNAL_BACKEND_PORT}`;

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

export async function getCurrentUser(userToken){
    try{
        const result = await axios.get(`${backendBaseUrl}/me`, {
            headers: {
                "Authorization": `Bearer ${userToken}`
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

export async function isCurrentUserAdmin(userToken){
    const response = await getCurrentUser(userToken);
    if(response.status==200){
        return response.data.is_admin
    }
}

export async function getCurrentUserImage(userToken){
    try{
        const result = await fetch(`${backendBaseUrl}/me/img`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        if(result.ok){
            const imgLink = await result.json();
            return `http://localhost:30050/${imgLink}`
        }
    } catch(error){
        console.log(error)
    }
}

export async function getUserRecommendations(userToken) {
    try {
        const result = await fetch(`${backendBaseUrl}/me/recommendations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        });

        const response = await result.json();

        return {
            status: result.status,
            data: result.status === 200 ? response : response.detail
        }

    } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
    }
}