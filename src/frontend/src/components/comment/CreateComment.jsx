import { useState } from "react";

import CommentForm from "./CommentForm";
import CommentRatingsForm from "./CommentRatingsForm";
import { createCommentOnCity } from "../../utils/client/comment";

export default function CreateComment({userToken, cityId, cityName, setCreateComment}) {
    const [creationStep, setCreationStep] = useState(1);
    const [commentData, setCommentData] = useState({
        "avgRating": 1,
        "stayLength": 0,
        "comment": "",
        "pricePerMonth": 0,
    });
    const [ratings, setRatings] = useState({
        "internetConnection": 1,
        "coworkingSpaces": 1,
        "healthService": 1,
        "safety": 1,
        "gastronomy": 1,
        "meansOfTransport": 1,
        "foreignFriendly": 1,
    });
    
    const cancelCreation = () => {
        setCreationStep(1);
        setCreateComment(false);
    }

    const confirmCreation = () => {
        const createComment = async () => {
            const response = await createCommentOnCity(userToken, cityId, commentData, ratings);
            if (response.status === 200) {
                window.location.replace(`/city/${cityId}`);
            }
        }

        createComment();
    }

    return (
        <>
            {
                {
                    1: <CommentForm cityName={cityName} commentData={commentData} setCommentData={setCommentData} cancelCreation={cancelCreation} setCreationStep={setCreationStep}/>,
                    2: <CommentRatingsForm ratings={ratings} setRatings={setRatings} confirmCreation={confirmCreation} cancelCreation={cancelCreation}/>,
                }[creationStep]
            }
        </>
    )
}