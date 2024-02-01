const backendBaseUrl = `http://localhost:30050`;

export async function getCurrentUser(userToken){
    try{
        const result = await fetch(`${backendBaseUrl}/me`, {
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