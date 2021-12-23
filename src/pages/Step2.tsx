import { ref, uploadString } from "firebase/storage"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Webcam from "react-webcam"
import Button from "../components/Button"
import Layout from "../components/Layout"
import StepIndicator from "../components/StepIndicator"
import { storage } from "../firebase-config"

import { CompareFacesCommand } from "@aws-sdk/client-rekognition";

  

const Step2 = () => {
  const matchImagee = ()
  const checkImage = () => {
   const config = new AWS.Config({
     accessKeyId: "AKIAXDTBCJIHECM5RJFR",
     secretAccessKey: "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",
     region: "us-east-1"
   })
   const client = new AWS.Rekognition();
   const params = {
     SourceImage: {
      "Bytes":'https://firebasestorage.googleapis.com/v0/b/easylearn-kyc.appspot.com/o/Drivesmart%2Fdoedoedoe?alt=media&token=8cf3d457-2e8d-4cea-a8ac-770a10b21e1f'
     },
     TargetImage: {
      "Bytes":"https://firebasestorage.googleapis.com/v0/b/easylearn-kyc.appspot.com/o/Drivesmart%2F1?alt=media&token=6c2bd8cc-c55d-4144-ad66-b1d33af27340"
     },
     SimilarityThreshold: 70
   }
   console.log('IM ruunniong')
   client.compareFaces(params, function(err:any, response:any) {
     if (err) {
       alert("Error")
       console.log(err, err.stack); // an error occurred
     } else {
       response.FaceMatches.forEach((data:any) => {
         let similarity = data.Similarity
         setSimilarity(similarity)
         console.log(similarity)
       }) // for response.faceDetails
     } // if  
   });
  }
  useEffect(() => {
    checkImage()
  }, [])
const webcamRef = React.useRef<null|any>(null);
const  [similarity, setSimilarity] = useState<number>(0)
const [base64, setbase64] = useState<string>('')
const capture = React.useCallback(
    () => {
    console.log(webcamRef.current.getScreenshot())
      const imageSrc:any = webcamRef.current.getScreenshot();
      setbase64(imageSrc);
      alert(base64)
      const savetoFirebase = async () => {
        const fileName = "2";
        const storageRef = ref(storage, `Drivesmart/${fileName}`);
        uploadString(storageRef, base64, 'data_url').then((snapshot) => {
          console.log('Uploaded a base64 string!');
        }).catch((error) => {console.log(error)})
      }
      savetoFirebase()
    },
    [webcamRef]
  );
  
  return (
    <Layout>
      <StepIndicator stepColor2={"bg-highlight"} stepColor3={"bg-secondary"} />
      <h4>{similarity}</h4>
      <div className='container mx-auto flex flex-col gap-y-4'>
        <Webcam
          ref={webcamRef}
          audio={false}
          className="mx-auto mt-5"
          screenshotFormat='image/jpeg'
          width={550}
        />
        <button onClick={capture} className="bg-slate-500 p-5 text-white w-32 mx-auto ">Capture</button>
      </div>
      <img src={base64} alt="sad" width = {420} height={420} />
      <Link to="/Step3">
        <Button btnText="NEXT"/>
      </Link>
    </Layout>
  )
}

export default Step2
