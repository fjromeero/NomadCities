export default function DropDownItem(props) {
    return (
        <a 
            href={props.url} 
            className='flex h-12 align-middle p-2 text-white auth-max:pl-7 auth-max:h-auto auth-max:pb-7 auth-max:first:pt-7 auth-max:font-bold auth-max:text-lg '
        >
            {props.children}
        </a>
    );
}