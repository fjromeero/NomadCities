export default function Card({id, name, country, avg_price, avg_rating, image, authenticated=true}) {
    return (
        <a href={authenticated ? `/city/${id}` : '/login'} className={"w-full"}>
            <div className={"flex flex-col group gap-4"}>
                <div className={"aspect-square w-full relative overflow-hidden rounded-xl"}>
                    <img
                        src={'http://localhost:30050/'+image}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                </div>
                <div className={"grid grid-cols-2 gap-y-2 text-white"}>
                    <div className="col-[1]">
                        <p className="font-bold">{`${name}, ${country}`}</p>
                    </div>
                    {avg_rating !== 0 &&
                        <>
                            <div className="col-[1]">
                                <span>
                                    <span className="font-bold">
                                        {`$ ${avg_price} `}
                                    </span>
                                    <span>
                                        per month
                                    </span>
                                </span>
                            </div>
                            <div className="col-[2] row-[1] justify-self-end flex items-center gap-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"/>
                                </svg>
                                <span>{avg_rating}</span>
                            </div>
                        </>
                    }
                </div>
            </div>
        </a>
    )
}