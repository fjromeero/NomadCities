import { useEffect, useState } from "react";
import { getAllCityTags, createCityTag } from "../../utils/client/citytag";
import UserTag from "../tag/UserTag";
import InputError from "../user/InputError";

export default function CityTagSection({ userToken, setSuccessOnUpdate }) {
    const [cityTags, setCityTags] = useState([]);
    const [newCityTag, setNewCityTag] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const fetchCreateCityTag = async () => {
            const response = await createCityTag(userToken, newCityTag);
            if (response.status === 200) {
                setError('');
                setSuccessOnUpdate('Successfully created city tag - ' + newCityTag);
                setCityTags([...cityTags, { "name": newCityTag }]);
                setNewCityTag('');
            } else {
                setError(response.data);
                setSuccessOnUpdate('');
            }
        }
        fetchCreateCityTag();
    }

    useEffect(() => {
        const fetchCityTags = async () => {
            const response = await getAllCityTags();
            if (response.status === 200) {
                setCityTags(response.data);
            }
        }

        fetchCityTags();
    }, [userToken]);

    return (
        <section className="max-w-3xl w-full p-10 justify-center">
            <header>
                <h2 className="text-xl font-bold text-white">
                    City Tags
                </h2>
            </header>
            {error && <InputError message={error} className="pt-2" />}
            <form onSubmit={submitHandler} className="auth-max:flex-col relative auth-max:items-start gap-6 flex w-full max-w-xl items-center pt-5 pb-10">
                <div>
                    <input
                        type="text"
                        id="usertag-name"
                        placeholder="Name of the user tag"
                        className="appearance-none border-0 text-base font-normal bg-[#121212] max-w-80 p-2 rounded-md text-white "
                        style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                        value={newCityTag}
                        onChange={(e) => { setNewCityTag(e.target.value) }}
                    />
                </div>
                <button id='profile-button' className="auth-max:py-2 inline-flex align-top items-center px-4 py-3 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                    Create tag
                </button>
            </form>
            <div className="w-full max-w-xl items-center py-5 border-t border-[#727272]">
                <p className="mt-1 text-md text-slate-300 pb-7">
                    Current existing city tags
                </p>
                <div className="relative overflow-hidden h-72 w-full rounded-md">
                    <div className="h-full w-full rounded-[inherit]" style={{ "overflow": "hidden scroll", "scrollbarWidth": "none" }}>
                        <div className="min-w-full grid gap-4 auth-max:grid-cols-2 grid-cols-4 p-4">
                            {cityTags.map((userTag, index) => (
                                <UserTag key={index} name={userTag.name} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}