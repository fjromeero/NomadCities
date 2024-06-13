import ImageBento from "./ImageBento"
import ImageCarrousel from "./ImageCarrousel"
import InfoSection from "./InfoSection"
import RatingScores from "../ratings/RatingScores"
import CommentSection from "./CommentSection"
import TagSection from "./TagsSection"

export default function CityInspect({ userToken, cityData, comments, tags, isAdmin, id }) {
    return (
        <div className="w-full">
            <ImageCarrousel images={cityData.images} className={" responsive-city-image-min:hidden"} />
            <header className="max-w-[1400px] mx-auto flex justify-between auth-max:items-center auth-max:mx-5">
                <div className="responsive-city-image-max:hidden">
                    <h1 className="text-white text-3xl font-semibold font-sans">{cityData.info.name}</h1>
                </div>
                {
                    isAdmin && (
                        <a href={"/city/" + id + "/edit"} className="responsive-city-image-max:mt-6 auth-max:h-1/2 auth-max:w-20 auth-max:p-3 px-7 py-2 bg-[#7066f2] border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-slate-300 transition ease-in-out duration-150 text-center">
                            Edit
                        </a>
                    )
                }
            </header>
            <ImageBento images={cityData.images} className={" responsive-city-image-max:hidden auth-max:px-5"} />
            <InfoSection cityInfo={cityData.info} />
            <TagSection tags={tags}/>
            <section className={`max-w-[1400px] mx-auto py-8 border-[#DDDDDD] auth-max:mx-5 ${comments.length === 0 ? "border-t" : "border-y"}`}>
                {
                    cityData.ratings.avgRating === 0 ? (
                        <div className="mb-8">
                            <div className="inline-flex items-center">
                                <span className="mr-2">
                                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ "display": "block", "height": "1.25rem", "width": "1.25rem" }}><path fillRule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
                                </span>
                                <span className="text-3xl font-semibold text-white">
                                    <h2>
                                        <span>Without reviews (for now)</span>
                                    </h2>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <RatingScores comments={comments} ratings={cityData.ratings} flowDefault="row"/>
                    )
                }
            </section>
            <CommentSection userToken={userToken} cityId={id} cityName={cityData.info.name} comments={comments} ratings={cityData.ratings} canRate={cityData.canRate}/>
        </div>
    )
}