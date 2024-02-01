import UpdateUserProfileForm from "./UpdateUserProfileForm";

export default function UserProfile({userToken}){
    return (
        <div>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="pr-80 bg-black shadow shadow-[101010] rounded-lg">
                    <UpdateUserProfileForm userToken={userToken}/>
                </div>
            </div>
        </div>
    );
}