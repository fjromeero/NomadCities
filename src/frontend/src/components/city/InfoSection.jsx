export default function InfoSection({ cityInfo }) {
    return (
        <div className="max-w-[1400px] mx-auto pt-8 auth-max:mx-5">
            <div className="py-8">
                <h2 className="text-white text-3xl font-semibold">{cityInfo.name + ", " + cityInfo.country + " - " + cityInfo.continent}</h2>
            </div>
            <div id="city-description" className="pb-8 max-w-4xl">
                <p className="text-white text-justify">
                    {cityInfo.description}
                </p>
            </div>
        </div>
    )
}