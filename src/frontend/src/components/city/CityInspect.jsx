import {useState} from "react"

import ImageBento from "./ImageBento"
import ImageCarrousel from "./ImageCarrousel"
import InfoSection from "./InfoSection"
import RatingsSection from "./RatingSection"

export default function CityInspect({cityData}){
    const [cityInfo, setCityInfo] = useState(cityData.info);
    const [cityRatings, setCityRatings] = useState(cityData.ratings);
    const [cityImages, setCityImages] = useState(cityData.images);

    return (
        <div className="w-full">
            <ImageCarrousel images={cityImages} className={" responsive-city-image-min:hidden"}/>
            <header className="responsive-city-image-max:pl-6">
                <div className="max-w-7xl mx-auto responsive-city-image-max:pt-6">
                    <h1 className="text-white text-3xl font-semibold font-sans">{cityInfo.name}</h1>
                </div>
            </header>
            <ImageBento images={cityImages} className={" responsive-city-image-max:hidden"}/>
            <InfoSection cityInfo={cityInfo}/>
            <RatingsSection cityRatings={cityRatings}/>
        </div>
    )
}