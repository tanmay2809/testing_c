import Navbar from "../component/Navbar"
import Frame from "../component/Frame";


const Dashboard = () => {
  return (
    <div className="w-full h-fit relative ">
        <Navbar />
        {/* frame */}
        <Frame/>
        <div className=" w-[93%] h-fit flex items-center justify-center ml-[7%]  ">
          <div className="w-full h-fit flex items-center justify-center mt-[80px] ">
          <p>dashboard</p>
          </div>
               
        </div>
    </div>
  )
}

export default Dashboard