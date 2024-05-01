import { useEffect, useState } from "react";

import { getAllCityTags } from "../../utils/client/citytag";

export default function TagAssignation({userToken, setTagAssignation, confirmCreation, cancelCreation}) {

    const [cityTags, setCityTags] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);

    useEffect(() => {
        const fetchCityTags = async () => {
            const response = await getAllCityTags();
            if (response.status === 200) {
                setCityTags(response.data);
                setTagSelected(Array(response.data.length).fill(false));
            }
        }
        fetchCityTags()
    }, [userToken]);

    const handleSelect = (index) => {
        const updatedTagSelected = [...tagSelected];
        updatedTagSelected[index] = !updatedTagSelected[index];
        setTagSelected(updatedTagSelected);
        setTagAssignation(cityTags.filter((tag, i) => updatedTagSelected[i]).map(tag => tag));
    }

    return (
        <div className="w-full m-auto flex flex-col gap-20 py-20">
            <header>
                <h1 className="text-3xl font-bold">Assign descriptive tags to the city</h1>
                <p className="pt-4 text-lg">Share your experience by assigning descriptive tags to the city</p>
            </header>
            <div className="grid main-5:grid-cols-2 main-3:grid-cols-3 grid-cols-5 gap-7">
                {
                    cityTags.map((tag, index) => (
                        <div
                            key={index}
                            className={`flex p-2 justify-center items-center rounded-full cursor-pointer ${tagSelected[index] ? 'border-transparent shadow-tag-selected' : 'border-white/75 border-2'}`}
                            onClick={() => handleSelect(index)}
                        >
                            <p title={tag.name} className={`text-lg text-ellipsis overflow-hidden whitespace-nowrap ${tagSelected[index] ? 'text-white font-bold' : 'text-white/75 '}`}>{tag.name}</p>
                        </div>
                    ))
                }
            </div>
            <div className="flex gap-5">
                <button onClick={() => confirmCreation()} id='next-button' className="inline-flex items-center px-8 py-4 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-[#453f96] transition ease-in-out duration-150">
                    Finish
                </button>
                <button onClick={() => cancelCreation()} id='cancel-button' className="inline-flex items-center px-8 py-4 bg-red-700 border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-red-800 transition ease-in-out duration-150">
                    Cancel
                </button>
            </div>
        </div>
    )
}