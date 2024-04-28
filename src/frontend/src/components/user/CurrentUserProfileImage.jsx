import { useState, useEffect } from "react"

import { getCurrentUserImage, updateCurrentUserImage } from "../../utils/client/users"

export default function CurrentUserProfileImage({ userToken, setSuccessOnUpdate}){

    const [userAvatar, setUserAvatar] = useState('')

    useEffect(() => {
        const fetchImage = async () => {
            const response = await getCurrentUserImage(userToken);
            setUserAvatar(response);
        }

        fetchImage();
    }, [userAvatar])

    const handleOnChange = (e) => {
        const fetchUpdateImage = async (file) => {
            const response = await updateCurrentUserImage(userToken, file);
            setUserAvatar(response);
        }

        const file = e.target.files[0];
        if(file!==undefined){
            fetchUpdateImage(file);
            setSuccessOnUpdate(true);
        }
    }

    return (
        <section className="max-w-2xl w-full p-10 justify-center">
            <header>
                <h2 className="text-xl font-bold text-white">
                    Profile avatar
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                    Update your profile avatar
                </p>
            </header>
            <div className="mt-6 flex gap-10">
                <div className="relative flex h-28 w-28 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full" src={userAvatar}/>
                </div>
                <div className="pt-10">
                    <label className="inline-flex items-center px-4 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                        <input type="file" className="hidden" accept="image/*" onChange={handleOnChange}/>
                        Change avatar
                    </label>
                </div>
            </div>
        </section>
    )
}