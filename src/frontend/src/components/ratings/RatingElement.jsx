export default function RatingElement({ title, rating, children, flow = 'column' }) {
    return (
        flow !== 'column'
            ? (
                <div className="max-w-48 min-w-48 responsive-city-image-min:min-w-40 px-6 pb-1 border-l border-[#DDDDDD]">
                    <div className="flex flex-col justify-between gap-5">
                        <div className="flex flex-col gap-[2px] text-lg font-semibold">
                            <div className="text-white">
                                {title}
                            </div>
                            <div className="text-white">
                                {rating}
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            )
            : (
                <div className="py-4 border-b border-[#DDDDDD]">
                    <div className="flex justify-between gap-5">
                        <div className="items-center flex gap-4">
                            {children}
                            <div>
                                {title}
                            </div>
                        </div>
                        <div>
                            {rating}
                        </div>
                    </div>
                </div>
            )
    )
}