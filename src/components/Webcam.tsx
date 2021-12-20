import { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam";
import * as faceapi from "face-api.js"

const Webcamtsx = () => {
  const [modelLoading, setModelLoading] = useState<boolean>(true);
  const webcamRef = useRef<any|null>()
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
				faceDetection()
			})
    }
    loadModels();
  }, [])
	const faceDetection = async () => {
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
	}
  return (
    <div className="w-full">
      {!modelLoading && (
				/* <Webcam className="m-auto mt-[5.8rem]" ref={webcamRef} 
				audio={false} mirrored={true} height={500} width={500} 
				onUserMedia={faceDetection} /> */
				<img className="mx-auto mt-[5.8rem]" ref={webcamRef} crossOrigin="anonymous"
				src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" width={500} />
			)}
      <canvas
        ref={canvasRef}
        className="w-[500px] h-[374px] z-20  absolute inset-0 m-auto"
      />
    </div>
  );
};

export default Webcamtsx;
