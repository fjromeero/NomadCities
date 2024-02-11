import { CLIENT_BACKEND_BASE_URL } from "./config";

export async function getCurrentUser(userToken){
    try{
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/me`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        if(result.ok){
            // Gets status code 200
            const userData = await result.json();
            return {
                status: result.status,
                data: userData,
            }
        }else{
            // Gets error status code from the api
            return {
                status: result.status,
            };
        }
    } catch(error){
        console.log(error)
    }
}

export async function updateCurrentUserProfile(userToken, userData){
    try{
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/me`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if(result.ok){
            return {status: 200};
        }else{
            const errors = await result.json();
            return {
                status: result.status,
                data: errors.detail,
            };
        }
    }catch(error){
        console.log(error);
    }
}

export async function updateCurrentUserPassword(userToken, currentPassword, newPassword){
    try{
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/me/change-password`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "current_password": currentPassword,
                "new_password": newPassword,
            }),
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
    }catch(error){
        console.log(error)
    }
}