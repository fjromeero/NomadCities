import { CLIENT_BACKEND_BASE_URL } from "./config";

export async function getAllUserTags(userToken){
    try{
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/usertag`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        });

        if(result.ok){
            const tags = await result.json();
            return {
                status: 200,
                data: tags
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

export async function createUserTag(userToken, name){
    try{
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/usertag`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name
            }),
        });

        if(result.ok){
            const tag = await result.json();
            return {
                status: 200,
                data: tag,
            }
        }else{
            const errors = await result.json();
            return {
                status: result.status,
                data: errors.detail
            }
        }

    }catch(error){
        console.log(error)
    }
}

export async function getCurrentUserTags(userToken){
    try{
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/usertag/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        })

        if(result.ok){  
            const tags = await result.json()
            return {
                status: 200,
                data: tags,
            }
        }else{
            return {
                status: result.status,
            }
        }
    }catch(error){
        console.log(error)
    }
}

export async function addCurrentUserTags(userToken, newTags){
    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/usertag/me/add`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags: newTags }), // Pasar las etiquetas dentro de un objeto con la clave "tags"
        });

        if (result.ok) {
            return {
                status: 200,
            };
        } else {
            return {
                status: result.status,
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export async function removeCurrentUserTags(userToken, removedTags) {
    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/usertag/me/remove`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags: removedTags }), // Pasar las etiquetas dentro de un objeto con la clave "tags"
        });

        if (result.ok) {
            return {
                status: 200,
            };
        } else {
            return {
                status: result.status,
            };
        }
    } catch (error) {
        console.log(error);
    }
}