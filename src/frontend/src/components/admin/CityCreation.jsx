import { useState } from "react";

import { createCity } from "../../utils/client/city";
import InputError from "../user/InputError";

export default function CityCreation({ userToken, setSuccessOnUpdate }) {

    const [cityData, setCityData] = useState({
        'name': '',
        'country': '',
        'continent': '',
        'description': '',
    })

    const [errors, setErrors] = useState({
        'name': '',
        'country': '',
        'continent': '',
        'description': '',
    })

    const submitHandler = (e) => {
        e.preventDefault();

        const newErrors = {...errors}
    
        if(!cityData.name){
            newErrors.name = 'The name of the city is required.'
        }

        if(!cityData.country){
            newErrors.country = 'The country where the city is located is required.'
        }
        
        if(!cityData.continent){
            newErrors.continent = 'The continent where the city is located is required.'
        }
        
        if(!cityData.description){
            newErrors.description = 'The description of the city is required.'
        }

        setErrors(newErrors);

        if(!Object.values(cityData).some(value => value === '')){
            const fetchUpdateData = async () => {
                const response = await createCity(userToken, cityData);
                if(response.status == 200){
                    setErrors({'name': '','country': '','continent': '','description': ''});
                    setCityData({'name': '','country': '','continent': '','description': ''});
                    setSuccessOnUpdate(`New city with name ${cityData.name} created successfully!`);
                }else{
                    if(response.status==400){
                        setErrors({'name': response.data,'country': '','continent': '','description': ''});
                    }
                }
            }
            fetchUpdateData();
        }
    }

    return (
        <section className="max-w-xl p-10">
            <header>
                <h2 className="text-xl font-bold text-white">
                    City creation
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                    Create a city given its name, country, continent and a brief description
                </p>
            </header>
            <form className="mt-6 space-y-6 max-w-sm" onSubmit={submitHandler}>
                <div>
                    <label
                        htmlFor="city-name"
                        className="block font-medium text-sm text-white pb-3"
                    >
                        City name
                    </label>
                    <input
                        id="city-name"
                        autoComplete="cityname"
                        className="appearance-none border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                        style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                        placeholder="Name of the city"
                        value={cityData.name}
                        onChange={(e) => {
                            setCityData({
                                name: e.target.value,
                                country: cityData.country,
                                continent: cityData.continent,
                                description: cityData.description,
                            })
                        }}
                    />
                    <InputError message={errors.name} className="pt-2"/>
                </div>
                <div>
                    <label
                        htmlFor="city-country"
                        className="block font-medium text-sm text-white pb-3"
                    >
                        City country
                    </label>
                    <input
                        id="city-country"
                        autoComplete="citycountry"
                        className="appearance-none border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                        style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                        placeholder="Country of the city"
                        value={cityData.country}
                        onChange={(e) => {
                            setCityData({
                                name: cityData.name,
                                country: e.target.value,
                                continent: cityData.continent,
                                description: cityData.description,
                            })
                        }}
                    />
                    <InputError message={errors.country} className="pt-2"/>
                </div>
                <div>
                    <label
                        htmlFor="city-continent"
                        className="block font-medium text-sm text-white pb-3"
                    >
                        City continent
                    </label>
                    <select
                        name="city-continents"
                        id="city-continents"
                        className="border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                        style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                        value={cityData.continent}
                        onChange={(e) => {
                            setCityData({
                                name: cityData.name,
                                country: cityData.country,
                                continent: e.target.value,
                                description: cityData.description,
                            })
                        }}
                    >
                        <option className="hidden" value=""></option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                    <InputError message={errors.continent} className="pt-2"/>
                </div>
                <div>
                    <label
                        htmlFor="city-description"
                        className="block font-medium text-sm text-white pb-3"
                    >
                        City description
                    </label>
                    <textarea
                        placeholder="A brief description of the city"
                        className="border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white "
                        rows={8}
                        style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272", scrollbarWidth: "none" }}
                        onChange={(e) => {
                            setCityData({
                                name: cityData.name,
                                country: cityData.country,
                                continent: cityData.continent,
                                description: e.target.value,
                            })
                        }}
                        value={cityData.description}
                    />
                    <InputError message={errors.description} className="pt-2"/>
                </div>
                <div>
                    <button id='citycreation-button' className="inline-flex items-center px-4 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                        Create city
                    </button>
                </div>
            </form>
        </section>
    )
}