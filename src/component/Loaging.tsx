
import { BounceLoader } from'react-spinners'

const Loaging = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-orange-300 bg-opacity-25 z-[200]'>
        <BounceLoader color="#004AAD" loading size={100} speedMultiplier={4} />

    </div>
  )
}

export default Loaging