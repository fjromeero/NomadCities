import RatingScores from "../ratings/RatingScores";
import StarRating from "../ratings/StarRating";
import dayjs from "dayjs";

import { useState, useEffect, useRef } from 'react';

export default function CommentOverview({ comments, ratings, canRate, setCreateComment}) {

    const [isOpen, setIsOpen] = useState(false);
    const [showedComments, setShowedComments] = useState([...comments]);
    const [activeFilter, setActiveFilter] = useState(null);

    const menuRef = useRef(null);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const showPositiveComments = () => {
        setShowedComments([...comments.filter(comment => comment.polarity === 1)]);
        setActiveFilter('positive');
    };

    const showNegativeComments = () => {
        setShowedComments([...comments.filter(comment => comment.polarity === -1)]);
        setActiveFilter('negative');
    };

    const resetComments = () => {
        setShowedComments([...comments]);
        setActiveFilter(null);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                <div className="px-4 py-4">
                    <button 
                        onClick={() => setCreateComment(true)} 
                        className="bg-[#7066f2] disabled:bg-[#7066f2]/[.60] disabled:text-white/[.60] w-full py-3 border-transparent rounded-md font-semibold text-xs uppercase tracking-widest" 
                        disabled={!canRate}
                        >
                        Add new rating
                    </button>
                </div>
            </div>
            <div className="pl-6 responsive-city-image-max:px-3">
            <div className="pb-9 responsive-city-image-min:sticky responsive-city-image-min:top-[74px] bg-[#121212] flex justify-between">
                    <header className="text-4xl font-semibold">
                        {`${comments.length} ratings`}
                    </header>
                    <div className="relative inline-block text-left" ref={menuRef}>
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#7066f2] px-3 py-2 text-sm text-white shadow-sm"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={handleButtonClick}
                            >
                                Filters
                                <svg className="-mr-1 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {isOpen && (
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <button 
                                        type="button" 
                                        className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700" 
                                        role="menuitem" 
                                        tabIndex="-1" 
                                        id="menu-item-0"
                                        onClick={showPositiveComments}
                                    >
                                        Positive comments
                                        {activeFilter === 'positive' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/>
                                            </svg>
                                        )}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700" 
                                        role="menuitem" 
                                        tabIndex="-1" 
                                        id="menu-item-1"
                                        onClick={showNegativeComments}
                                    >
                                        Negative comments
                                        {activeFilter === 'negative' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/>
                                            </svg>
                                        )}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700" 
                                        role="menuitem" 
                                        tabIndex="-1" 
                                        id="menu-item-2"
                                        onClick={resetComments}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-12">
                    {showedComments.length === 0 ? (
                        <div className="flex items-center justify-center h-full w-full text-center text-white py-36">
                            No comments found. Try changing the filters.
                        </div>
                    ) : (
                        showedComments.map((comment, index) => (
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
                                            {dayjs(comment.date).format('MMMM [of] YYYY')}
                                        </div>
                                        <div id="separator" className="px-[5px]">
                                            <span> - </span>
                                        </div>
                                        <div>
                                            {`Stayed ${comment.stay_length} days`}
                                        </div>
                                    </div>
                                </header>
                                <div id="comment-body" className="font-normal text-sm pt-3">
                                    {comment.body}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}