import { forwardRef } from "react";

const Modal = forwardRef(function Modal({children},ref){
    return (
        <dialog ref={ref} >
            {children}
        </dialog>
    );
})

export default Modal;