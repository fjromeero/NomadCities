import {useState} from "react"

import ImageBento from "./ImageBento"
import ImageCarrousel from "./ImageCarrousel"
import InfoSection from "./InfoSection"
import RatingsSection from "./RatingSection"

export default function CityInspect({cityData, isAdmin, id}){
    const [cityInfo, setCityInfo] = useState(cityData.info);
    const [cityRatings, setCityRatings] = useState(cityData.ratings);
    const [cityImages, setCityImages] = useState(cityData.images);

    return (
        <div className="w-full">
            <ImageCarrousel images={cityImages} className={" responsive-city-image-min:hidden"}/>
            <header className="max-w-7xl mx-auto flex justify-between auth-max:items-center">
                <div className="responsive-city-image-max:hidden">
                    <h1 className="text-white text-3xl font-semibold font-sans">{cityInfo.name}</h1>
                </div>
                {
                    isAdmin && (
                        <a href={"/city/" + id + "/edit"} className="responsive-city-image-max:mt-6 auth-max:h-1/2 auth-max:w-20 auth-max:p-3 px-7 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150 text-center">
                            Edit
                        </a>
                    )
                }
            </header>
            <ImageBento images={cityImages} className={" responsive-city-image-max:hidden"}/>
            <InfoSection cityInfo={cityInfo}/>
            <RatingsSection cityRatings={cityRatings}/>
        </div>
    )
}