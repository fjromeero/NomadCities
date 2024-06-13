export default function TagSection({ tags }) {
    return (
        <div className="max-w-[1400px] mx-auto border-t border-[#DDDDDD] text-white">
            <div className="max-w-4xl pb-8">
                <h2 className="text-2xl font-semibold font-sans mt-8">What this city offers</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                    {
                        tags.map((tag, index) => {
                            return (
                                <span key={index} title={`Our nomads voted this characteristic ${tag.count} times`} className="px-3 py-1 bg-[#7066f2] text-white rounded-full font-semibold text-xs uppercase tracking-widest">
                                    {tag.name}
                                    <span className="h-full border-x border-white mx-2"/>
                                    {tag.count}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}