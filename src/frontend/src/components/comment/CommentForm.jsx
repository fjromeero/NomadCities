import { useState } from "react";

import StarForm from "./StarForm";
import InputError from "../user/InputError";

export default function CommentForm({ cityName, commentData, setCommentData, setCreationStep, cancelCreation }) {
    const [errors, setErrors] = useState({
        "comment": false,
        "stayLength": false,
        "pricePerMonth": false,
    });

    const setAvgRating = (rating) => {
        setCommentData((prev) => {
            return {
                "avgRating": rating,
                "comment": prev.comment,
                "stayLength": prev.stayLength,
                "pricePerMonth": prev.pricePerMonth
            }
        });
    }

    const next = () => {
        commentData.comment === "" || commentData.stayLength <= 0 || commentData.pricePerMonth <= 0
            ? setErrors({ "comment": commentData.comment === "", "stayLength": commentData.stayLength <= 0, "pricePerMonth": commentData.pricePerMonth <= 0 })
            : setCreationStep(2)
    }

    return (
        <div className="w-full m-auto flex flex-col gap-20 py-20">
            <header>
                <h1 className="text-3xl font-bold">How would you rate your stay on {cityName}</h1>
            </header>
            <section className="w-full flex flex-col items-center">
                <StarForm rating={commentData.avgRating} setRating={setAvgRating} />
            </section>
            <section>
                <header>
                    <h1 className="text-xl font-bold">Give us a comment about your experience on {cityName}</h1>
                </header>
                <textarea
                    content={commentData.comment}
                    onChange={(e) => {
                        setCommentData((prev) => {
                            return {
                                "avgRating": prev.avgRating,
                                "comment": e.target.value,
                                "stayLength": prev.stayLength,
                                "pricePerMonth": prev.pricePerMonth,
                            }
                        })
                    }}
                    style={{ inlineSize: "100%", boxShadow: "inset 0 0 0 1px #727272", scrollbarWidth: "none" }}
                    rows={10}
                    className="w-ful mt-10 border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white resize-none"
                />
                {errors.comment && <InputError message={"You must fill the comment"} className="pt-3" />}
            </section>
            <section>
                <header>
                    <h1 className="text-xl font-bold flex">How many days did you stay in {cityName} ?</h1>
                </header>
                <input
                    type="number"
                    style={{ boxShadow: "inset 0 0 0 1px #727272", scrollbarWidth: "none" }}
                    className="w-2/3 mt-4 border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                    placeholder="Enter number of days"
                    onChange={(e) => {
                        setCommentData((prev) => {
                            return {
                                "avgRating": prev.avgRating,
                                "comment": prev.comment,
                                "stayLength": e.target.value,
                                "pricePerMonth": prev.pricePerMonth,
                            }
                        })
                    }}
                />
                {errors.stayLength && <InputError message={"You must fill the length of your stay and it must be a positive number"} className="pt-3" />}
            </section>
            <section>
                <header>
                    <h1 className="text-xl font-bold flex">What was your average monthly expense $ in {cityName}?</h1>
                </header>
                <input
                    type="number"
                    style={{ boxShadow: "inset 0 0 0 1px #727272", scrollbarWidth: "none" }}
                    className="w-2/3 mt-4 border-0 text-base font-normal bg-[#121212] p-2 rounded-md text-white"
                    placeholder="Enter your average monthly expense"
                    onChange={(e) => {
                        setCommentData((prev) => {
                            return {
                                "avgRating": prev.avgRating,
                                "comment": prev.comment,
                                "stayLength": prev.stayLength,
                                "pricePerMonth": e.target.value,
                            }
                        })
                    }}
                />
                {errors.pricePerMonth && <InputError message={"You must fill the average price per month on your stay"} className="pt-3" />}
            </section>
            <div className="flex gap-5">
                <button onClick={() => next()} id='next-button' className="inline-flex items-center px-8 py-4 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-[#453f96] transition ease-in-out duration-150">
                    Next
                </button>
                <button onClick={() => cancelCreation()} id='cancel-button' className="inline-flex items-center px-8 py-4 bg-red-700 border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-red-800 transition ease-in-out duration-150">
                    Cancel
                </button>
            </div>
        </div>
    )
}