import UpdateUserProfileForm from "./UpdateUserProfileForm";
import UpdateUserPasswordForm from "./UpdateUserPasswordForm";
import SuccessBanner from "./SuccessBanner";
import { useState } from "react";

export default function UserProfile({userToken}){

    const [successOnUpdate, setSuccessOnUpdate] = useState(false);

    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto space-y-6">
                {successOnUpdate && <SuccessBanner msg={"Perfil guardado"}/>}
                <div className="pr-80 bg-black shadow shadow-[101010] rounded-lg auth-max:pr-0">
                    <UpdateUserProfileForm userToken={userToken} setSuccessOnUpdate={setSuccessOnUpdate}/>
                </div>
                <div className="pr-80 bg-black shadow shadow-[101010] rounded-lg auth-max:pr-0">
                    <UpdateUserPasswordForm userToken={userToken} setSuccessOnUpdate={setSuccessOnUpdate}/>
                </div>
            </div>
        </div>
    );
}