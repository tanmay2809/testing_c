
import { FadeLoader } from'react-spinners'

const Loaging = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <FadeLoader className='size-[100px] text-blue-600' color='#004AAD' loading={true} />

    </div>
  )
}

export default Loaging