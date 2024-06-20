import { useState, useEffect } from "react"

import Card from "../Card";
import CityRecommendations from "./CityRecommendations";
import SearchBar from "../SearchBar";

import { searchCities } from "../../utils/client/city";

export default function CitiesShowcase({ cities, userRecommendations , authenticated}) {

    const [searchQuery, setSearchQuery] = useState('');
    const [citiesShown, setCitiesShown] = useState(cities);

    useEffect(() => {
        const search = async () => {
            if (searchQuery !== '') {
                const response = await searchCities(searchQuery);
                if (response.status === 200) {
                    setCitiesShown(response.data);
                }
            }
        }
        search();
    }, [searchQuery]);

    return (
        <div className="flex flex-col items-center max-w-main w-full py-5 px-10 main-4:px-5">

            <SearchBar setQuery={setSearchQuery}/>

            {
                searchQuery === '' && userRecommendations.length > 0 &&
                    <div className="border-b border-[#DDDDDD] text-white mx-10 pb-14 main-4:mx-0">
                        <CityRecommendations recommendations={userRecommendations} msg={"Based on your preferences you may like..."}/>
                    </div>
            }

            <div
                className={
                    "gap-x-8 gap-y-14 grid grid-cols-main auto-rows-main p-20 main-4:px-0 " +
                    "main-1:grid-cols-main-1 " +
                    "main-2:grid-cols-main-2 " +
                    "main-3:grid-cols-main-3 " +
                    "main-4:grid-cols-main-4 " +
                    "main-5:grid-cols-main-5 "
                }
            >

                {
                    citiesShown.map((city, index) => (
                        <Card 
                            key={index}
                            id={city.id}
                            authenticated={authenticated}
                            name={city.name}
                            country={city.country}
                            avg_price={city.avg_price_per_month}
                            avg_rating={city.avg_rating}
                            image={city.image.path}
                        />
                    ))
                }
            </div>
        </div>
    )
}