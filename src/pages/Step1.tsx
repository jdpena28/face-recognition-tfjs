import StepIndicator from "../components/StepIndicator"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"
import { useState } from "react"
import { db, storage } from "../firebase-config"
import { ref, uploadBytes } from "firebase/storage"
import { addDoc, collection } from "firebase/firestore"
const Step1 = () => {
  const label = [
    {
      label: "Last Name",
      placeholder: "Doe",
    },
    {
      label: "First Name",
      placeholder: "John",
    },
    {
      label: "Middle Name",
      placeholder: "Michael",
    },
  ]
  interface enrollees {
    LastName: string|''
    FirstName: string|''
    MiddleName: string|''
    Email: string
  }
  const [enrollees, setEnrollees] = useState<enrollees>({
    LastName: '',
    FirstName: '',
    MiddleName: '',
    Email: '',
  })
  const [image, setImage] = useState<any>(null)

  const onImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }
  const enrolleeCollection = collection(db, "Enrollees")
  const onSubmit = async (e: any) => {
    alert("Submitted")
    e.preventDefault()
    await addDoc(enrolleeCollection,{
      ...enrollees
    })
    const fileName = "1"/* (enrollees.LastName + enrollees.FirstName + enrollees.MiddleName).trim() */
    const storageRef = ref(storage, `Drivesmart/${fileName}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      alert('Uploaded a blob or file!');
    });
  uploadBytes(storageRef, image).then((snapshot) => {
    console.log('Uploaded a blob or file!');
}).catch((error) => {
    console.log(error);
});
      
  }

  return (
    <div>
      <StepIndicator stepColor2={"bg-secondary"} stepColor3={"bg-secondary"} />
      <div className='relative container mx-auto'>
        <h3 className='font-bold text-2xl'>Personal Information</h3>
        <div className='mx-auto max-w-6xl'>
          <form
            className='space-y-5'
            onSubmit={(e) => {
              onSubmit(e)
            }}
          >
            <div className='flex justify-between mt-3'>
              <Input label="Last Name" placeholder="Doe" onChange={(e:any)=>{setEnrollees({...enrollees,LastName:e.target.value})}}/>
              <Input label="First Name" placeholder="John" onChange={(e:any)=>{setEnrollees({...enrollees,FirstName:e.target.value})}}/>
              <Input label="Middle Name" placeholder="Michael" onChange={(e:any)=>{setEnrollees({...enrollees,MiddleName:e.target.value})}}/>
            </div>
            <div className='flex w-full'>
              <label className='text-xl font-semibold pl-1' htmlFor='lastName'>
                Email <br />
                <input
                  className='bg-gray-300 text-base placeholder-slate-500 w-60 h-10 rounded-md pl-1'
                  type='email'
                  name='email'
                  id='email'
                  required
                  onChange={(e: any) => {
                    setEnrollees({ ...enrollees, Email: e.target.value })
                  }}
                  placeholder='johndoe@email.com'
                />
              </label>
              <div className='w-full pl-48'>
                <h4 className='font-semibold text-2xl'>Example</h4>
                <div className='absolute h-52 w-[40%] bg-gray-200'></div>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-2xl font-bold'>Image Upload</p>
              <p className='text-sm w-64 leading-none'>
                *This will be used for final exam to verify your identity. See
                the sample image for reference.
              </p>
              <input
                type='file'
                onChange={onImageChange}
                id='img'
                name='img'
                accept='image/*'
              ></input>
            </div>
            <button className="w-32 h-10 bg-gray-700 text-white" type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
      <Link to='/Step2'>
          <Button btnText='NEXT' />
        </Link>
    </div>
  )
}

export default Step1
