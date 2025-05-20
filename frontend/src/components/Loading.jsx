import React from 'react'
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

function Loading({ isOpen, onClose }) {
    if(!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-[5px] flex justify-center items-center z-50'>
            <DotLottieReact
                src="https://lottie.host/4bea34e0-83b9-4321-a6c2-88e529e10f60/JX7sbY4I50.lottie"
                loop
                autoplay
                className='w-40'
            />
        </div>
    )
}

export default Loading
