import { useEffect, useRef, useState } from "react";

export default function DropDownIcon(props) {
    const [open, setOpen] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const menuRef = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClick)

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 830);
        };

        handleResize(); // Para establecer el estado inicial
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
        <li ref={menuRef} className="w-20 flex align-middle justify-center">
            {
                props.img
                    ?   
                        <button
                            className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full "
                            onClick={() => setOpen(!open)}
                        >
                            <img className="aspect-square h-full w-full" src={props.img} />
                        </button>
                    :
                        <button
                        className={isSmallScreen && open ? "w-8 h-8 bg-black rounded-[50%] p-[5px] flex align-middle justify-center" : "w-8 h-8 bg-[#979797] rounded-[50%] p-[5px] flex align-middle justify-center"} 
                        onClick={() => setOpen(!open)}
                        >
                            {
                                isSmallScreen && open 
                                    ? <svg viewBox="-6.4 -6.4 76.80 76.80" xmlns="http://www.w3.org/2000/svg" strokeWidth={"6.4"} stroke="#ffffff" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth={"0"}><rect x="-6.4" y="-6.4" width="76.80" height="76.80" rx="0" fill="#000000" strokeWidth={"0"}></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><line x1="8.06" y1="8.06" x2="55.41" y2="55.94"></line><line x1="55.94" y1="8.06" x2="8.59" y2="55.94"></line></g></svg>
                                    : <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={"0"}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin={"round"}></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth={"2"} strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" strokeWidth={"2"} strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            }
                        </button>
            }
            {open && props.children}
        </li>
    );
}