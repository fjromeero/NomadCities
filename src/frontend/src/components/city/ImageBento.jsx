import { useRef } from "react"

import ImageGallery from "./ImageGallery";

export default function ImageBento({images, className}) {
    const modalRef = useRef();

    const showModal = () => {
        modalRef.current.showModal();
        document.body.classList.add('overflow-y-hidden')
    }

    return (
        <div className={"px-20 pt-8 auth-max:px-10 lg:px-0 "+className}>
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-bento auto-rows-bento gap-3 rounded-xl overflow-hidden">
                    {images.slice(0, 5).map((image, index) => (
                        <button onClick={() => showModal()} key={index} className={index === 0 ? 'col-start-1 col-end-3 row-start-1 row-end-3' : ''}>
                            <img className="w-full h-full object-cover" src={image.path} alt={`City images`} />
                        </button>
                    ))}
                </div>
            </div>
            <ImageGallery images={images} ref={modalRef}/>
        </div >
    )
}