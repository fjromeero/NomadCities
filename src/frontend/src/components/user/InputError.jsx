export default function InputError({message, className='', ...props}){
    return message ? (
        <p {...props} id='input-error' className={'text-sm text-red-600 ' + className}>
            {message}
        </p>
    ): null;
}