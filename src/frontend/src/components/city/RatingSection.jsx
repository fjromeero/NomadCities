import CityRatingElement from "./CityRatingElement";

export default function RatingsSection({ cityRatings }) {
    return (
        <section className="max-w-7xl mx-auto py-8 border-b border-[#DDDDDD]">
            <div className="mb-8">
                <div className="inline-flex items-center">
                    <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ "display": "block", "height": "1.25rem", "width": "1.25rem" }}><path fillRule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
                    </span>
                    <span className="text-3xl font-semibold">
                        <h2>
                            <span>{cityRatings.avgRating === 0 ? "Without reviews (for now)" : cityRatings.avgRating}</span>
                        </h2>
                    </span>
                </div>
            </div>
            {
                cityRatings.avgRating !== (
                    <div className="pb-8 mb-8">
                        <div className="grid grid-flow-col overflow-x-auto">
                            <CityRatingElement rating={cityRatings.avgInternetConnection} title={"Internet"}>
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path d="M723 620.5C666.8 571.6 593.4 542 513 542s-153.8 29.6-210.1 78.6a8.1 8.1 0 00-.8 11.2l36 42.9c2.9 3.4 8 3.8 11.4.9C393.1 637.2 450.3 614 513 614s119.9 23.2 163.5 61.5c3.4 2.9 8.5 2.5 11.4-.9l36-42.9c2.8-3.3 2.4-8.3-.9-11.2zm117.4-140.1C751.7 406.5 637.6 362 513 362s-238.7 44.5-327.5 118.4a8.05 8.05 0 00-1 11.3l36 42.9c2.8 3.4 7.9 3.8 11.2 1C308 472.2 406.1 434 513 434s205 38.2 281.2 101.6c3.4 2.8 8.4 2.4 11.2-1l36-42.9c2.8-3.4 2.4-8.5-1-11.3zm116.7-139C835.7 241.8 680.3 182 511 182c-168.2 0-322.6 59-443.7 157.4a8 8 0 00-1.1 11.4l36 42.9c2.8 3.3 7.8 3.8 11.1 1.1C222 306.7 360.3 254 511 254c151.8 0 291 53.5 400 142.7 3.4 2.8 8.4 2.3 11.2-1.1l36-42.9c2.9-3.4 2.4-8.5-1.1-11.3zM448 778a64 64 0 10128 0 64 64 0 10-128 0z" />
                                </svg>
                            </CityRatingElement>
                            <CityRatingElement rating={cityRatings.avgCoworkingSpaces} title={"Coworking"}>
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    className="w-8 h-8"
                                >
                                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4zm4-5.95a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    <path d="M2 1a2 2 0 00-2 2v9.5A1.5 1.5 0 001.5 14h.653a5.373 5.373 0 011.066-2H1V3a1 1 0 011-1h12a1 1 0 011 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 001.5-1.5V3a2 2 0 00-2-2H2z" />
                                </svg>
                            </CityRatingElement>
                            <CityRatingElement rating={cityRatings.avgHealthService} title={"Health"}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path d="M19.649 5.286L14 8.548V2.025h-4v6.523L4.351 5.286l-2 3.465 5.648 3.261-5.648 3.261 2 3.465L10 15.477V22h4v-6.523l5.649 3.261 2-3.465-5.648-3.261 5.648-3.261z" />
                                </svg>
                            </CityRatingElement>
                            <CityRatingElement rating={cityRatings.avgSafety} title={"Safety"}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path d="M12 4.21c1.24.51 2.65.79 4 .79 1.05 0 2.1-.16 3.08-.46C18.5 5.5 18 6.71 18 8c0 1.32.54 2.93 1.1 4.63.4 1.2.9 2.7.9 3.37 0 1.03-3.53 3-8 3.96C7.54 19 4 17.03 4 16c0-.67.5-2.17.9-3.37C5.46 10.93 6 9.32 6 8c0-1.29-.5-2.5-1.08-3.46C5.9 4.84 6.96 5 8 5c1.35 0 2.76-.28 4-.79M20 2c-1.15.64-2.6 1-4 1s-2.86-.37-4-1c-1.14.63-2.6 1-4 1s-2.85-.36-4-1L2 4s2 2 2 4-2 6-2 8c0 4 10 6 10 6s10-2 10-6c0-2-2-6-2-8s2-4 2-4l-2-2m-4.95 14.45l-3.08-1.86-3.07 1.86.82-3.5L7 10.61l3.58-.31L11.97 7l1.4 3.29 3.58.31-2.72 2.34.82 3.51" />
                                </svg>
                            </CityRatingElement>
                            <CityRatingElement rating={cityRatings.avgGastronomy} title={"Gastronomy"}>
                                <svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path d="M18 11v7a2 2 0 01-4 0v-5h-2V3a3 3 0 013-3h3v11zM4 10a2 2 0 01-2-2V1a1 1 0 012 0v4h1V1a1 1 0 012 0v4h1V1a1 1 0 012 0v7a2 2 0 01-2 2v8a2 2 0 01-4 0v-8z" />
                                </svg>
                            </CityRatingElement>
                            <CityRatingElement rating={cityRatings.avgForeignFriendly} title={"Foreign Friendly"}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 00-2-2h-4v-3a2 2 0 002-2V7h1a2 2 0 002-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 01-1.67 4.873z" />
                                </svg>
                            </CityRatingElement>
                        </div>
                    </div>
                )
            }
        </section>
    )
}