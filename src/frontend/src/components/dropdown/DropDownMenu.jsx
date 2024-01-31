export default function DropDownMenu(props) {

    return (
        <div
            id="drop-down-menu"
            className='absolute top-[97px] rounded-lg w-60 translate-x-[-45%] bg-[#121212] overflow-hidden p-4 border border-solid border-[#474a4d] auth-max:w-full auth-max:bottom-0 auth-max:translate-x-0 auth-max:left-0 auth-max:border-none auth-max:bg-black auth-max:rounded-none'
        >
            <div className='w-full'>
                {props.children}
            </div>
        </div>
    );
}