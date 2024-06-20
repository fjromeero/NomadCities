import { useState } from "react"

export default function SearchBar({setQuery}) {
    
    const [searchQuery, setSearchQuery] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        setQuery(searchQuery);
    }

    return (
        <div className="max-w-[800px] w-full border-2 border-[#727272] rounded-[100px] mb-20 mx-20 main-4:my-10">
            <form className="flex items-center h-14 w-full" onSubmit={submitHandler}>
                <div className="flex items-center gap-4 w-full ml-4 ">
                    <button type="submit" title="search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="white" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
                    </button>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="shadow-none outline-none text-lg text-ellipsis w-full bg-transparent text-white"
                        autoCapitalize="none"
                        autoCorrect="off"
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="Search for a city..."
                        title="search"
                    />
                </div>
                <span className="p-0 m-0 mx-[6px]">
                    <button type="submit" className="px-4 py-2 rounded-3xl bg-[#7066F2] text-white">
                        <span className="p-0 m-0">Search</span>
                    </button>
                </span>
            </form>
        </div>
    )
}