import SuccessBanner from "../user/SuccessBanner";
import UserTagSection from "./UserTagSection";

import { useState } from "react"

export default function AdminDashboard({userToken}){
    const [successOnUpdate, setSuccessOnUpdate] = useState('');

    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto space-y-6">
                {successOnUpdate && <SuccessBanner msg={setSuccessOnUpdate}/>}
                <div className="bg-black shadow shadow-[101010] rounded-lg auth-max:pr-0">
                    <UserTagSection userToken={userToken} setSuccessOnUpdate={setSuccessOnUpdate}/>
                </div>
            </div>
        </div>
    );
}