import React from 'react';
import Craft from './pages/Craft';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import { Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import Header from './components/Header'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<LandingPage />} />
        <Route path="craft" element={<Craft />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App;
