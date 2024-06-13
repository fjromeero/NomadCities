import { useState, useEffect, useRef } from "react";

import UserTag from "../tag/UserTag";
import TagModal from "../tag/TagModal";
import { getCurrentUserTags } from "../../utils/client/usertag";

export default function CurrentUserTags({ userToken, setSuccessOnUpdate}) {
    const [tags, setTags] = useState([]);
    const modalRef = useRef();

    useEffect(() => {
        const fetchTags = async () => {
            const result = await getCurrentUserTags(userToken);
            if (result.status == 200) {
                setTags(result.data.tags)
            }
        }
        fetchTags();
    }, [userToken])

    return (
        <section className="max-w-2xl w-full p-10 justify-center">
            <header>
                <h2 className="text-xl font-bold text-white">
                    Your tags
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                    Check and edit your tags
                </p>
            </header>
            <div id="current-tags" className="mt-6 space-y-6 p-5 rounded-md border border-[#727272]">
                {tags.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="text-sm text-slate-300">
                            Not usertags assigned yet
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {tags.map((tag, index) => (
                            <UserTag name={tag.name} key={index} />
                        ))}
                    </div>
                )}
            </div>
            <div className="pt-6">
                <button onClick={() => modalRef.current.showModal()} id='tag-button' className="inline-flex items-center px-4 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                    Edit tags
                </button>
            </div>
            <TagModal ref={modalRef} tags={tags} userToken={userToken} setTags={setTags} setSuccessOnUpdate={setSuccessOnUpdate}/>
        </section>
    )
}