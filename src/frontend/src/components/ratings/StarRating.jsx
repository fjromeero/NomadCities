export default function StarRating({ stars, rating, className, starClassName}) {
    const starArray = Array.from({ length: stars }, (_, index) => index);

    return (
        <div className={"flex gap-1" + " " + className}>
            {starArray.map(star => (
                rating >= star + 1
                    ? <FilledStar key={star} className={starClassName}/>
                    : <EmptyStar key={star} className={starClassName}/>
            ))}
        </div>
    );
}


function FilledStar({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="white" d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z" /></svg>
    )
}

function EmptyStar({ className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="white" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25" /></svg>
    )
}