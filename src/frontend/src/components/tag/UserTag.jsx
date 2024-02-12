export default function UserTag({name}){
    return (
        <div className="inline-flex items-center max-w-28 rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FAFAFA] text-[#18181B] shadow hover:[#CACACA]">
            {name}
        </div>
    );
}