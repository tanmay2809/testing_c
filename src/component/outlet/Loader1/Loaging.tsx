
// import { ClipLoader } from'react-spinners'
import './Loaging.css'

const Loaging = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-white bg-opacity-25 z-[200]'>
        {/* <ClipLoader className='text-[2rem]' color="#004AAD" loading size={60} speedMultiplier={3} /> */}
        <span className="loader"></span>
    </div>
  )
}

export default Loaging