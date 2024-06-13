import { useState } from "react";

import CommentForm from "./CommentForm";
import CommentRatingsForm from "./CommentRatingsForm";
import TagAssignation from "./TagAssignation";

import { createCommentOnCity } from "../../utils/client/comment";
import { assignCityTags } from "../../utils/client/citytag";

export default function CreateComment({userToken, cityId, cityName, closeModal}) {
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

    const [tagAssignation, setTagAssignation] = useState([]);
    
    const cancelCreation = () => {
        setCommentData({
            "avgRating": 1,
            "stayLength": 0,
            "comment": "",
            "pricePerMonth": 0,
        })
        setRatings({
            "internetConnection": 1,
            "coworkingSpaces": 1,
            "healthService": 1,
            "safety": 1,
            "gastronomy": 1,
            "meansOfTransport": 1,
            "foreignFriendly": 1,
        })
        setTagAssignation([]);
        setCreationStep(1);
        closeModal();
    }

    const confirmCreation = () => {
        const createComment = async () => {
            const commentResponse = await createCommentOnCity(userToken, cityId, commentData, ratings);
            const tagResponse = await assignCityTags(userToken, cityId, tagAssignation);

            if (commentResponse.status===200 && tagResponse.status===200) {
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
                    2: <CommentRatingsForm ratings={ratings} setRatings={setRatings} setCreationStep={setCreationStep} cancelCreation={cancelCreation}/>,
                    3: <TagAssignation userToken={userToken} setTagAssignation={setTagAssignation} confirmCreation={confirmCreation} cancelCreation={cancelCreation}/>
                }[creationStep]
            }
        </>
    )
}