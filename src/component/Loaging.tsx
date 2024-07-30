
import { PropagateLoader } from'react-spinners'

const Loaging = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-orange-300 bg-opacity-25 z-[200]'>
        <PropagateLoader color="#004AAD" loading size={30} speedMultiplier={8} />

    </div>
  )
}

export default Loaging