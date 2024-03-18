import { CLIENT_BACKEND_BASE_URL } from "./config";

export async function createCity(userToken, cityData){
    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/city`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cityData),
        });

        if(result.ok){
            return {
                status: 200
            }
        }else{
            const errors = await result.json();
            return {
                status: result.status,
                data: errors.detail,
            }
        }
    }catch(error){
        console.log(error)
    }
}