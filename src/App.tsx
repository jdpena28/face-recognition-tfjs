import Webcamtsx from "./components/Webcam"

function App() {
  return (
  <section className="w-full h-screen bg-[#e1dfe1] text-gray-800">
    <div className="container h-full mx-auto">
      <h1 className="text-3xl font-bold text-center pt-4">Facial Recognition</h1>
      <Webcamtsx/>
    </div>
    
  </section>
  )
}

export default App
