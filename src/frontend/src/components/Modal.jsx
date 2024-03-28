import { forwardRef } from "react";

const Modal = forwardRef(function Modal({children, className = ''},ref){
    return (
        <dialog className={className} ref={ref}>
            {children}
        </dialog>
    );
})

export default Modal;