import React from 'react';
import { Routes, Route } from "react-router-dom";

import Craft from './pages/Craft';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ConfirmEmail from './pages/ConfirmEmail';
import NoMatch from './pages/NoMatch';
import Header from './components/Header'
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<LandingPage />} />
        <Route path="craft" element={<Craft />} />
        <Route path="/myaccount" element={<Dashboard />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/confirmemail" element={<ConfirmEmail />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export default App;
