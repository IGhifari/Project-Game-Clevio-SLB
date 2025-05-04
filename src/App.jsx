import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HalamanAwal from './components/halamanAwal';
import HalamanLevel from './components/halamanLevel';
import RumahMain from './components/rumahMain';
import SekolahMain from './components/sekolahMain';
import KamarMandiRumah from './components/kamarMandiRumah';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HalamanAwal />} />
        <Route path="/halamanlevel" element={<HalamanLevel />} />
        <Route path="/rumahmain" element={<RumahMain />} />
        <Route path="/sekolahmain" element={<SekolahMain />} />
        <Route path="/kamarMandiRumah" element={<KamarMandiRumah />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App