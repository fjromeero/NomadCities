import RatingScores from "../ratings/RatingScores";
import StarRating from "../ratings/StarRating";
import dayjs from "dayjs";

export default function CommentOverview({ comments, ratings }) {
    return (
        <div className="grid grid-cols-comments-modal gap-8 responsive-city-image-max:flex responsive-city-image-max:flex-col pb-10">
            <div
                className={
                    "pr-4 " +
                    " responsive-city-image-min:h-min responsive-city-image-min:sticky responsive-city-image-min:top-[74px] " +
                    " responsive-city-image-max:overflow-x-auto responsive-city-image-max:pb-4 responsive-city-image-max:border-[#DDDDDD] responsive-city-image-max:border-b"
                }
            >
                <RatingScores ratings={ratings} comments={comments} />
            </div>
            <div className="pl-6 responsive-city-image-max:px-3">
                <header
                    className={"pb-9 text-4xl font-semibold responsive-city-image-min:sticky responsive-city-image-min:top-[74px] bg-[#121212]"}
                >
                    {`${comments.length} ratings`}
                </header>
                <div className="flex flex-col gap-12">
                    {
                        comments.map((comment, index) => {
                            return (
                                <div key={index} id="comment" className="w-full">
                                    <header id="comment-header" className="flex flex-col gap-1 align-middle">
                                        <div id="comment-user" className="font-bold text-lg mb-1">
                                            {comment.username}
                                        </div>
                                        <div id="comment-info" className="flex items-center font-semibold">
                                            <StarRating rating={comment.rating} stars={5} starClassName="w-[0.8rem] h-[0.8rem]" />
                                            <div id="separator" className="px-[5px]">
                                                <span> - </span>
                                            </div>
                                            <div className="responsive-city-image-max:text-sm">
                                                {
                                                    dayjs(comment.date).format('MMMM [of] YYYY')
                                                }
                                            </div>
                                            <div id="separator" className="px-[5px]">
                                                <span> - </span>
                                            </div>
                                            <div className="responsive-city-image-max:text-sm">
                                                {
                                                    `Stayed ${comment.stay_length} days`
                                                }
                                            </div>
                                        </div>
                                    </header>
                                    <div id="comment-body" className="font-normal text-sm pt-3">
                                        {
                                            comment.body
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}