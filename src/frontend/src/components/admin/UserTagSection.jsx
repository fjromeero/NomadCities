import { useEffect, useState } from "react";

import UserTag from "../tag/UserTag";
import InputError from "../user/InputError";
import { getAllUserTags, createUserTag } from "../../utils/client/UserTag"

export default function UserTagSection({ userToken, setSuccessOnUpdate}) {
    const [userTags, setUserTags] = useState([]);
    const [newUserTag, setNewUserTag] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            const response = await getAllUserTags(userToken);
            if(response.status===200){
                setUserTags(response.data)
            }
        }
        fetchTags();
    }, [userToken]);

    const submitHandler = (e) => {
        e.preventDefault();
        const fetchCreateUserTag = async () => {
            const response = await createUserTag(userToken, newUserTag);
            if (response.status == 200) {
                setError("");
                setSuccessOnUpdate('Succesfully created usertag - '+response.data.name);
                setUserTags([...userTags, {
                    "name": newUserTag
                }]);
                setNewUserTag('');
            } else {
                setError(response.data)
                setSuccessOnUpdate('');
            }
        }

        fetchCreateUserTag();
    }

    return (
        <section className="max-w-3xl w-full p-10 justify-center">
            <header>
                <h2 className="text-xl font-bold text-white">
                    User tags
                </h2>
            </header>
            {error && <InputError message={error} className="pt-2"/>}
            <form onSubmit={submitHandler} className="auth-max:flex-col relative auth-max:items-start gap-6 flex w-full max-w-xl items-center pt-3">
                <div>
                    <input
                        type="text"
                        id="usertag-name"
                        placeholder="Name of the user tag"
                        className="appearance-none border-0 text-base font-normal bg-[#121212] max-w-80 p-2 rounded-md text-white "
                        style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272" }}
                        value={newUserTag}
                        onChange={(e) => {
                            setNewUserTag(e.target.value);
                        }}
                    />
                </div>
                <button id='profile-button' className="auth-max:py-2 inline-flex align-top items-center px-4 py-3 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                    Create tag
                </button>
            </form>
            <hr className="separator max-w-xl w-full mt-8 mb-5 border-t border-[#727272]" />
            <div className="w-full max-w-xl items-center">
                <p className="mt-1 text-md text-slate-300 pb-7">
                    Current existing user tags
                </p>
                <div className="relative overflow-hidden h-72 w-full rounded-md">
                    <div className="h-full w-full rounded-[inherit]" style={{ "overflow": "hidden scroll", "scrollbarWidth": "none" }}>
                        <div className="min-w-full grid gap-4 auth-max:grid-cols-2 grid-cols-4 p-4">
                            {userTags.map((userTag, index) => (
                                <UserTag key={index} name={userTag.name} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}