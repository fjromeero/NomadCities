import { forwardRef, useState, useEffect } from "react";

import Modal from "../Modal";
import UserTag from "./UserTag";
import { getAllUserTags, addCurrentUserTags, removeCurrentUserTags } from "../../utils/client/UserTag";

const TagModal = forwardRef(function TagModal({ tags, userToken, setTags, setSuccessOnUpdate }, ref) {
    const [assignedTags, setAssignedTags] = useState(tags);
    const [newTags, setNewTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [removedTags, setRemovedTags] = useState([]);

    useEffect(() => {
        setAssignedTags(tags);
    }, [tags]);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await getAllUserTags(userToken);
            if (response.status === 200) {
                const allTags = response.data;
                setAvailableTags(allTags.filter(tag => !assignedTags.some(assignedTag => tag.name === assignedTag.name)));
            }
        };
        fetchTags();
    }, [userToken, assignedTags]);

    const handleConfirmClick = () => {
        const fetchAddTags = async () => {
            const result = await addCurrentUserTags(userToken, newTags);
            if (result.status === 200) {
                setTags(assignedTags);
                setNewTags([]);
                setSuccessOnUpdate(true)
            }
        };

        const fetchRemoveTags = async () => {
            const result = await removeCurrentUserTags(userToken, removedTags);
            if(result.status === 200){
                setTags(assignedTags)
                setRemovedTags([]);
                setSuccessOnUpdate(true)
            }
        };

        if(newTags.length!=0){
            fetchAddTags();
        }
        
        if(removedTags.length!=0){
            fetchRemoveTags();
        }
        ref.current.close();
    };

    const handleCancelClick = () => {
        if (newTags.length != 0) {
            setAssignedTags(assignedTags.filter(tag => !newTags.some(newTag => tag.name === newTag.name)));
            setAvailableTags([...availableTags, ...newTags]);
            setNewTags([]);
        }else if(removedTags.length != 0){
            setAvailableTags(availableTags.filter(tag => !removedTags.some(removedTag => tag.name === removedTag.name)));
            setAssignedTags([...assignedTags, ...removedTags]);
            setRemovedTags([]);
        }
        ref.current.close();
    };

    const handleClickAvailable = (index) => {
        setNewTags([...newTags, availableTags[index]]);
        setAssignedTags([...assignedTags, availableTags[index]]);
        setAvailableTags(prevTags => prevTags.filter((_, i) => i !== index));
    };

    const handleClickAssigned = (index) => {
        setRemovedTags([...removedTags, assignedTags[index]]);
        setAvailableTags([...availableTags, assignedTags[index]]);
        setAssignedTags(prevTags => prevTags.filter((_, i) => i !== index));
    }

    return (
        <Modal ref={ref}>
            <section className="max-w-2xl w-full p-10 bg-[#121212]">
                <header>
                    <h2 className="text-xl font-bold text-white">
                        Edit user tags
                    </h2>
                    <p className="mt-1 text-sm text-slate-300">
                        Add or remove user tags
                    </p>
                </header>
                <hr className="separator mt-7 border-t border-[#292929]" />
                <div className="pt-6">
                    <header className="pb-5">
                        <h2 className="text-md font-bold text-white">
                            Assigned tags
                        </h2>
                    </header>
                    <div>
                        {assignedTags.length === 0 ? (
                            <div className="flex justify-center">
                                <p className="text-sm text-slate-300">
                                    Not usertags assigned yet
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-4">
                                {assignedTags.map((tag, index) => (
                                    <button onClick={() => handleClickAssigned(index)} key={index} >
                                        <UserTag name={tag.name} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <hr className="separator mt-7 border-t border-[#292929]" />
                <div className="pt-6">
                    <header className="pb-5">
                        <h2 className="text-md font-bold text-white">
                            Available Tags
                        </h2>
                    </header>
                    <div>
                        {availableTags.length === 0 ? (
                            <div className="flex justify-center">
                                <p className="text-sm text-slate-300">
                                    Not usertags assigned yet
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-4">
                                {availableTags.map((tag, index) => (
                                    <button onClick={() => handleClickAvailable(index)} key={index}>
                                        <UserTag name={tag.name} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <hr className="separator mt-7 border-t border-[#292929]" />
                <div className="pt-6 flex gap-5">
                    <button onClick={() => handleConfirmClick()} id='confirm-button' className="inline-flex items-center px-4 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                        Confirm
                    </button>
                    <button onClick={() => handleCancelClick()} id='cancel-button' className="inline-flex items-center px-4 py-2 bg-red-700 border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150">
                        Cancel
                    </button>
                </div>
            </section>
        </Modal>
    )
});

export default TagModal;