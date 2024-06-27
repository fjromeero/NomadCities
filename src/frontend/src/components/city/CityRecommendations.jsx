import Carousel from "../Carousel";

export default function CityRecommendations({recommendations, msg}) {
    return (
        <div>
            <h2 className="text-2xl font-semibold font-sans">{msg}</h2>
            <Carousel cities={recommendations}/>
        </div>
    )
}