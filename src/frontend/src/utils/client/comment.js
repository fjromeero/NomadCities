import { CLIENT_BACKEND_BASE_URL } from "./config";

export async function createCommentOnCity(userToken, idCity, comment, ratings) {
    try {
        const result = await fetch(`${CLIENT_BACKEND_BASE_URL}/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_city": idCity,
                "body": comment.comment,
                "stay_length": comment.stayLength,
                "price_per_month": comment.pricePerMonth,
                "rating": comment.avgRating,
                "internet_connection": ratings.internetConnection,
                "coworking_spaces": ratings.coworkingSpaces,
                "health_service": ratings.healthService,
                "safety": ratings.safety,
                "gastronomy": ratings.gastronomy,
                "foreign_friendly": ratings.foreignFriendly,
                "means_of_transport": ratings.meansOfTransport,
            })
        });

        const response = await result.json();

        return {
            status: result.status,
            data: result.status === 200 ? response : response.detail
        }
    } catch (error) {
        console.log(error);
    }
}