import Modal from "../Modal";
import { forwardRef } from "react";

const ImageGallery = forwardRef(function ImageGallery({images}, ref) {
    return (
        <Modal ref={ref} className="max-w-full w-full max-h-full h-full bg-[#121212]">
            <header className="sticky top-0 left-0 right-0 bg-[#121212]">
                <div className="py-5 pl-5">
                    <button onClick={() => ref.current.close()}>
                        <svg
                            viewBox="0 0 512 512"
                            fill="none"
                            className="w-7 h-7"
                        >
                            <path
                                fill="none"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={48}
                                d="M328 112L184 256l144 144"
                            />
                        </svg>
                    </button>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-10 auth-max:pb-20 auth-max:pt-0">
                <div className="max-w-3xl mx-auto">
                    <div className="grid gap-4 grid-cols-preview">
                        {
                            images.map((image, index) => (
                                <div key={index} className={(index % 3 === 0 || (index === images.length - 1 && images.length % 3 !== 0)) ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}>
                                    <img className="w-full h-full object-cover" src={image.path} alt={`City images`}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Modal >
    )
})

export default ImageGallery