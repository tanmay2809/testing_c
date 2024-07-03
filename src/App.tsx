
import { Routes, Route } from'react-router-dom'

import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <>
    <div className='bg-red-600 text-[2rem]'>App</div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </>
  )
}

export default App