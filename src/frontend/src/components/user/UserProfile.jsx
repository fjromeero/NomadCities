import UpdateUserProfileForm from "./UpdateUserProfileForm";
import SuccessBanner from "./SuccessBanner";
import { useState } from "react";

export default function UserProfile({userToken}){

    const [successOnUpdate, setSuccessOnUpdate] = useState(false);

    return (
        <div>
            <div className="max-w-7xl mx-auto space-y-6">
                {successOnUpdate && <SuccessBanner/>}
                <div className="pr-80 bg-black shadow shadow-[101010] rounded-lg">
                    <UpdateUserProfileForm userToken={userToken} setSuccessOnUpdate={setSuccessOnUpdate}/>
                </div>
            </div>
        </div>
    );
}