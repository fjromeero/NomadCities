export default function CityRatingElement({ title, rating, children}) {
    return (
        <div className="max-w-52 min-w-48 px-6 pb-1 border-l border-[#DDDDDD]">
            <div className="flex flex-col justify-between gap-5">
                <div className="flex flex-col gap-[2px] text-lg font-semibold text-white">
                    <div>
                        {title}
                    </div>
                    <div>
                        {rating}
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
} 