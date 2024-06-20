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

export async function updateCityData(userToken, id, cityInfo, cityImage) {
    try {
        const formData = new FormData()
        formData.append('name', cityInfo.name);
        formData.append('country', cityInfo.country);
        formData.append('continent', cityInfo.continent);
        formData.append('description', cityInfo.description);

        for(let i = 0; i < cityImage.length; i++){
            formData.append('newImages', cityImage[i]);
        }

        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/city/${id}`,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
            body: formData,
        });

        if(result.ok){
            return {
                status: 200,
            }
        }else{
            const errors = await result.json();

            return {
                status: result.status,
                data: errors.detail,
            }
        }

    } catch (error) {
        console.error('Error during fetch:', error);
        throw error; // Lanza la excepción para que pueda ser manejada por el código que llama a esta función.
    }
}

export async function searchCities(query) {
    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/search?` + new URLSearchParams({
            query: query,
        }), {
            method: 'GET',
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