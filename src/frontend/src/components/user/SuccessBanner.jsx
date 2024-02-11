export default function SuccessBanner({msg}){
    return (
        <section className="pb-6">
            <div id="success-banner" className="bg-[#7066f2] text-black flex py-3 pl-5 pr-4 rounded-sm">
                <svg data-encore-id="icon" role="img" aria-label="Success:" aria-hidden="false" className="me-3 w-6 h-6 fill-black" viewBox="0 0 24 24"><title>Success:</title><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path><path d="M17.398 8.207a1 1 0 0 1 0 1.414l-7.425 7.425-3.308-3.308a1 1 0 0 1 1.414-1.414l1.894 1.894 6.011-6.011a1 1 0 0 1 1.414 0z"></path></svg>
                <span className="">
                    {msg}
                </span>
            </div>
        </section>
    );
}