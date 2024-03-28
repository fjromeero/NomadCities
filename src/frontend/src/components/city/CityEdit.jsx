import { useState } from "react";

import { updateCityData } from "../../utils/client/city";
import InputError from "../user/InputError";
import SuccessBanner from "../user/SuccessBanner";

export default function CityInspect({ userToken, cityData, id }) {
    const [success, setSuccess] = useState('')
    const [cityInfo, setCityInfo] = useState(cityData.info);
    const [cityImages, setCityImages] = useState(cityData.images);
    const [newCityImages, setNewCityImages] = useState([]);
    const [errors, setErrors] = useState({
        'name': '',
        'country': '',
        'continent': '',
        'description': '',
    })

    const uploadImagesHandler = (e) => {
        const files = e.target.files;
        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            newImages.push(files[i]);
        }

        setNewCityImages([...newCityImages, ...newImages]);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const newErrors = {}

        if (!cityInfo.name) {
            newErrors.name = 'The name of the city is required.'
        }

        if (!cityInfo.country) {
            newErrors.country = 'The country where the city is located is required.'
        }

        if (!cityInfo.continent) {
            newErrors.continent = 'The continent where the city is located is required.'
        }

        if (!cityInfo.description) {
            newErrors.description = 'The description of the city is required.'
        }

        setErrors(newErrors);

        if (!Object.values(newErrors).some(value => value !== '')) {
            const fetchUpdateCity = async () => {
                const response = await updateCityData(userToken, id, cityInfo, newCityImages);
                if (response.status == 200) {
                    setErrors({ 'name': '', 'country': '', 'continent': '', 'description': '' });

                    const transformFileNameToURL = (fileName) => {
                        return `http://localhost:30050/static/images/cities/${fileName}`;
                    };
                    const newImages = newCityImages.map(image => {
                        const imageUrl = transformFileNameToURL(image.name);
                        return { path: imageUrl };
                    })

                    setCityImages(prevImages => [...prevImages, ...newImages])
                    setNewCityImages([]);
                    setSuccess("Updated successfully")
                }
            }
            fetchUpdateCity();
        }
    }

    return (
        <div className="w-full mb-10">
            <header className="mb-10 auth-max:mb-0">
                <div className="py-5 pl-20 auth-max:pl-5 auth-max:py-10">
                    <a className="flex" href={"/city/" + id}>
                        <svg
                            viewBox="0 0 512 512"
                            fill="none"
                            className="w-7 h-7"
                        >
                            <path
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={48}
                                d="M328 112L184 256l144 144"
                            />
                        </svg>
                        <h1 className="text-white text-xl font-semibold font-sans">Go back to city</h1>
                    </a>
                </div>
            </header>
            <div className="max-w-7xl mx-auto pb-10 auth-max:px-10">
                <div className="max-w-3xl m-auto">
                    {success && <SuccessBanner msg={success} />}
                </div>
                <header className="max-w-3xl m-auto">
                    <div className="responsive-city-image-max:pt-6">
                        <h1 className="text-white text-3xl font-semibold font-sans">{"Edit City - " + cityInfo.name}</h1>
                    </div>
                </header>
                <div className="max-w-3xl m-auto py-5">
                    <form method="post" onSubmit={submitHandler}>
                        <div className="mt-6 space-y-3 max-w-sm">
                            <label
                                htmlFor="city-name"
                                className="block font-medium text-sm text-white"
                            >
                                City name
                            </label>
                            <input
                                id="city-name"
                                autoComplete="cityname"
                                className="appearance-none border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                                style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                                placeholder="Name of the city"
                                value={cityInfo.name}
                                onChange={(e) => {
                                    setCityInfo({
                                        name: e.target.value,
                                        country: cityInfo.country,
                                        continent: cityInfo.continent,
                                        description: cityInfo.description,
                                    })
                                }}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="mt-6 space-y-3 max-w-sm">
                            <label
                                htmlFor="city-country"
                                className="block font-medium text-sm text-white"
                            >
                                City country
                            </label>
                            <input
                                id="city-country"
                                autoComplete="citycountry"
                                className="appearance-none border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                                style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                                placeholder="Country of the city"
                                value={cityInfo.country}
                                onChange={(e) => {
                                    setCityInfo({
                                        name: cityInfo.name,
                                        country: e.target.value,
                                        continent: cityInfo.continent,
                                        description: cityInfo.description,
                                    })
                                }}
                            />
                            <InputError message={errors.country} />
                        </div>
                        <div className="mt-6 space-y-3 max-w-sm">
                            <label
                                htmlFor="city-continent"
                                className="block font-medium text-sm text-white"
                            >
                                City continent
                            </label>
                            <select
                                name="city-continents"
                                id="city-continents"
                                className="border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                                style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                                value={cityInfo.continent}
                                onChange={(e) => {
                                    setCityInfo({
                                        name: cityInfo.name,
                                        country: cityInfo.country,
                                        continent: e.target.value,
                                        description: cityInfo.description,
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
                            <InputError message={errors.continent} />
                        </div>
                        <div className="mt-6 space-y-3 max-w-lg">
                            <label
                                htmlFor="city-description"
                                className="block font-medium text-sm text-white"
                            >
                                City description
                            </label>
                            <textarea
                                placeholder="A brief description of the city"
                                className="border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white "
                                rows={12}
                                style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272", scrollbarWidth: "none" }}
                                value={cityInfo.description}
                                onChange={(e) => {
                                    setCityInfo({
                                        name: cityInfo.name,
                                        country: cityInfo.country,
                                        continent: cityInfo.continent,
                                        description: e.target.value,
                                    })
                                }}
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="mt-6 space-y-3 max-w-full">
                            <label
                                htmlFor="city-images"
                                className="block font-medium text-sm text-white"
                            >
                                City Images
                            </label>
                            <div className="grid grid-cols-3 gap-3 auth-max:grid-cols-1 justify-items-center">
                                {cityImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.path}
                                        alt={`Image ${index + 1}`}
                                        className="object-cover m-1 w-full h-56"
                                    />
                                ))}
                                {newCityImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Image ${index + 1}`}
                                        className="object-cover m-1 w-full h-56"
                                    />
                                ))}
                                <label htmlFor="city-images-input" className="m-1 w-full h-56 bg-black hover:cursor-pointer">
                                    <input id='city-images-input' type="file" className="hidden" accept="image/webp" multiple onChange={uploadImagesHandler} />
                                    <svg
                                        className="w-full h-full"
                                        viewBox="0 0 1024 1024"
                                        fill="#B7B7B7"
                                    >
                                        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                                        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <div className="mt-6 max-w-m">
                            <button id='city-edit-button' className="auth-max:w-full auth-max:justify-center auth-max:p-3 inline-flex items-center px-4 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                                Update city
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}