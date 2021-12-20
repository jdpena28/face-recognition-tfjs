import React from 'react'
import Webcam from 'react-webcam'
const Webcamtsx = () => {
    return (
        <div className='w-full'>
            <Webcam className='mx-auto mt-3'
            audio={false}
            mirrored={true}/>
        </div>
    )
}

export default Webcamtsx
