const backendBaseUrl = `http://backend:${process.env.INTERNAL_BACKEND_PORT}`;

export async function getCommentsFromCity(userToken, cityId) {
    try {
        const result = await fetch(`${backendBaseUrl}/comments/${cityId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        })

        const response = await result.json();

        return {
            status: result.status,
            data: result.status === 200 ? response : response.detail
        }
    } catch (error) {
        console.log(error);
    }
}