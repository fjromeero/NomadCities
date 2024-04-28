import { forwardRef, useState } from "react";

import Modal from "../Modal";
import CommentOverview from "./CommentOverview";
import CreateComment from "./CreateComment";

const CommentModal = forwardRef(function CommentModal({ userToken, cityId, cityName, comments, ratings, canRate}, ref) {

    const [createComment, setCreateComment] = useState(false)

    const closeModal = () => {
        ref.current.close();
        document.body.classList.remove("overflow-y-hidden");
    }

    return (
        <Modal ref={ref} className="max-w-full w-full max-h-full h-full bg-[#121212]">
            <header className="sticky top-0 left-0 right-0 bg-[#121212]">
                <div className="py-5 pl-5">
                    <button onClick={() => closeModal()}>
                        <svg
                            viewBox="0 0 512 512"
                            fill="none"
                            className="w-7 h-7"
                        >
                            <path
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={48}
                                d="M328 112L184 256l144 144"
                            />
                        </svg>
                    </button>
                </div>
            </header>
            <section className="max-w-5xl m-auto text-white responsive-city-image-max:px-6">
                {
                    !createComment
                        ? <CommentOverview comments={comments} ratings={ratings} canRate={canRate} setCreateComment={setCreateComment}/>
                        : <CreateComment userToken={userToken} cityId={cityId} cityName={cityName} setCreateComment={setCreateComment}/>
                }
            </section>
        </Modal>
    )

})

export default CommentModal