import { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam";
import * as faceapi from "face-api.js"
import { createCanvasFromMedia } from "face-api.js";

const Webcamtsx = () => {
  const [modelLoading, setModelLoading] = useState<boolean>(true);
  const webcamRef = useRef<any|null>()
	const streamRef = useRef<any|null>()
  const canvasRef = useRef<any|null>()

  useEffect(() => {
    const loadModels:any = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]).then(() => {
        setModelLoading(false)
      }).then(() => {
				// faceDetection()
				startVideo()
			})
    }
    loadModels();
  }, [])
/* 	const faceDetection = async () => {
		// console.log(webcamRef.current.stream.active)
		const displaySize = {
			width: webcamRef.current.width,
			height: webcamRef.current.height
		}
		const data:any = await faceapi.detectSingleFace(webcamRef.current, 
		new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
		faceapi.matchDimensions(canvasRef.current, displaySize)
		const resize = faceapi.resizeResults(data, displaySize)
		canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(webcamRef.current)
		faceapi.draw.drawDetections(canvasRef.current, resize)
		faceapi.draw.drawFaceExpressions(canvasRef.current, resize)
	} */

	

	const liveFaceDetection = async () => {
		const displaySize ={
			width: streamRef.current.width,
			height: 600
		}
		faceapi.matchDimensions(canvasRef.current, displaySize)
		setInterval(async () => {
			const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, displaySize.width, displaySize.height);
			canvasRef.current.innerHTML = createCanvasFromMedia(streamRef.current)
			const data:any = await faceapi.detectSingleFace(streamRef.current, 
			new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
			const resize = faceapi.resizeResults(data, displaySize)
			canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(streamRef.current)
			faceapi.draw.drawDetections(canvasRef.current, resize)
			faceapi.draw.drawFaceExpressions(canvasRef.current,resize)
		},50)
	}
	const startVideo = () => {
		navigator.mediaDevices.getUserMedia({video: true}) 
		.then((stream:any) => {
			streamRef.current.srcObject = stream
			streamRef.current.play()
		})
	}
  return (
    <div className="w-full">
      {!modelLoading && (<>
				<video className="mx-auto mt-12" ref={streamRef} autoPlay  muted width="600px"  onPlay={liveFaceDetection} />
				{/* <img className="mx-auto mt-[5.8rem]" ref={webcamRef} crossOrigin="anonymous"
				src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" width={500} /> */}
		</>	)}
      <canvas
        ref={canvasRef}
        className="w-[600px] h-[450px] z-20 absolute inset-0 m-auto"
      />
    </div>
  );
};

export default Webcamtsx;
