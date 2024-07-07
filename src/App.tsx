import React from 'react';
import Craft from './pages/Craft';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header/>}>
        <Route index element={<LandingPage/>} />
        <Route path="craft" element={<Craft/>} />
      {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  )
}

export default App;
