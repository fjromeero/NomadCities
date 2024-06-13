import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { updateCurrentUserPassword } from "../../utils/client/users";

export default function UpdateUserPasswordForm({userToken, setSuccessOnUpdate}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        const fetchUpdatePassword = async () => {
            const response = await updateCurrentUserPassword(userToken, currentPassword, newPassword);
            if(response.status != 200){
                setError(response.data);
                setSuccessOnUpdate(false);
            }else{
                setError("");
                setSuccessOnUpdate(true);
                setCurrentPassword("");
                setNewPassword("");
            }
        }
        fetchUpdatePassword();
    }

    return (
        <section className="max-w-xl p-10">
            <header>
                <h2 className="text-lg font-medium text-white">
                    Update your password
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                    Ensure your account is using a long, random password to stay secure.
                </p>
                <form onSubmit={submitHandler} className="mt-6 space-y-6">
                    <PasswordInput id="current-password" label="Current Password" value={currentPassword} error={error} setPassword={setCurrentPassword}/>
                    <PasswordInput id="new-password" value={newPassword} label="New Password" setPassword={setNewPassword}/>
                    <div>
                        <button id='password-button' className="inline-flex items-center px-4 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                            Save
                        </button>
                    </div>
                </form>
            </header>
        </section>
    );
}