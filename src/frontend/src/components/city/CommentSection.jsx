import dayjs from "dayjs"
import { useRef } from "react"

import StarRating from "../ratings/StarRating"
import CommentModal from "../comment/CommentModal"

export default function CommentSection({userToken, cityId, cityName, ratings, comments, canRate}) {

    const modalRef = useRef();
    const noComments = comments.length === 0;

    const showModal = () => {
        modalRef.current.showModal();
        document.body.classList.add('overflow-y-hidden')
    }

    return (
        <section className="max-w-[1400px] mx-auto py-8 border-b border-[#DDDDDD] text-white auth-max:mx-5">
            <div className="grid grid-cols-2 gap-x-16 gap-y-12 responsive-city-image-max:flex responsive-city-image-max:flex-col">
                {
                    comments.slice(0, 8).map((comment, index) => {
                        return (
                            <div key={index} id="comment" className="w-full">
                                <header id="comment-header" className="flex flex-col gap-1 align-middle">
                                    <div id="comment-user" className="font-bold text-lg mb-1">
                                        {comment.username}
                                    </div>
                                    <div id="comment-info" className="flex items-center font-semibold">
                                        <StarRating rating={comment.rating} stars={5} className={""} starClassName="w-[1rem] h-[1rem]" />
                                        <div id="separator" className="px-[5px]">
                                            <span> - </span>
                                        </div>
                                        <div>
                                            {
                                                dayjs(comment.date).format('MMMM [of] YYYY')
                                            }
                                        </div>
                                        <div id="separator" className="px-[5px]">
                                            <span> - </span>
                                        </div>
                                        <div>
                                            {
                                                `Stayed ${comment.stay_length} days`
                                            }
                                        </div>
                                    </div>
                                </header>
                                <div id="comment-body" className="font-normal text-sm pt-3 text-balance">
                                    {
                                        comment.body
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={comments.length !== 0 && "mt-10"}>
                <button id="show-button" className="py-3 px-5 border border-white rounded-lg cursor-pointer w-fit responsive-city-image-max:w-full" onClick={() => showModal()}>
                    {comments.length !== 0 ? `Show the ${comments.length} ratings` : "Add a comment"}
                </button>
            </div>
            <CommentModal cityId={cityId} cityName={cityName} userToken={userToken} comments={comments} ratings={ratings} canRate={canRate} noComments={noComments} ref={modalRef}/>
        </section>
    )
}