import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const Webcamtsx = () => {
  const webcamRef = useRef<any | null>(null);
  const canvasRef = useRef<any | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
    }
    loadModels();
  }, [])

  

  return (
    <div className="w-full">
      <video autoPlay width={400} height={400} muted ref={webcamRef} />
      <canvas
        ref={canvasRef}
        className="w-[600px] h-[450px] my-auto z-20 absolute inset-0 mx-auto"
      />
    </div>
  );
};

export default Webcamtsx;
