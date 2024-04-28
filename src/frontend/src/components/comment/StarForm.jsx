import { useState } from "react";

import EmptyStar from "../EmptyStar";
import FilledStar from "../FilledStar";

export default function StarForm({ rating, setRating }) {
    const [hoveredStar, setHoveredStar] = useState(rating);

    const starArray = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className={"flex"}>
            {starArray.map(star => (
                <div
                    key={star}
                    onMouseEnter={() => setHoveredStar(star + 1)}
                    onMouseLeave={() => setHoveredStar(rating)}
                    onClick={() => setRating(star + 1)}
                    className="px-1"
                >
                    {star + 1 <= hoveredStar ? <FilledStar className="w-[3rem] h-[3rem]" fill="#7066f2" /> : <EmptyStar className="w-[3rem] h-[3rem]" />}
                </div>
            ))}
        </div>
    )

}

