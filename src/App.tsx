import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Register from "./pages/Auth/Register";
import Verify from "./pages/Auth/Verify";
import NewPassword from "./pages/Auth/NewPassword";
import Plans from "./pages/Plans";
import LeftNavbar from "./component/outlet/LeftNavbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Menu from "./pages/Menu";
import Marketing from "./pages/Marketing/Marketing";
import Customer from "./pages/Customer/Customer";
import Setting from "./pages/Settings/Setting";
import MyPlans from "./pages/Settings/MyPlans";
import Billing from "./pages/Settings/Billing";

// import Invoice from "./pages/Settings/Invoice";
import Stores from "./pages/Settings/Stores";
import CustomerList from "./pages/Customer/CustomerList";
import Overview from "./pages/Customer/Overview";
import Analytics from "./pages/Customer/Analytics";
import CampaignLibrary from "./pages/Marketing/CampaignLibrary";
import Table from "./pages/Dashboard/Table";
import ManageCampaigns from "./pages/Marketing/ManageCampaigns";
import WhatsAppSettings from "./pages/Marketing/WhatsAppSettings";
import Campaigns from "./pages/Marketing/Campaigns";
import CreateCampaigns from "./pages/Marketing/CreateCampaign";
import Wallet from "./pages/Wallet";
import ConnectNumber from "./pages/Marketing/ConnectNumber";
import Integrations from "./pages/Marketing/Integrations";
import WhatsappBusinessProfile from "./pages/Marketing/WhatsappBusinessProfile";
import WhatsAppManager from "./pages/Marketing/WhatsappManager";
import CustomiseTheme from './pages/Settings/CustomiseTheme';
import Feedbackpage from "./pages/feedback/Feedbackpage";

const App: React.FC = () => {
  console.log("App Component Rendered");

  return (
    <>
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
          <Route path="/table" element={<Table />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/marketing" element={<Marketing />}>
            <Route index element={<Integrations />} />
            <Route path="manage" element={<ManageCampaigns />} />
            <Route
              path="whatsappsetting"
              element={<WhatsAppSettings />}
            ></Route>
          </Route>
          <Route path="/campaign/:type" element={<Campaigns />} />
          <Route path="/createcampaign" element={<CreateCampaigns />} />
          <Route path="/connectNumber" element={<ConnectNumber />} />
          <Route path="/businessProfile" element={<WhatsappBusinessProfile />}>
            <Route index element={<WhatsappBusinessProfile />} />
            {/* <Route path="/profil"/> */}
          </Route>
          <Route path="/manager" element={<WhatsAppManager />}>
            <Route index element={<CampaignLibrary />} />
            <Route path="header" element={<WhatsAppSettings />} />

          </Route>

          <Route path="/customer" element={<Customer />}>
            <Route index element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="customerList" element={<CustomerList />} />
          </Route>

          <Route path="/setting" element={<Setting />}>
            <Route index element={<Stores />} />
            
            <Route path="myplans" element={<MyPlans />} />
            <Route path="store" element={<Stores />} />
            <Route path="billing" element={<Billing />} />
            
            {/* <Route path="invoice" element={<Invoice />} /> */}
          </Route>
          
          <Route path="/feedback" element={<Feedbackpage />} />
          <Route path="/CustomiseTheme" element={<CustomiseTheme />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
