import Card from "./Card"
import { useState, useEffect } from "react"

export default function Carousel({cities}) {
    const [firstCityIndex, setFirstCityIndex] = useState(0);
    const [numberCitiesShown, setNumberCitiesShown] = useState(5); // Ajusta el número de ciudades mostradas según sea necesario

    useEffect(() => {
        const updateNumberCitiesShown = () => {
            const width = window.innerWidth;
            if (width <= 600) {
                setNumberCitiesShown(1);
            } else if (width <= 950) {
                setNumberCitiesShown(2);
            } else if (width <= 1250) {
                setNumberCitiesShown(3);
            } else if (width <= 1775) {
                setNumberCitiesShown(4);
            } else {
                setNumberCitiesShown(5);
            }
        };

        updateNumberCitiesShown();
        window.addEventListener('resize', updateNumberCitiesShown);

        return () => {
            window.removeEventListener('resize', updateNumberCitiesShown);
        };
    }, []);

    const visibleCities = cities.concat(cities).slice(firstCityIndex, firstCityIndex + numberCitiesShown);

    const clickNext = () => {
        setFirstCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    };

    const clickPrevious = () => {
        setFirstCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
    };

    return (
        <div className={"w-full h-max px-10 main-5:px-0 flex flex-column text-white"}>
            <button onClick={clickPrevious} className={"self-center text-3xl cursor-pointer hidden main-2:block"}>{"<"}</button>
            <div
                className={
                    "gap-x-8 gap-y-14 grid grid-cols-main-1 auto-rows-main py-5 px-10 main-4:px-5 " +
                    "main-2:grid-cols-main-2 " +
                    "main-3:grid-cols-main-3 " +
                    "main-4:grid-cols-main-4 " +
                    "main-5:grid-cols-main-5 "
                }
            >
                {visibleCities.map((city) => (
                    <Card 
                        key={city.id} 
                        id={city.id}
                        name={city.name} 
                        country={city.country} 
                        avg_price={city.avg_price_per_month} 
                        avg_rating={city.avg_rating} 
                        image={city.image.path}
                    />
                ))}
            </div>
            <button onClick={clickNext} className={"self-center text-3xl cursor-pointer hidden main-2:block"}>{">"}</button>
        </div>
    );
}