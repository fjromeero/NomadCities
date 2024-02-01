import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/client/users";

export default function UpdateUserProfileForm({ userToken }) {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCurrentUser(userToken);
            if(result.status == 200){
                setUserData(result.data);
            }
        }

        fetchData();

    }, [userToken]);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <section className="max-w-3xl p-10">
            <header>
                <h2 className="text-lg font-medium text-white">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                    Update your account's profile information and email address
                </p>
            </header>
            <form
                className="mt-6 space-y-6"
                onSubmit={submitHandler}
            >
                <div>
                    <label
                        htmlFor="profile-username"
                        className="block font-medium text-sm text-white pb-3"
                    >
                        Username
                    </label>
                    <input 
                        type="text" 
                        autoComplete="username"
                        id="profile-username"
                        className="appearance-none border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                        style={{inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272"}}
                        value={userData.username}
                        onChange={(e) => {
                            setUserData({
                                username: e.target.value,
                                email: userData.email,
                            })
                        }}
                    />
                </div>
                <div>
                    <label
                        htmlFor="profile-email"
                        className="block font-medium text-sm text-white pb-3"
                    >
                        Email
                    </label>
                    <input 
                        type="text" 
                        autoComplete="email"
                        id="profile-email"
                        className="appearance-none border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                        style={{inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272"}}
                        value={userData.email}
                        onChange={(e) => {
                            setUserData({
                                username: userData.username,
                                email: e.target.value,
                            })
                        }}
                    />
                </div>
                <div>
                    <button className="inline-flex items-center px-4 py-2 bg-slate-400 border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
}