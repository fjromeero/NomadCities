import { CLIENT_BACKEND_BASE_URL } from "./config";

export async function createCity(userToken, cityData, cityImages){

    const formData = new FormData();

    formData.append('name', cityData.name);
    formData.append('country', cityData.country);
    formData.append('continent', cityData.continent);
    formData.append('description', cityData.description);

    for(let i = 0; i < cityImages.length; i++){
        formData.append('images', cityImages[i]);
    }

    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/city`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
            body: formData,
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