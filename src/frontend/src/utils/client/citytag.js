import { CLIENT_BACKEND_BASE_URL } from "./config";

export async function getAllCityTags() {
    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/citytag`, {
            method: "GET"
        });

        const data = await result.json();

        return {
            status: result.status,
            data: result.ok ? data : data.detail,
        }
    } catch (error) {
        console.log(error);
    }
}

export async function createCityTag(userToken, tagName) {
    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/citytag`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": tagName,
            }),
        });

        const data = await result.json();

        return {
            status: result.status,
            data: result.ok ? data : data.detail,
        }
    } catch (error) {
        console.log(error);
    }
}


export async function assignCityTags(userToken, cityId, tags) {
    try {
        const response = await fetch(`${CLIENT_BACKEND_BASE_URL}/citytag/${cityId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tags: tags,
            }),
        });

        const json = await response.json();

        return {
            status: response.status,
            data: response.status === 200 ? json : json.detail,
        }

    } catch (error) {
        console.error(error);
    }
}