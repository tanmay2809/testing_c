
import { Routes, Route } from'react-router-dom'
//import
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Verify from './pages/Verify';
import NewPassword from './pages/NewPassword';
import Plans from './pages/Plans';
import LeftNavbar from './component/LeftNavbar';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Marketing from './pages/Marketing';
import Customer from './pages/Customer';
import Setting from './pages/Setting';
import MyPlans from './pages/MyPlans';
import Billing from './pages/Billing';
import Invoice from './pages/Invoice';

const App = () => {
  return (
    <>
      {/* <div className='bg-red-600 text-[2rem]'>App</div> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/plans" element={<Plans />} />

        <Route path="/" element={<LeftNavbar />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/settings/myplans" element={<MyPlans />} />
          <Route path="/settings/billing" element={<Billing />} />
          <Route path="/settings/invoice" element={<Invoice />} />
        </Route>
      </Routes>
    </>
  );
}

export default App