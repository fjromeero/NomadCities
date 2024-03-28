const backendBaseUrl = `http://backend:${process.env.INTERNAL_BACKEND_PORT}`;

export async function getCityDetails(userToken, id) {
    try {
        const result = await fetch(`${backendBaseUrl}/city?` + new URLSearchParams({
            city_id: id,
        }), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        });

        if (result.ok) {
            const json = await result.json();

            const cityData = {
                info: {
                    name: json.name,
                    country: json.country,
                    continent: json.continent,
                    description: json.description,
                },
                ratings: {
                    avgRating: json.avg_rating,
                    avgPricePerMonth: json.avg_price_per_month,
                    avgInternetConnection: json.avg_internet_connection,
                    avgCoworkingSpaces: json.avg_coworking_spaces,
                    avgHealthService: json.avg_health_service,
                    avgSafety: json.avg_safety,
                    avgGastronomy: json.avg_gastronomy,
                    avgMeansOfTransport: json.avg_means_of_trasnsport,
                    avgForeignFriendly: json.avg_foreign_friendly,
                },
                images: json.images.map(obj => {
                    return {
                        "path": 'http://localhost:30050/' + obj.path
                    };
                }),
            }
            return {
                status: 200,
                data: cityData,
            }
        } else {
            const errors = await result.json();
            return {
                status: result.status,
                data: errors.detail,
            };
        }

    } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
    }
}