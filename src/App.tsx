
import { Routes, Route } from'react-router-dom'

import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <>
    {/* <div className='bg-red-600 text-[2rem]'>App</div> */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot' element={<ForgotPassword />} />
    </Routes>
    </>
  )
}

export default App