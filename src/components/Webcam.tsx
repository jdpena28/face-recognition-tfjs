import React, { useRef } from 'react'
import Webcam from 'react-webcam'
const Webcamtsx = () => {
    const webcamRef = useRef(null)
    return (
        <div className='w-full'>
            <Webcam className='mx-auto mt-3'
            audio={false}
            mirrored={true} ref={webcamRef}/>
        </div>
    )
}

export default Webcamtsx
