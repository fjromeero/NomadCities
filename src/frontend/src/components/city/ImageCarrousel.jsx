import ImageGallery from "./ImageGallery";
import { useRef } from "react";

export default function ImageCarrousel({ images, className }) {
    const modalRef = useRef();

    const showModal = () => {
        modalRef.current.showModal();
        document.body.classList.add('overflow-y-hidden')
    }

    return (
        <div>
            <div className={" slider relative overflow-x-scroll flex aspect-auto max-h-[300px]" + className} style={{ scrollSnapType: "x mandatory", "scrollbarWidth": "none" }}>
                {
                    images.map((image, index) => (
                        <img key={index} className="w-full left-0 sticky object-cover" style={{ scrollSnapAlign: "center" }} src={image.path} alt={`City images`} onClick={() => showModal()} />
                    ))
                }
            </div>
            <ImageGallery images={images} ref={modalRef}/>
        </div>
    )
}