import Navbar from "../component/Navbar"
import Frame from "../component/Frame";

const Marketing = () => {
  return (
    <div className="w-full h-fit relative  ">
        <Navbar />
        <Frame/>
        <div className=" w-[93%] h-fit flex items-center justify-center ml-[7%]  ">
                <div className="w-full h-fit flex items-center justify-center mt-[80px] ">
                  <p>Marketing</p>
                  </div>
        </div>
    </div>
  )
}

export default Marketing