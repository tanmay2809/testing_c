
import { Routes, Route } from'react-router-dom'

import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Verify from './pages/Verify';
import NewPassword from './pages/NewPassword';

const App = () => {
  return (
    <>
    {/* <div className='bg-red-600 text-[2rem]'>App</div> */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot' element={<ForgotPassword />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify' element={<Verify />} />
      <Route path='/newpassword' element={<NewPassword />} />
    </Routes>
    </>
  )
}

export default App